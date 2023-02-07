import requests
from bs4 import BeautifulSoup
from datetime import date
from time import sleep, time
from utils.get_time import get_time
from pymongo import MongoClient, ReturnDocument
from dotenv import load_dotenv
import os
from utils.check_int import check_int
import sentry_sdk
from sentry_sdk.integrations.pymongo import PyMongoIntegration


sentry_sdk.init(
    dsn="https://1d6f6261c1e74f8a93e261b4c3fba837@o4504565682667520.ingest.sentry.io/4504565687255043",
    integrations=[
        PyMongoIntegration(),
    ],
    traces_sample_rate=1.0,
)

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
DB_NAME = os.getenv('DB_NAME')

# Assembly, R, Go, C were appended 'developer' or 'language' to their search query, as I did not find they were accurately represented - for example my initial query returned R as having 875 opening in Alberta, more than JS (257) and Python (371) combined
# This does mean that the data could be misrepresented now in other ways, currently working towards a solution
# Swift, APL, VBA and Crystal were omitted entirely as their names were not verbose enough for the search engine to accurately represent their data - my solution of appending 'developer' or 'language' to the query proved was not effective 
# C# = c%23
# C++ = c%2B%2B
# F# = F%23
developer_skills = ['Javascript', 'Python','HTML', 'CSS', 'Python', 'SQL', 'Java', 'Node.js', 'Typescript','c%23', 'Bash', 'c%2B%2B', 'PHP', 'C%20developer', 'PowerShell', 'Golang', 'Kotlin', 'Rust', 'Ruby', 'Dart', 'assembly%20language', 'R%20developer', 'Matlab', 'Groovy', 'Objective-C', 'Scala', 'Perl', 'Haskell', 'Delphi', 'Clojure', 'Elixir', 'LISP', 'Julia', 'F%23', 'Erlang', 'COBOL']

regions = [('AB', '111149'), ('BC', '111152'), ('MB', '111151'), ('NB', '111154'), ('NF', '111157'), ('NT', '111155'), ('NS', '111153'), ('NU', '111148'), ('ON', '111147'), ('PE', '111156'), ('QC', '111158'), ('SK', '111146'), ('YT', '111150')]

def scraper_status(start_end):
	try: 
		client = MongoClient(MONGO_URI)
		db = client[DB_NAME]
		scraper_status_collection = db['scraper_status']
		if (scraper_status_collection == None):
			raise Exception('could not connect to DB')
		elif (start_end == 'start'):
			start_scraper = scraper_status_collection.find_one_and_update(
				{'is_live': False},
				{'$set': {'is_live': True}}
     			)
			if (start_scraper == None):
				raise Exception('document not found, check parameter is set appropriately to start or end')
		elif (start_end == 'end'):
			end_scraper = scraper_status_collection.find_one_and_update(
				{'is_live': True},
     			{'$set': {'is_live': False}}
				)
			if (end_scraper == None):
				raise Exception('document not found, check parameter is set appropriately to start or end')
		else: raise Exception('please ensure parameter and set to start or end')
	except Exception as err:
		print(type(err))
		print(err) 
		print(err.args)
		pass

	
def scraper_stats_insert(data):
	try: 
		client = MongoClient(MONGO_URI)
		db = client[DB_NAME]
		scraper_stats_collection = db['scraper_stats']
		scraper_stats_collection.insert_one(data)
	except Exception as err:
		print(type(err))
		print(err)
		raise err

def scraper():
	scraper_status('start')
	start_time_total = time()
	date_key = get_time()
	# initially used a dict to store data, but need list as mongodb insertmany fx creates one document as opposed to individual documents if data is stored in dict
	# https://stackoverflow.com/questions/72085876/dictionary-to-mongodb-insert-all-data-in-one-document
	region_data_list = []
	scraper_stats = {date_key : {}}
	scraper_error_total = 0
	for region in regions:
		scraper_error = 0
		region_data = {}
		region_name = region[0]
		scraper_stats[date_key][region_name] = {}
		region_code = region[1]
		total_job_count = 0
		region_data = {
			'region': region_name,
			date_key: {
				'technologies': {},
				'total_job_count': 0
			}}
		for skill in developer_skills:
			response = requests.get(f'https://www.adzuna.ca/search?q={skill}&loc={region_code}')
			# parse response with bs4
			soup = BeautifulSoup(response.text, 'html.parser')
			title_node = soup.find('title')
			num_jobs_string = title_node.text.split()[0]
			try:
				if not (check_int(num_jobs_string)):
					num_jobs = 0
				elif (len(num_jobs_string) >= 5):
					num_jobs = int(num_jobs_string.replace(',', ''))
				else: 
					num_jobs = int(num_jobs_string)	
				scraper_stats[date_key][region_name][skill] = 'success'
				region_data[date_key]['technologies'][skill] = num_jobs
				total_job_count += num_jobs
				# add 0.2s delay in loop iterations to not overload their servers when scraping - i'm sure they are fine but just in case :)
				sleep(0.2)
			except Exception as err:
				num_jobs = 0
				region_data[date_key]['technologies'][skill] = num_jobs
				total_job_count += num_jobs
				scraper_error += 1
				scraper_error_total += 1
				scraper_stats[date_key][region_name][skill] = {
					'type': type(err),
					'args' : err.args,
					'error': err}
				sleep(0.2)
				continue
		scraper_stats[date_key][region_name]['error_count'] = scraper_error
		region_data[date_key]['total_job_count'] = total_job_count
		region_data_list.append(region_data)
		print(f'{region_name} done')
		sleep(0.2)
	scraper_stats[date_key]['total_error_count'] = scraper_error_total
	elapsed_time_total = time() - start_time_total
	scraper_stats[date_key]['time_elapsed'] = elapsed_time_total
	scraper_stats_insert(scraper_stats)
	scraper_status('end')
	return region_data_list, date_key






