import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div>
      <section className="hero-gradient py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to SkillStream Studio</h1>
        <p className="text-lg mb-6">From Repairs to Results, Simplifying Tech A-Z!</p>
        <Link to="/smartcapture" className="btn-primary">Try SmartCapture Now</Link>
      </section>
      <section className="section-bg py-12">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6">About SmartCapture</h2>
          <p className="text-lg">
            SmartCapture is your intelligent automation tool, designed to observe, analyze, and optimize your workflows.
            With advanced process capture and tailored recommendations, we help you save time and boost efficiency.
          </p>
        </div>
      </section>
      <section className="section-alt-bg py-12">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Trustworthy</h3>
              <p>Our platform is built with security and reliability in mind, ensuring your data is safe.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Friendly</h3>
              <p>Our intuitive interface makes automation accessible to everyone, from beginners to experts.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Knowledgeable</h3>
              <p>Get expert recommendations tailored to your unique workflows.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Welcome;