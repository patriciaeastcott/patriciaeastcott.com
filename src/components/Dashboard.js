import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch('http://156.67.73.21:5000/api/sessions', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => setSessions(data.sessions || []))
      .catch((err) => console.error('Error fetching sessions:', err));
  }, []);

  return (
    <div className="container">
      <section className="section-bg py-12">
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
        <p className="text-lg mb-4">From Repairs to Results, Simplifying Tech A-Z!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <div key={session.id} className="p-4 border border-[#87CEEB] rounded">
                <h2 className="text-xl font-semibold">Session #{session.id}</h2>
                <p>Started: {new Date(session.start_time).toLocaleString()}</p>
                <p>Events: {session.data?.length || 0}</p>
              </div>
            ))
          ) : (
            <p>No sessions recorded yet. Start with <a href="/smartcapture" className="text-[#87CEEB] hover:underline">SmartCapture</a>.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;