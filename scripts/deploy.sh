#!/bin/bash
# Deploy frontend
cd /path/to/patriciaeastcott.com
npm install
npm run build
cp -r build/* /home/u400239072/public_html

# Deploy backend
cd /path/to/patriciaeastcott.com/backend
pip install -r requirements.txt
nohup python app.py &