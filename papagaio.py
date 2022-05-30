import json
import flask, os
from flask import request, jsonify
from shakespeare import generate_name, generate_text, vocab
from unidecode import unidecode

MODE_NAME = 0
MODE_TEXT = 1
ERROR_INVALID_INPUT = 1

app = flask.Flask(__name__)

@app.route('/')
def index():
    return flask.render_template('index.html')

@app.route('/generate')
def generateName():
    args = request.args
    # Get the generation mode (text or name)
    mode = int(args.get('mode'))
    generation_func = None # Callback

    r_dict = {'error': 0, 'generated': '*ERROR*'}

    # Check if it's a valid generation mode
    if mode == MODE_NAME:
        generation_func = generate_name
    else:
        generation_func = generate_text

    input_text = unidecode(args.get('text').upper())
    input_vocab = set(input_text)
    
    if not input_vocab.issubset(vocab):
        r_dict['error'] = ERROR_INVALID_INPUT
    else:
        generated = ""
        while True:
            generated = generation_func(input_text)
            if generated != "":
                break

        r_dict['generated'] = generated[:-1]

    return jsonify(r_dict)
