from dotenv import load_dotenv
import os
from pymongo import MongoClient
from scraper import scraper


# load mongodb information stored in .env
load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
DB_NAME = os.getenv('DB_NAME')
# import data by region
def import_region_data():
    # connect to mongodb
    client = MongoClient(MONGO_URI)
    try:
        # get db and collection
        db = client[DB_NAME]
        job_collection = db['region_data']
        scraped_data = scraper() 
        job_collection.insert_many(scraped_data[0])
        print(scraped_data)
    except Exception as err:
        print(type(err))
        print(err.args)
        print(err)
        raise
    client.close()

# import_region_data()


developer_skills = ['Javascript', 'Python','HTML', 'CSS', 'Python', 'SQL', 'Java', 'Node.js', 'Typescript','c%23', 'Bash', 'c%2B%2B', 'PHP', 'C%20developer', 'PowerShell', 'Golang', 'Kotlin', 'Rust', 'Ruby', 'Dart', 'assembly%20language', 'R%20developer', 'Matlab', 'Groovy', 'Objective-C', 'Scala', 'Perl', 'Haskell', 'Delphi', 'Clojure', 'Elixir', 'LISP', 'Julia', 'F%23', 'Erlang', 'COBOL']

regions = [('alberta', 0), ('british_columbia', 1), ('manitoba', 2), ('new_brunswick', 3), ('newfoundland_and_labrador', 4), ('northwest_territories', 5), ('nova_scotia', 6), ('nunavut', 7), ('ontario', 8), ('prince_edward_island', 9), ('quebec', 10), ('saskatchewan', 11), ('yukon', 12)]

# import data by technology
# i am down so astronomically bad with this solution... i can't figure out how to access the individual items from the db query - I've tried looping over the returned list, as well as attempting to convert the mongodb cursor to a dict but no dice, so ive attached indexes to each region name to be used to access the data ¯\_(ツ)_/¯ - will return later to try again
def import_technology_data(date):
    client = MongoClient(MONGO_URI)
    try:
        db = client[DB_NAME]
        region_collection = db['region_data']
        data = list(region_collection.find())
        technology_data_list = []
        for skill in developer_skills:
            technology_data = {}
            total_job_count = 0
            technology_data = {
                'technology': skill,
                date: {
                    'regions': {},
                    'total_job_count': 0
                }}
            for region in regions:
                region_name = region[0]
                region_index = region[1]
                data_point = data[region_index][date]['technologies'][skill]
                technology_data[date]['regions'][region_name] = data_point
                total_job_count += data_point
                print(type(data_point))
                print(f'{region_name} {skill} is {data_point}')
            technology_data[date]['total_job_count'] = total_job_count
            technology_data_list.append(technology_data)
        print(technology_data_list)
        technology_collection = db['technology_data']
        technology_collection.insert_many(technology_data_list)
    except Exception as err:
        print(type(err))
        print(err.args)
        print(err)
        raise

# import_technology_data('2022-12-23')

# added this fx afterwards to update data to also represent percentage of jobs in each region - using seperate fx as i dont want to scrape again
# def update_percentages_region(date):
#     client = MongoClient(MONGO_URI)
#     try:
#         db = client[DB_NAME]
#         collection = db['region_data']
#         data = list(collection.find({}))
#         sum_jobs = 0
#         region_count = [('alberta', 0), ('british_columbia', 0), ('manitoba', 0), ('new_brunswick', 0), ('newfoundland_and_labrador', 0), ('northwest_territories', 0), ('nova_scotia', 0), ('nunavut', 0), ('ontario', 0), ('prince_edward_island', 0), ('quebec', 0), ('saskatchewan', 0), ('yukon', 0)]
#         for doc in data:
#             sum_jobs += doc[date]['total_job_count']
#         for region in region_count:
#             region_name = region[0]
#             region_total = region[1]
#             collection.find_one_and_update(
#                 { 'region': region_name },
#                 { '$set ': {'percentage': '${total_job_count}'/sum_jobs}}
#                 )
#     except Exception as err:
#         print(type(err))

# update_percentages_region('2022-12-23')




        



