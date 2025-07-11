import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Header({ user, setUser }) {
  const history = useHistory();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <header className="bg-[#2C3E50] text-white p-4">
      <nav className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">SkillStream Studio</Link>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/smartcapture" className="mr-4">SmartCapture</Link>
          <Link to="/dashboard" className="mr-4">Dashboard</Link>
          <Link to="/api-docs" className="mr-4">API Docs</Link>
          <Link to="/help" className="mr-4">Help</Link>
          {user ? (
            <>
              <Link to="/profile" className="mr-4">Profile</Link>
              <button onClick={handleLogout} className="btn-primary">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn-primary">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;