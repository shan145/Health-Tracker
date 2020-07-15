from . import * 

class User(Base):
    __tablename__ = 'users'
    id            = db.Column(db.Integer, primary_key = True)
    first_name    = db.Column(db.String(256), nullable = False)
    last_name     = db.Column(db.String(256), nullable = False)
    email         = db.Column(db.String(256), unique = True, nullable = False)
    password      = db.Column(db.String(1024), nullable = False)

    def __init__(self, **kwargs):
        """Constructor"""
        self.first_name = kwargs.get('first_name', None)
        self.last_name = kwargs.get('last_name', None)
        self.email = kwargs.get('email', None)
        self.password = kwargs.get('password', None)

class Health(Base):
    __tablename__ = 'health'
    id            = db.Column(db.Integer, primary_key = True)
    weight        = db.Column(db.Integer, nullable=False)
    person_id     = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, **kwargs):
        """Constructor"""
        self.weight = kwargs.get('weight')
        self.person_id = kwargs.get('person_id')

db.create_all()