# health_app/users/routes.py

from flask import render_template, flash, redirect, url_for
from flask_login import login_required, login_user, logout_user

from . import user
from .forms import LoginForm, RegistrationForm
from .. import db
from ..model import User

@user.route('/home')
def startpage():
    # Renders start page on /home route
    return render_template('users/index.html', title='Welcome')

@user.route('/register', methods=['GET', 'POST'])
def register():
    # Handles route for registering new users
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(first_name=form.first_name.data,
                    last_name=form.last_name.data,
                    email=form.email.data,
                    password=form.password.data)
        
        # Add user to the database
        db.session.add(user)
        try:
            db.session.commit()
            flash('You have been successfully registered! You may now login.')
            # redirect to login page after successful registration
            return redirect(url_for('user.login'))
        except Exception:
            db.session.rollback()
            flash('Registration failed. Please try again at a later time.')
    
    # load registration template
    return render_template('users/register.html', form=form, title='Register')

@user.route('/login', methods=['GET', 'POST'])
def login():
    # Handles route for logging in users
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if (user is not None) and (user.check_password(form.password.data)):
            # Log user in
            login_user(user)
            # Redirect to health page after login
            return redirect(url_for('health.dashboard'))
        else:
            flash('Incorrect email or password')
    return render_template('users/login.html', form=form, title='Login')

@user.route('/logout')
@login_required
def logout():
    # Handles route for logging out users
    logout_user()
    flash('You have successfully logged out')

    return redirect(url_for('.startpage'))

        

