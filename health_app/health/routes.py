from . import health
from flask import render_template, flash, redirect, url_for, request, jsonify
from flask_login import current_user, login_required
from .forms import HealthForm
from .. import db
from ..model import Health
import datetime

@health.route('/dashboard')
@login_required
def dashboard():
    # Renders dashboard page for user on /dashboard route
    health_data = get_sorted_health_info()
    return render_template('health/dashboard.html', title='Dashboard', health_data=health_data)

def get_sorted_health_info():
    # Queries from DB all health data to use for creating graph
    health_query_data = Health.query.filter_by(person_id=current_user.id).all()
    health_data = []
    for health in health_query_data:
        health_data.append(
            {
                'health_id': health.id,
                'weight': health.weight,
                'date': health.date
            }
        )
    sorted_health_data = sorted(health_data, key=lambda k: k['date'])
    final_health_data = []
    for health in sorted_health_data:
        final_health_data.append(
            {
                'health_id': health['health_id'],
                'weight': health['weight'],
                'date': health['date'].strftime("%m/%d/%Y")
            }
        )
    return final_health_data

@health.route('/dashboard/add', methods=['GET', 'POST'])
@login_required
def add_weight():
    # Add health data to DB
    health_weight = request.form.get('weightAdd')
    health_date = request.form.get('dateAdd')
    if (not health_date) or (not health_weight):
        flash('Unable to add data. Please fill out the form properly.', 'error')
    else:
        #Check to see if current user already has a weight for this date
        health = Health.query.filter_by(person_id=current_user.id, date=health_date).first()
        if health is not None:
            flash('A weight is already set for this date.', 'error')
        else:
            weight = Health(weight = health_weight, date=health_date, person_id=current_user.id)
            db.session.add(weight)
            try:
                db.session.commit()
                flash('You have successfully added the weight!')
            except Exception:
                db.session.rollback()
                flash('Please enter valid data for weight.', 'error')
    return redirect(url_for('health.dashboard'))


@health.route('/dashboard/edit/<string:id>', methods=['POST'])
@login_required
def edit_weight(id):
    # Edit health data to DB
    new_id = int(id)
    health = Health.query.get_or_404(new_id)
    health.weight = request.form.get("weight")
    try:
        db.session.commit()
        flash('You have successfully edited the weight!')
    except Exception:
        db.session.rollback()
        flash('Editing data failed. Please enter a valid number.', 'error')
    return redirect(url_for('health.dashboard'))

@health.route('/dashboard/delete/<string:id>', methods=['GET', 'POST'])
@login_required
def delete_weight(id):
    # Delete health data from DB
    new_id = int(id)
    health = Health.query.get_or_404(new_id)
    db.session.delete(health)
    try:
        db.session.commit()
        flash('You have successfully deleted the weight!')
    except Exception:
        db.session.rollback()
        flash('Deleting data failed. Please try again at a later time.')
    return redirect(url_for('health.dashboard'))



        
