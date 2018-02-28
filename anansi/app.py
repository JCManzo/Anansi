import os
import sqlite3

from .config import *
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash

# Create application instance.
app = Flask(__name__, static_folder=ASSETS_FOLDER, template_folder=TEMPLATE_FOLDER)

# Load config from this file.
app.config.from_object(__name__)

# Loads default config and overrides config from an enviroment variable.
app.config.update(dict(
    DEBUG=True,
    # TODO: Look into app.root_path alternative 'instance folders'
    DATABASE=os.path.join(app.root_path, 'anansi.db'),
    SECRET_KEY='whereyouend',  # Used to keep client-side sessions secure
    USERNAME='admin',  # TODO: change default creds
    PASSWORD='default'
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)


def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv


def get_db():
    # Opens new db connection or returns any existing one for the current context
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db


@app.teardown_appcontext
def close_db(error):
    # Close db at end of request
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()


def init_db():
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()


@app.cli.command('initdb')
def initdb_command():
    # Init the db
    init_db()
    print('Initialized the database')


@app.route('/')
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run()
