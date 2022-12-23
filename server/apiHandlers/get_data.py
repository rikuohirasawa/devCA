from dotenv import load_dotenv
import os
from pymongo import MongoClient
import requests
from flask import Response, Request, jsonify, json
import json
load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
DB_NAME = os.getenv('DB_NAME')

def get_data(collection_name, date):
    client = MongoClient(MONGO_URI)
    try:
        db = client[DB_NAME]
        collection = db[collection_name]
        data = list(collection.find({}))
        if (data):
        # calculate sum of all jobs and append it to the end of list
            sum_jobs = 0
            for doc in data:
                # delete
                del doc['_id']
                sum_jobs += doc[date]['total_job_count']
            data.append({'sum_jobs': sum_jobs})
            # print(data)
            # print(data[-1]['sum_jobs'])
            return data
        else: raise Exception('error retrieving data from DB, verify collection name is valid')
    except Exception as err:
        # print(type(err))
        # print(err.args)
        # print(err)
        return err

get_data('region_data', '2022-12-23')
