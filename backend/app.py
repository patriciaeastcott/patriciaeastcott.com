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
import jwt
import bcrypt
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)
load_dotenv()

db_config = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME')
}

def verify_token(token):
    try:
        return jwt.decode(token, os.getenv('JWT_SECRET'), algorithms=['HS256'])
    except:
        return None

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        token = jwt.encode({'user_id': user['id'], 'exp': datetime.utcnow() + timedelta(hours=24)}, os.getenv('JWT_SECRET'))
        return jsonify({'token': token})
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (username, password, email) VALUES (%s, %s, %s)", (username, hashed_password, email))
        conn.commit()
        return jsonify({'success': True})
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 400
    finally:
        cursor.close()
        conn.close()

@app.route('/api/profile', methods=['GET', 'PUT'])
def profile():
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    user_data = verify_token(token)
    if not user_data:
        return jsonify({'error': 'Invalid token'}), 401
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    if request.method == 'GET':
        cursor.execute("SELECT username, email FROM users WHERE id = %s", (user_data['user_id'],))
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        return jsonify(user)
    else:
        data = request.json
        cursor.execute("UPDATE users SET username = %s, email = %s WHERE id = %s", (data['username'], data['email'], user_data['user_id']))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'success': True})

@app.route('/api/sessions', methods=['GET'])
def get_sessions():
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    user_data = verify_token(token)
    if not user_data:
        return jsonify({'error': 'Invalid token'}), 401
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, start_time, data FROM sessions WHERE user_id = %s", (user_data['user_id'],))
    sessions = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify({'sessions': sessions})

@app.route('/api/start_session', methods=['POST'])
def start_session():
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    user_data = verify_token(token)
    if not user_data:
        return jsonify({'error': 'Invalid token'}), 401
    session_id = capture_session()
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO sessions (user_id, start_time, data) VALUES (%s, %s, %s)", (user_data['user_id'], datetime.utcnow(), json.dumps([])))
    conn.commit()
    cursor.close()
    conn.close()
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