import os
from flask import Flask, request, jsonify
from flask_cors import CORS  # NEW
import prediction
import json
from assets.dataset.words import words, classes

# Correct way to build model path
base_path = os.path.dirname(__file__)
model_path = os.path.join(base_path, "Model", "model.pth")

# Load data
data = json.load(open(os.path.join(base_path, 'assets', 'dataset', 'chatbot_data.json')))

# Model parameters
input_size = len(words)
hidden_size = 8
output_size = len(classes)

# Load model
model = prediction.load_model(model_path, input_size, hidden_size, output_size)

app = Flask(__name__)
CORS(app)  # <-- Allow frontend requests

@app.route('/')
def home():
    return "Backend is running successfully!"   # Just a test message for root route

@app.route('/predict', methods=['POST'])  # <-- MATCH frontend fetch URL
def predict():
    data_json = request.get_json()  # <-- Read JSON input
    message = data_json.get('message')
    
    if not message:
        return jsonify({'response': "No message received."})

    bot_response = prediction.generate_response(message, model, words, classes, data)
    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)
