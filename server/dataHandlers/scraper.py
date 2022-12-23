import requests
from bs4 import BeautifulSoup
from datetime import date
import datetime
from time import sleep
from utils.get_time import get_time

# Assembly, R, Go, C were appended 'developer' or 'language' to their search query, as I did not find they were accurately represented - for example my initial query returned R as having 875 opening in Alberta, more than JS (257) and Python (371) combined
# This does mean that the data could be misrepresented now in other ways, currently working towards a solution
# Swift, APL, VBA and Crystal were omitted entirely as their names were not verbose enough for the search engine to accurately represent their data - my solution of appending 'developer' or 'language' to the query proved was not effective 
# C# = c%23
# C++ = c%2B%2B
# F# = F%23
developer_skills = ['Javascript', 'Python','HTML', 'CSS', 'Python', 'SQL', 'Java', 'Node.js', 'Typescript','c%23', 'Bash', 'c%2B%2B', 'PHP', 'C%20developer', 'PowerShell', 'Golang', 'Kotlin', 'Rust', 'Ruby', 'Dart', 'assembly%20language', 'R%20developer', 'Matlab', 'Groovy', 'Objective-C', 'Scala', 'Perl', 'Haskell', 'Delphi', 'Clojure', 'Elixir', 'LISP', 'Julia', 'F%23', 'Erlang', 'COBOL']

regions = [('alberta', '111149'), ('british_columbia', '111152'), ('manitoba', '111151'), ('new_brunswick', '111154'), ('newfoundland_and_labrador', '111157'), ('northwest_territories', '111155'), ('nova_scotia', '111153'), ('nunavut', '111148'), ('ontario', '111147'), ('prince_edward_island', '111156'), ('quebec', '111158'), ('saskatchewan', '111146'), ('yukon', '111150')]

def scraper():
	# initially used a dict to store data, but need list as mongodb insertmany fx creates one document as opposed to individual documents if data is stored in dict
	# https://stackoverflow.com/questions/72085876/dictionary-to-mongodb-insert-all-data-in-one-document
	region_data_list = []

	for region in regions:
		region_data = {}
		region_name = region[0]
		region_code = region[1]
		total_job_count = 0
		date_key = get_time()
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
				# if over a thousand, replace commas so can be parsed to int
				if (len(num_jobs_string) >= 5):
					num_jobs = int(num_jobs_string.replace(',', ''))
				else:
					num_jobs = int(num_jobs_string)
			except ValueError:
				num_jobs = 0
			region_data[date_key]['technologies'][skill] = num_jobs
			total_job_count += num_jobs
			# add 1s delay in loop iterations to not overload their servers when scraping - i'm sure they are fine but just in case :)
			sleep(1)
		region_data[date_key]['total_job_count'] = total_job_count
		region_data_list.append(region_data)
		print(f'{region_name} done')
		sleep(1)
	return region_data_list






