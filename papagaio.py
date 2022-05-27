import json
import flask, os
from flask import request, jsonify
from shakespeare import generate_name, generate_text

app = flask.Flask(__name__)

@app.route('/')
def index():
    return flask.render_template('index.html')

@app.route('/generate')
def generateName():
    args = request.args
    # Get the generation mode (text or name)
    mode = args.get('mode')
    generation_func = None # Callback

    if mode == 'name':
        generation_func = generate_name
    elif mode == 'text':
        generation_func = generate_text
    else:
        return jsonify({'generated': 'fodase'}) # placeholder


    raw_input = args.get('name')

    if not raw_input.isalpha() or not raw_input.isascii():
        return jsonify({'generated': 'Por favor não use números ou letra estranha'})

    generated = ""
    while True:
        generated = generation_func(f'{raw_input.upper()}')
        if generated != "":
            break


    return jsonify({'generated': generated[:-1]})
