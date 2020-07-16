# health_app/users/routes.py

from flask import render_template
from flask_login import login_required

from . import user

@user.route('/home')
def startpage():
    # Renders start page on / route
    return render_template('users/index.html', title='Welcome')