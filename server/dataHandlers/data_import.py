from dotenv import load_dotenv
import os
from pymongo import MongoClient
from scraper import scraper


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
        job_collection = db['job_data']
        scraped_data = scraper() 
        job_collection.insert_many(scraped_data)
        print(scraped_data)
    except Exception as err:
        print(type(err))
        print(err.args)
        print(err)
        raise

importData()