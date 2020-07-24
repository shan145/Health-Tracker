from flask import Flask, render_template, jsonify, make_response, Blueprint
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
from flask_wtf.csrf import CSRFProtect

import os 

# Database
db = SQLAlchemy()

# CSRF protector
csrf = CSRFProtect()

# Login Manager for Users
login_manager = LoginManager()

# Creating flask app for use throughout
application = Flask(__name__)
application.config.from_object(os.environ.get('APP_SETTINGS'))
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
SECRET_KEY = os.urandom(32)
application.config['SECRET_KEY'] = SECRET_KEY
csrf.init_app(application)
db.init_app(application)

# Setting up login manager for app
login_manager.init_app(application)
login_manager.login_message = "Login is required to enter dashboard"
login_manager.login_view="user.login"

# Sets up Bootstrap to allow for wtf forms
Bootstrap(application)

# Registering blueprints for app
from .users import user as user_blueprint
application.register_blueprint(user_blueprint)

from .health import health as health_blueprint
application.register_blueprint(health_blueprint)

