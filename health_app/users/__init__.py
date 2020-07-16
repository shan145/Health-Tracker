from flask import Blueprint

# Creating Blueprint to access routes for USERS
user = Blueprint('user', __name__)

from . import routes
