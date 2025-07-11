from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import os
import json
import pandas as pd
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from utils.process_capture import capture_session
from utils.automation_detection import detect_automation
from utils.report_generator import generate_report

app = Flask(__name__)
CORS(app)
load_dotenv()

db_config = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME')
}

@app.route('/api/start_session', methods=['POST'])
def start_session():
    session_id = capture_session()
    return jsonify({'session_id': session_id})

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json.get('events', [])
    suggestions = detect_automation(data)
    return jsonify({'suggestions': suggestions})

@app.route('/api/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    file.save(os.path.join('static/uploads', file.filename))
    # Process file (e.g., parse .csv, .json, etc.)
    return jsonify({'status': 'File uploaded'})

@app.route('/api/export/<format>', methods=['POST'])
def export_report(format):
    suggestions = request.json.get('suggestions', [])
    if format == 'pdf':
        filename = 'report.pdf'
        c = canvas.Canvas(filename, pagesize=letter)
        c.drawString(100, 750, "SmartCapture Automation Report")
        for i, suggestion in enumerate(suggestions):
            c.drawString(100, 700 - i * 20, f"{suggestion['description']} (ROI: {suggestion['roi']}%)")
        c.save()
        return send_file(filename, as_attachment=True)
    elif format == 'csv':
        df = pd.DataFrame(suggestions)
        filename = 'report.csv'
        df.to_csv(filename, index=False)
        return send_file(filename, as_attachment=True)
    elif format == 'json':
        filename = 'report.json'
        with open(filename, 'w') as f:
            json.dump(suggestions, f)
        return send_file(filename, as_attachment=True)
    return jsonify({'error': 'Invalid format'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)))