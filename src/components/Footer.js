import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer py-6">
      <div className="container flex justify-between items-center">
        <div>
          <p>&copy; 2025 SkillStream Studio. All rights reserved.</p>
          <p>From Repairs to Results, Simplifying Tech A-Z!</p>
        </div>
        <div>
          <Link to="/help" className="mr-4">Help</Link>
          <Link to="/api-docs" className="mr-4">API Docs</Link>
          <a href="mailto:support@patriciaeastcott.com">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;