from flask import Flask, render_template, jsonify, make_response, Blueprint
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy 
from dotenv import load_dotenv
import os 

# Use dotenv to load env variables
load_dotenv()
# Database
db = SQLAlchemy()

# Login Manager for Users
login_manager = LoginManager()

# Creating flask app for use throughout
app = Flask(__name__, static_url_path='/static')
app.config.from_object(os.getenv('APP_SETTINGS'))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db.init_app(app)

# Default test route for Flask
@app.route('/')
def test():
    return 'Route successful'

# Setting up login manager for app
# login_manager.init_app(app)
# login_manager.login_message = "Login required" 

# Registering blueprints for app
from .users import user as user_blueprint
app.register_blueprint(user_blueprint)

from .health import health as health_blueprint
app.register_blueprint(health_blueprint)

