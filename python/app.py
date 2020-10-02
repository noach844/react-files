from flask import Flask, request, jsonify
from flask_cors import CORS
import os, patoolib
import json

app = Flask('__init__')
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route('/', methods=['GET'])
def getme():
    return "yay"


@app.route('/', methods=['POST'])
def upload_file():
    try:
        uploaded_file = request.files['file']
        if uploaded_file.filename != '':
            uploaded_file.save('tmp\\' + uploaded_file.filename)
        patoolib.extract_archive('tmp\\' + uploaded_file.filename,
                                 outdir=r'C:\Users\bik12\PycharmProjects\untitled10\fns')
        os.remove('tmp\\' + uploaded_file.filename)
        response = app.response_class(
            response='yes',
            status=200,
            mimetype='application/json'
        )
    except:
        response = app.response_class(
            response='no',
            status=400,
            mimetype='application/json'
        )
    return response


if __name__ == "__main__":
    app.run()
