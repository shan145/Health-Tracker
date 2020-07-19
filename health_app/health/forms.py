# health_app/health/forms.py

from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField, DateField
from wtforms.validators import DataRequired

class HealthForm(FlaskForm):
    # Form for adding or editing health data
    weight = IntegerField('Weight', validators=[DataRequired('Please enter a valid weight')])
    date = DateField('Date', validators=[DataRequired('Please enter a valid date')])
    submit = SubmitField('Submit')