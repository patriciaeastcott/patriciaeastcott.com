import React, { useState, useEffect } from 'react';

function SmartCapture() {
  const [recording, setRecording] = useState(false);
  const [capturedData, setCapturedData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (recording) {
      // Simulate session recording using browser events
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
    // Call backend to start session
    await fetch('http://156.67.73.21:5000/api/start_session', { method: 'POST' });
  };

  const stopRecording = async () => {
    setRecording(false);
    // Analyze captured data
    const response = await fetch('http://156.67.73.21:5000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      body: formData,
    });
  };

  const exportReport = async (format) => {
    const response = await fetch(`http://156.67.73.21:5000/api/export/${format}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      <h1 className="text-3xl font-bold mb-4">SmartCapture Tool</h1>
      <button onClick={startRecording} disabled={recording} className="btn mr-2">Start Recording</button>
      <button onClick={stopRecording} disabled={!recording} className="btn mr-2">Stop Recording</button>
      <input type="file" onChange={handleFileUpload} className="mb-4" />
      <div>
        <h2 className="text-xl font-semibold">Automation Suggestions</h2>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion.description} (ROI: {suggestion.roi}%)</li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => exportReport('pdf')} className="btn mr-2">Export PDF</button>
        <button onClick={() => exportReport('csv')} className="btn mr-2">Export CSV</button>
        <button onClick={() => exportReport('json')} className="btn">Export JSON</button>
      </div>
    </div>
  );
}

export default SmartCapture;