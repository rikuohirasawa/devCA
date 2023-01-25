from flask import Flask, request, jsonify, Response, Request, make_response
import requests
# from flask_cors import CORS
from apiHandlers.get_data import get_data
from apiHandlers.get_scraper_stats import scraper_stats, scraper_status

# print(get_data('region_data'))
app = Flask(__name__)

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'content': 'hello', 'sentBy': 'server'})

@app.route('/get-region-data', methods=['GET'])
def get_region():
    data = get_data(request.args.get('table'), request.args.get('date'))
    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', '*')
    return response

@app.route('/get-technology-data', methods=['GET'])
def get_technologies():
    data = get_data(request.args.get('table'), request.args.get('date'))
    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', '*')
    return response

@app.route('/scraper-stats', methods=['GET'])
def get_scraper_stats():
    data = scraper_stats()
    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', '*')
    return response
# return data re: scraper currently running
@app.route('/scraper-status', methods=['GET'])
def get_scraper_status():
    data = scraper_status()
    response = jsonify(data)
    response.headers.set('Access-Control-Allow-Origin', '*')
    return response


# @app.route('/get-region-data/:name/:date', methods=['GET'])
# def test():
#     return jsonify({'content': None, 'sentBy': 'server'})

# @app.route('/get-technology-data', methods=['GET'])
# def test():
#     return jsonify({'content': None, 'sentBy': 'server'})

# @app.route('/get-technology-data/:name', methods=['GET'])
# def test():
#     return jsonify({'content': None, 'sentBy': 'server'})

if __name__ == '__main__':
    app.run('localhost', 8000)