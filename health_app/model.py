from health_app import db, login_manager
from health_app.base import Base
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

# Sets up user_loader
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
    
class User(UserMixin, Base):
    __tablename__ = 'users'
    id            = db.Column(db.Integer, primary_key = True)
    first_name    = db.Column(db.String(256), nullable = False)
    last_name     = db.Column(db.String(256), nullable = False)
    email         = db.Column(db.String(256), unique = True, nullable = False)
    password_hash = db.Column(db.String(1024), nullable = False)

    @property
    def password(self):
        # Makes password inaccessible
        raise AttributeError('password is not readable')

    @password.setter
    def password(self, password):
        # Set password to hash
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        # Checks if password is actually equal to each other through hash
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<Email: {}>'.format(self.email)


class Health(Base):
    __tablename__ = 'health'
    id            = db.Column(db.Integer, primary_key = True)
    weight        = db.Column(db.Float, nullable=False)
    date          = db.Column(db.Date, nullable=False)
    person_id     = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return '<Health: {}>'.format(self.weight)

    

