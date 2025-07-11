import React, { useState, useEffect } from 'react';

function SmartCapture() {
  const [recording, setRecording] = useState(false);
  const [capturedData, setCapturedData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (recording) {
      const handleEvent = (e) => {
        setCapturedData((prev) => [...prev, { type: e.type, target: e.target.id, timestamp: Date.now() }]);
      };
      window.addEventListener('click', handleEvent);
      window.addEventListener('keypress', handleEvent);
      return () => {
        window.removeEventListener('click', handleEvent);
        window.removeEventListener('keypress', handleEvent);
      };
    }
  }, [recording]);

  const startRecording = async () => {
    setRecording(true);
    await fetch('http://156.67.73.21:5000/api/start_session', {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  };

  const stopRecording = async () => {
    setRecording(false);
    const response = await fetch('http://156.67.73.21:5000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ events: capturedData }),
    });
    const data = await response.json();
    setSuggestions(data.suggestions);
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    const formData = new FormData();
    formData.append('file', uploadedFile);
    await fetch('http://156.67.73.21:5000/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: formData,
    });
  };

  const exportReport = async (format) => {
    const response = await fetch(`http://156.67.73.21:5000/api/export/${format}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ suggestions }),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report.${format}`;
    a.click();
  };

  return (
    <div className="container">
      <section className="section-bg py-12">
        <h1 className="text-3xl font-bold mb-4">SmartCapture Tool</h1>
        <p className="text-lg mb-4">From Repairs to Results, Simplifying Tech A-Z!</p>
        <button onClick={startRecording} disabled={recording} className="btn-primary mr-2">Start Recording</button>
        <button onClick={stopRecording} disabled={!recording} className="btn-primary mr-2">Stop Recording</button>
        <input type="file" onChange={handleFileUpload} className="mb-4" accept=".csv,.json,.mht,.txt,.xml,.zip" />
        <div>
          <h2 className="text-xl font-semibold">Automation Suggestions</h2>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion.description} (ROI: {suggestion.roi}%)</li>
            ))}
          </ul>
        </div>
        <div>
          <button onClick={() => exportReport('pdf')} className="btn-primary mr-2">Export PDF</button>
          <button onClick={() => exportReport('csv')} className="btn-primary mr-2">Export CSV</button>
          <button onClick={() => exportReport('json')} className="btn-primary">Export JSON</button>
        </div>
      </section>
    </div>
  );
}

export default SmartCapture;