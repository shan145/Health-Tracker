from flask import Blueprint

# Creating Blueprint for accessing routes for HEALTH data
health = Blueprint('health', __name__)

from . import routes