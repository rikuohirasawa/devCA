from dotenv import load_dotenv
import os
from pymongo import MongoClient

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
DB_NAME = os.getenv('DB_NAME')

def get_data(collection_name):
    client = MongoClient(MONGO_URI)
    try:
        db = client[DB_NAME]
        collection = db[collection_name]
        data = list(collection.find({}))
        for x in data:
            print(x)
    except Exception as err:
        print(type(err))
        print(err.args)
        print(err)
        raise

get_data('region_data')