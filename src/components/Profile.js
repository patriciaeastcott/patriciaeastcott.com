import React, { useState, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState({ username: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://156.67.73.21:5000/api/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => setError('Error fetching profile'));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://156.67.73.21:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!data.success) {
        setError(data.error || 'Update failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <section className="section-bg py-12">
        <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full p-2 border border-[#87CEEB] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-2 border border-[#87CEEB] rounded"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button onClick={handleUpdate} className="btn-primary">Update Profile</button>
        </div>
      </section>
    </div>
  );
}

export default Profile;