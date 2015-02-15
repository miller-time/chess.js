import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, 'static'),
        'knight.ico', mimetype='image/vnd.microsoft.icon'
    )

@app.route('/')
def chessjs():
    return render_template("index.html")
