import requests
import bs4
import json
# using rapid api to make calls to scrapeninja, a scraping api that bypasses cloudflare 403 errors 
# https://pixeljets.com/blog/bypass-cloudflare/
developer_skills = ['javascript, html, css, python, sql, java, node.js, typescript, c#, bash, c++']
regions = ['alberta', 'british%20columbia', 'manitoba', 'new%20brunswick', 'newfoundland%20and%20labrador', 'northwest%20territories', 'nova%20scotia', 'nunavut', 'ontario', 'prince%20edward%20island', 'quebec', 'saskatchewan', 'yukon']


response = requests.get('https://www.adzuna.ca/search?q=python&w=newfoundland')
# parse response with bs4
soup = bs4.BeautifulSoup(response.text, 'html.parser')
# select tag that contains quanitity of jobs
html_tag = soup.select_one('span.mr-1')
# select number value and convert to int
num_value = int(html_tag.get('data-cy-count'))

class RegionData:
	def __init__(self, technology):
		self.technology = technology

class TechnologyData: 
	def __init__(self, region):
		self.region = region

# for skill in developer_skills:
# 	for region in regions:
# 		response = requests.get(f'https://www.adzuna.ca/search?q={skill}&w={region}')
# 		soup = bs4.BeautifulSoup(response.text, 'html.parser')
# 		jobs_available = soup.title.split(' ', 1)



# response = requests.request("POST", url, json=payload, headers=headers)
# soup = bs4.BeautifulSoup(response, 'html.parser')
# print(soup.prettify())
