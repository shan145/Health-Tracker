from . import health
from flask import render_template

@health.route('/dashboard')
def dashboard():
    # Renders dashboard page for user on /dashboard route
    return render_template('health/dashboard.html')