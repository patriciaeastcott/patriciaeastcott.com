# patriciaeastcott.comSkillStream Studio - SmartCapture

Overview
SmartCapture by SkillStream Studio is a browser-based automation tool designed to capture user workflows, detect automation opportunities, and provide implementation guidance. This repository contains the frontend, backend, and database setup for the patriciaeastcott.com website.
Setup Instructions

Clone the Repository
git clone <repository-url>
cd patriciaeastcott.com

Frontend Setup

Install dependencies: npm install
Build the frontend: npm run build
Deploy to Hostinger's public_html: cp -r build/\* /home/u400239072/public_html

Backend Setup

Navigate to backend: cd backend
Install dependencies: pip install -r requirements.txt
Set up environment variables in .env (update DB credentials if necessary)
Run the backend: python app.py

Database Setup

Connect to MySQL on srv1614.hstgr.io using Hostinger's remote access tool
Execute db_setup.sql to create the database and tables
Update .env with correct DB credentials

Deployment

Run deploy.sh to automate deployment
Access the site at https://patriciaeastcott.com or mediumpurple-spoonbill-235640.hostingersite.com

Beta Testing Instructions

Staging Environment

Create a staging site on Hostinger to avoid affecting the live site
Use a password-protected subdomain for beta testers

Recruit Beta Testers

Use social media or platforms like BetaTesting.com to recruit 10-20 testers
Define objectives: test SmartCapture's recording, suggestion accuracy, and report exports

Feedback Collection

Integrate Marker.io for bug reporting and feedback (embed script in index.html)
Set up a feedback form using Google Forms or SurveyCTO for structured input

Testing Process

Provide testers with access to the staging site
Ask testers to perform tasks using SmartCapture (e.g., record a workflow, upload a file, export a report)
Collect feedback on usability, bugs, and feature suggestions
Monitor backend logs for errors and analyze session data in MySQL

Iterate and Improve

Compile feedback using Marker.io and prioritize critical bugs
Update frontend and backend based on feedback
Release updates every 1-2 weeks during beta testing

API Integration

Base URL: http://156.67.73.21:5000/api
Endpoints:
POST /start_session: Start a new session
POST /analyze: Analyze captured events for automation suggestions
POST /upload: Upload files (.csv, .json, etc.)
POST /export/<format>: Export reports in PDF, CSV, or JSON

Authentication: Use JWT tokens (configure in Profile.js for user auth)

Notes

Ensure MySQL remote access is enabled via Hostinger's control panel
Use BrowserStack or LambdaTest for cross-browser testing
Monitor performance using New Relic during beta testing
SkillStream Studio - SmartCapture
Overview
SmartCapture by SkillStream Studio is a browser-based automation tool designed to capture user workflows, detect automation opportunities, and provide implementation guidance. This repository contains the frontend, backend, and database setup for the patriciaeastcott.com website.
Setup Instructions

Clone the Repository
git clone <repository-url>
cd patriciaeastcott.com

Frontend Setup

Install dependencies: npm install
Build the frontend: npm run build
Deploy to Hostinger: Use FileZilla or SCP to upload build/ to /home/u400239072/public_html

Backend Setup

Navigate to backend: cd backend
Install dependencies: pip install -r requirements.txt
Set up environment variables in .env
Run the backend: python app.py

Database Setup

Connect to MySQL on srv1614.hstgr.io using Hostinger's remote access tool
Execute db_setup.sql
Update .env with DB credentials

Deployment

Use deploy.ps1 for Windows or manual SCP/FTP
Access the site at https://patriciaeastcott.com

Beta Testing Instructions

Staging Environment

Create a password-protected subdomain (e.g., beta.patriciaeastcott.com)
Test SmartCapture, user registration, and report exports

Feedback Collection

Add Marker.io to index.html for bug reporting
Use Google Forms for structured feedback

Testing Process

Register, login, record workflows, and export reports
Monitor backend logs and MySQL data
