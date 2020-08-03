import os

# Database info
DB_USERNAME  = os.environ.get('DB_USERNAME')
DB_PASSWORD  = os.environ.get('DB_PASSWORD')
DB_HOST      = os.environ.get('DB_HOST')
DB_NAME      = os.environ.get('DB_NAME')
DB_URL       = 'postgresql://{}:{}@{}/{}'.format(DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME)

# Ensure Python path
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
  """
  Parent app configuration (extended by all environment configurations)
  """
  DEBUG = False
  TESTING = False
  CSRF_ENABLED = True
  CSRF_SESSION_KEY = "secret"
  SECRET_KEY = 'I5EQiInjTkL2iECqZ_FFrbHohXMk_BBi'
  SQLALCHEMY_DATABASE_URI = DB_URL
  THREADS_PER_PAGE = 2

class ProductionConfig(Config):
  """
  Production environment app configuration
  """
  DEBUG = False

class StagingConfig(Config):
  """
  Staging environment app configuration
  """
  DEVELOPMENT = True
  DEBUG = True

class DevelopmentConfig(Config):
  """
  Development environment app configuration
  """
  DEVELOPMENT = True
  DEBUG = True

class TestingConfig(Config):
  """
  Testing environment app configuration
  """
  TESTING = True