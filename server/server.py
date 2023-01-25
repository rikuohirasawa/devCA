from flask import Flask, request, jsonify, Response, Request, make_response
import requests
from flask_cors import CORS
from apiHandlers.get_data import get_data
from apiHandlers.get_scraper_stats import scraper_stats, scraper_status
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

sentry_sdk.init(
    dsn="https://38fa2a655bbe49adb857c5230aefa055@o4504565682667520.ingest.sentry.io/4504565687320576",
    integrations=[
        FlaskIntegration(),
    ],
    traces_sample_rate=1.0
)

app = Flask(__name__)
CORS(app)

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

# @app.route('/debug-sentry')
# def trigger_error():
#     data = division_by_zero = 1 / 0
#     response = jsonify(data)
#     response.headers.set('Access-Control-Allow-Origin', '*')
#     return response


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