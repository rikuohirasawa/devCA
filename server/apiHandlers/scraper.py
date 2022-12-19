import requests
import bs4
import datetime
import time
# using rapid api to make calls to scrapeninja, a scraping api that bypasses cloudflare 403 errors 
# https://pixeljets.com/blog/bypass-cloudflare/
developer_skills = ['Javascript', 'Python']
# , 'HTML', 'CSS', 'Python', 'SQL', 'Java']
# , 'Node.js', 'Typescript', 'C#', 'Bash', 'C++', 'PHP', 'C', 'PowerShell', 'Go', 'Kotlin', 'Rust', 'Ruby', 'Dart', 'Assembly', 'Swift', 'R', 'VBA', 'Matlab', 'Groovy', 'Objective-C', 'Scala', 'Perl', 'Haskell', 'Delphi', 'Clojure', 'Elixir', 'LISP', 'Julia', 'F#', 'Erlang', 'APL', 'Crystal', 'COBOL'
regions = ['alberta', 'british%20columbia']
#, 'manitoba', 'new%20brunswick', 'newfoundland%20and%20labrador'
# , 'northwest%20territories', 'nova%20scotia', 'nunavut', 'ontario', 'prince%20edward%20island', 'quebec', 'saskatchewan', 'yukon'

# class SkillsData:
# 	def __init__(self, regions):
# 		self.technology = regions

# class RegionData: 
# 	def __init__(self, skills):
# 		self.region = skills

region_data = {'date': datetime.date.today()}
for region in regions:
	total_job_count = 0
	region_data[region] = {}
	for skill in developer_skills:
		response = requests.get(f'https://www.adzuna.ca/search?q={skill}&w={region}')
		# parse response with bs4
		soup = bs4.BeautifulSoup(response.text, 'html.parser')
		# select tag that contains quanitity of jobs
		html_tag = soup.select_one('span.mr-1')
		# select number value and convert to int
		num_value = int(html_tag.get('data-cy-count'))
		region_data[region][skill] = num_value
		total_job_count += num_value
		# add 1s delay in loop iterations to not overload their servers when scraping - i'm sure they are fine but just in case :)
		time.sleep(1)
	region_data[region]['total_job_count'] = total_job_count
	time.sleep(1)

print(region_data)




# response = requests.request("POST", url, json=payload, headers=headers)
# soup = bs4.BeautifulSoup(response, 'html.parser')
# print(soup.prettify())
