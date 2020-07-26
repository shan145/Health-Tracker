import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from health_app import application, db, model

# Build manager
migrate = Migrate(application, db, compare_type=True)
manager = Manager(application)
manager.add_command("db", MigrateCommand)

if __name__ == "__main__":
  manager.run()