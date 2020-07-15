from flask import Flask, render_template, jsonify, make_response 
from flask_sqlalchemy import SQLAlchemy 
import os 

# Configure Flask App
app = Flask(__name__, static_url_path='/static')
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True 

# Database
db = SQLAlchemy(app)