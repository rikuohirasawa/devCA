import requests
from bs4 import BeautifulSoup
from datetime import date
import datetime
from time import sleep
from utils.get_time import get_time

developer_skills = ['Javascript', 'Python','HTML', 'CSS', 'Python', 'SQL', 'Java', 'Node.js', 'Typescript','c%23', 'Bash', 'c%2B%2B', 'PHP', 'C%20developer', 'PowerShell', 'Golang', 'Kotlin', 'Rust', 'Ruby', 'Dart', 'assembly%20language', 'R%20developer', 'Matlab', 'Groovy', 'Objective-C', 'Scala', 'Perl', 'Haskell', 'Delphi', 'Clojure', 'Elixir', 'LISP', 'Julia', 'F%23', 'Erlang', 'COBOL']

regions = [('AB', '111149'), ('BC', '111152'), ('MB', '111151'), ('NB', '111154'), ('NF', '111157'), ('NT', '111155'), ('NS', '111153'), ('NU', '111148'), ('ON', '111147'), ('PE', '111156'), ('QC', '111158'), ('SK', '111146'), ('YT', '111150')]
# scraper to update data
def scraper_update():
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
	return region_data_list, date_key