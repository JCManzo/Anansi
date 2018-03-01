from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from application.app import app, db

migrate = Migrate(app, db)

# migrations
manager = Manager(app)
manager.add_command('db', MigrateCommand)


@manager.command
def create_db():
    # Initializes the database
    db.create_all()
    print('Init the db')


if __name__ == '__main__':
    manager.run()
