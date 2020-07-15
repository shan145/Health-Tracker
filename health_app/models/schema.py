from .model import *
from marshmallow_sqlalchemy import field_for

# Marshmallow-sqlalchemy to create schemas for easier extraction of data
class UserSchema(ModelSchema):
    class Meta(ModelSchema.Meta):
        model = User
        include_fk = True

class HealthSchema(ModelSchema):
    class Meta(ModelSchema.Meta):
        model = Health
        include_fk = True