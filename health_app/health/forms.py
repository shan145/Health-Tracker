# health_app/health/forms.py

from flask_wtf import FlaskForm
from wtforms import IntegerField, DateField, SubmitField
from wtforms.validators import DataRequired

class HealthForm(FlaskForm):
    # Form for adding or editing health data
    weight = IntegerField('Weight', validators=[DataRequired()])
    date = DateField('Date', validators=[DataRequired()])
    submit = SubmitField('Submit')