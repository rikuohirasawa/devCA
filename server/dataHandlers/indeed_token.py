import requests
from dotenv import load_dotenv, dotenv_values
import os
from bs4 import BeautifulSoup

import datetime

from datetime import date
from pymongo import MongoClient


# load mongodb information stored in .env
load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
DB_NAME = os.getenv('DB_NAME')

def importData():
    # connect to mongodb
    client = MongoClient(MONGO_URI)
    try:
        # get db and collection
        db = client[DB_NAME]
        job_collection = db['technology_data']
        job_collection.delete_many({})
    except Exception as err:
        print(type(err))
        print(err.args)
        print(err)
        raise

importData()


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
