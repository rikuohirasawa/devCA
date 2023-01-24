import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
DB_NAME = os.getenv('DB_NAME')

def scraper_stats():
    client = MongoClient(MONGO_URI)
    try:
        db = client[DB_NAME]
        collection = db['scraper_stats']
        data = list(collection.find({}))
        for doc in data:
            del doc['_id']
        print(data)
        return data
    except Exception as err:
        print(type(err))
        print(err.args)
        print(err)
        return err
    
def scraper_status():
    client = MongoClient(MONGO_URI)
    try:
        db = client[DB_NAME]
        collection = db['scraper_status']
        data = collection.find_one()
        del data['_id']
        print(data)
        return data
    except Exception as err:
        print(type(err))
        print(err.args)
        print(err)
        return err
    
print(scraper_status())
