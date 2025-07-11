import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://156.67.73.21:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setUser({ username });
        history.push('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <section className="section-bg py-12">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-[#87CEEB] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-[#87CEEB] rounded"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button onClick={handleLogin} className="btn-primary">Login</button>
        </div>
      </section>
    </div>
  );
}

export default Login;