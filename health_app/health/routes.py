from . import health
from flask import render_template
from flask_login import login_required

@health.route('/dashboard')
@login_required
def dashboard():
    # Renders dashboard page for user on /dashboard route
    return render_template('health/dashboard.html')