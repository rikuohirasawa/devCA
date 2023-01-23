import requests
from bs4 import BeautifulSoup
from datetime import date
from time import sleep, time
from utils.get_time import get_time
from pymongo import MongoClient, ReturnDocument
from dotenv import load_dotenv
import os

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
DB_NAME = os.getenv('DB_NAME')

# this scraper is used for initial scraping, see scraper_update.py for the scraper used in updating collections

# Assembly, R, Go, C were appended 'developer' or 'language' to their search query, as I did not find they were accurately represented - for example my initial query returned R as having 875 opening in Alberta, more than JS (257) and Python (371) combined
# This does mean that the data could be misrepresented now in other ways, currently working towards a solution
# Swift, APL, VBA and Crystal were omitted entirely as their names were not verbose enough for the search engine to accurately represent their data - my solution of appending 'developer' or 'language' to the query proved was not effective 
# C# = c%23
# C++ = c%2B%2B
# F# = F%23
developer_skills = ['Javascript', 'Python','HTML', 'CSS', 'Python', 'SQL', 'Java', 'Node.js', 'Typescript','c%23', 'Bash', 'c%2B%2B', 'PHP', 'C%20developer', 'PowerShell', 'Golang', 'Kotlin', 'Rust', 'Ruby', 'Dart', 'assembly%20language', 'R%20developer', 'Matlab', 'Groovy', 'Objective-C', 'Scala', 'Perl', 'Haskell', 'Delphi', 'Clojure', 'Elixir', 'LISP', 'Julia', 'F%23', 'Erlang', 'COBOL']

regions = [('AB', '111149'), ('BC', '111152'), ('MB', '111151'), ('NB', '111154'), ('NF', '111157'), ('NT', '111155'), ('NS', '111153'), ('NU', '111148'), ('ON', '111147'), ('PE', '111156'), ('QC', '111158'), ('SK', '111146'), ('YT', '111150')]

def scraper():
	start_time_total = time()
	date_key = get_time()
	print(date_key)
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
			# if jobs exist, set num to equal number of jobs - else zero
			title_node = soup.find('title')
			num_jobs_string = title_node.text.split()[0]
			try:
				# when there are no jobs available, parse returns 'No'
				if (num_jobs_string == 'No'): 
					num_jobs = 0
				# if over a thousand, replace commas so can be parsed to int
				elif (len(num_jobs_string) >= 5):
					num_jobs = int(num_jobs_string.replace(',', ''))
				else:
					num_jobs = int(num_jobs_string)	
				scraper_stats[date_key][region_name][skill] = 'success'
				region_data[date_key]['technologies'][skill] = num_jobs
				total_job_count += num_jobs
				sleep(0.5)
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
				sleep(0.5)
				continue
			# add 1s delay in loop iterations to not overload their servers when scraping - i'm sure they are fine but just in case :)
		scraper_stats[date_key][region_name]['error_count'] = scraper_error
		region_data[date_key]['total_job_count'] = total_job_count
		region_data_list.append(region_data)
		print(region_data)
		print(f'{region_name} done')
		sleep(0.5)
	scraper_stats[date_key]['total_error_count'] = scraper_error_total
	elapsed_time_total = time() - start_time_total
	scraper_stats[date_key]['time_elapsed'] = elapsed_time_total
	try: 
		client = MongoClient(MONGO_URI)
		db = client[DB_NAME]
		scraper_collection = db['scraper_stats']
		scraper_collection.insert_one(scraper_stats)
	except Exception as err:
		print(type(err))
		print(err) 
		print(err.args)
	return region_data_list, date_key






