import requests
from dotenv import load_dotenv, dotenv_values
import os

import datetime

now = datetime.date.today()
print(now)

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
