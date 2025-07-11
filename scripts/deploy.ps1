# Deploy frontend
Set-Location -Path "C:\Users\trish\patriciaeastcott.com\patriciaeastcott.com"
npm install
npm run build

# Use WinSCP for file transfer
& "C:\Program Files (x86)\WinSCP\WinSCP.com" /script=deploy-script.txt

# Deploy backend (run on Hostinger via SSH manually)