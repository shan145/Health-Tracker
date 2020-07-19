from . import health
from flask import render_template, flash, redirect, url_for, request
from flask_login import current_user, login_required
from .forms import HealthForm
from .. import db
from ..model import Health
import datetime

@health.route('/dashboard')
@login_required
def dashboard():
    # Renders dashboard page for user on /dashboard route
    # Queries from DB all health data to use for creating graph
    health_data = Health.query.filter_by(person_id=current_user.id).all()

    # Sanity check 
    if len(health_data) == 0:
        print('Nothing inside yet')
    else:
        print(len(health_data))
    return render_template('health/dashboard.html', title='Dashboard')

@health.route('/dashboard/add', methods=['GET', 'POST'])
@login_required
def add_weight():
    # Add health data to DB
    form = HealthForm()

    if form.is_submitted():
        # Update form date data to match check if it matches standards
        form.date.data = request.form['date']
        if form.validate():
            # Need to reorder time to allow it to match database DATE type
            # sql_date = datetime.datetime.strptime(form.date.data, "%m/%d/%Y").strftime
            # Query to see if current user already has a weight for this date
            health = Health.query.filter_by(person_id=current_user.id, date = form.date.data).first()

            #If this query exists, then redirect to edit weight
            if health is not None:
                flash('A weight is already set for this date. Redirecting to edit.')
                redirect(url_for('health.edit_weight'))
            
            # Create weight data from model and add to database
            weight = Health(weight = form.weight.data, date = form.date.data, person_id = current_user.id)
            db.session.add(weight)
            try:
                db.session.commit()
                flash('You have successfully added the weight!')
                # redirect to dashboard with updated board
                return redirect(url_for('health.dashboard'))
            except Exception:
                db.session.rollback()
                flash('Adding data failed. Please try again at a later time.')
        
    return render_template('health/weight.html', action='Add', add_weight=True, form=form, title='Add Weight')

@health.route('/dashboard/edit/<int:id>', methods=['GET','POST'])
@login_required
def edit_weight(id):
    # Edit health data to DB
    health = Health.query.get_or_404(id)
    form = HealthForm(obj=health)
    if form.validate_on_submit():
        health.weight = form.weight.data
        health.date = form.date.data
        try:
            db.session.commit()
            flash('You have successfully edited the weight!')

            # redirect to dashboard
            redirect(url_for('health.dashboard'))
        except Exception:
            db.session.rollback()
            flash('Editing data failed. Please try again at a later time.')

    return render_template('health/weight.html', action='Edit', add_weight=False, form=form, health=health, title='Edit Weight')

@health.route('/dashboard/delete/<int:id>', methods=['GET', 'POST'])
@login_required
def delete_weight(id):
    # Delete health data from DB
    health = Health.query.get_or_404(id)
    db.session.delete(health)
    try:
        db.session.commit()
        flash('You have successfully deleted the weight!')
    except Exception:
        db.session.rollback()
        flash('Deleting data failed. Please try again at a later time.')
    return render_template(title='Delete Data')



        
