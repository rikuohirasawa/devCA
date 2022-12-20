from flask import Flask, request, jsonify
import requests

from utils.get_time import get_time

print(get_time())




# app = Flask(__name__)

# @app.route('/test', methods=['GET'])
# def test():
#     return jsonify({'content': None, 'sentBy': 'server'})

# if __name__ == '__main__':
#     app.run('localhost', 8000)