import requests
from dotenv import load_dotenv, dotenv_values
import os
from bs4 import BeautifulSoup

import datetime

from datetime import date
from pymongo import MongoClient

# import time
# from time import sleep

# developer_skills = ['Javascript', 'Python','HTML', 'CSS', 'Python', 'SQL', 'Java', 'Node.js', 'Typescript','c%23', 'Bash', 'c%2B%2B', 'PHP', 'C%20developer', 'PowerShell', 'Golang', 'Kotlin', 'Rust', 'Ruby', 'Dart', 'assembly%20language', 'R%20developer', 'Matlab', 'Groovy', 'Objective-C', 'Scala', 'Perl', 'Haskell', 'Delphi', 'Clojure', 'Elixir', 'LISP', 'Julia', 'F%23', 'Erlang', 'COBOL']

# def start():
#     start_time = time.time()
#     for skill in developer_skills:
#         print(skill)
#         sleep(1)
#     print('time:', time.time() - start_time)
# start()

regions = [('AB', '111149'), ('BC', '111152'), ('MB', '111151'), ('NB', '111154'), ('NF', '111157'), ('NT', '111155'), ('NS', '111153'), ('NU', '111148'), ('ON', '111147'), ('PE', '111156'), ('QC', '111158'), ('SK', '111146'), ('YT', '111150')]
load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
DB_NAME = os.getenv('DB_NAME')

def import_scraper_data():
    # connect to mongodb
    client = MongoClient(MONGO_URI)
    try:
        # get db and collection
        db = client[DB_NAME]
        scraper_collection = db['scraper_stats']
        for region in regions:
            insert = scraper_collection.insert_one(
                {'region': region[0]}
            )
            print(insert)
    except Exception as err:
        print(type(err))
        print(err.args)
        print(err)
        raise
    client.close()

# import_scraper_data()

def x():
    client = MongoClient(MONGO_URI)
    try:
        db = client[DB_NAME]
        technology_collection = db['technology_data']
        region_collection = db['region_data']
        region_list = list(region_collection.find())
        for region in region_list:
            print(region['2023-1-19']['technologies']['Javascript'])
    except:
        print('lol')

# x()

print(int('0'))
# load mongodb information stored in .env
# load_dotenv()
# MONGO_URI = os.getenv('MONGO_URI')
# DB_NAME = os.getenv('DB_NAME')

# def updateNames():
#     client = MongoClient(MONGO_URI)
#     names = {
#         'alberta': 'AB', 
#         'british_columbia': 'BC',
#         'manitoba': 'MB',
#         'new_brunswick': 'NB',
#         'newfoundland_and_labrador': 'NF',
#         'northwest_territories': 'NT',
#         'nova_scotia': 'NS',
#         'nunavut': 'NU',
#         'ontario': 'ON',
#         'prince_edward_island': 'PE',
#         'quebec': 'QC',
#         'saskatchewan': 'SK',
#         'yukon': 'YT'
#     }
#     try:
#         db = client[DB_NAME]
#         collection = db['region_data']
#         for name in names:
#             print(name)
#             print(names[name])
#             collection.find_one_and_update(
#                 {'region': name},
#                 {'$set': {'region': names[name]}}
#             )
#         # data = list(collection.find())
#         # print(data)
#     except Exception as err: 
#         print(err.args)

# updateNames()

# def importData():
#     # connect to mongodb
#     client = MongoClient(MONGO_URI)
#     try:
#         # get db and collection
#         db = client[DB_NAME]
#         job_collection = db['technology_data']
#         job_collection.delete_many({})
#     except Exception as err:
#         print(type(err))
#         print(err.args)
#         print(err)
#         raise

# importData()


# response = requests.get('https://www.adzuna.ca/search?q=python&loc=111152')
# soup = BeautifulSoup(response.text, 'html.parser')
# title = soup.find('title')
# title_split = title.text.split()
# print(title.text.split()[0])
# print(len(title_split[0]))


# try:
#     if (len(title_split[0]) >= 5):
#         print(int(title_split[0].replace(',', '')))
#     else: 
#         int(title_split[0])
#         print('true')
#         print(int(title_split[0]))
# except ValueError: 
#     print('false')

# if (soup.select_one('span.mr-1').get('data-cy-count')):
#     # select tag that contains quanitity of jobs
#     html_tag = soup.select_one('span.mr-1')
#     # select number value and convert to int
#     num_value = int(html_tag.get('data-cy-count'))
# else: 
#     num_value = 0

# print(soup.select_one('span.mr-1'))

# date_string = str(datetime.date.today())
# print(date_string)
# date_obj = datetime.datetime.strptime(date_string, '%Y-%m-%d')


# currentDay = datetime.datetime.now().day
# currentMonth = datetime.datetime.now().month
# currentYear = datetime.datetime.now().year

# print((currentMonth))
# print((currentYear))
# print((currentDay))

# date_obj = datetime.datetime.strptime('2022-12-20', '%Y-%m-%d')
# print(date_obj)

# load env variables to get access token
# load_dotenv()
# client_id = os.getenv('INDEED_CLIENT_ID')
# client_secret = os.getenv('INDEED_CLIENT_SECRET')
# request_headers = {
#     'Content-Type': 'application/x-www-form-urlencoded',
#     'Accept': 'application/json',
# }

# def get_access_token():
#     request_body = (f'grant_type=client_credentials&scope=employer_access&client_id={client_id}&client_secret={client_secret}')
#     response = requests.post('https://apis.indeed.com/oauth/v2/tokens', headers=request_headers, data=request_body)
#     access_token = response.json()['access_token']
#     print(access_token)
#     print(response.json())

# get_access_token()

# url = "https://auth.emsicloud.com/connect/token"

# payload = "client_id=%3CCLIENT_ID%3E&client_secret=%3CCLIENT_SECRET%3E&grant_type=client_credentials&scope=jobs"
# headers = {'Content-Type': 'application/x-www-form-urlencoded'}

# response = requests.request("POST", url, data=payload, headers=headers)

# print(response.text)
