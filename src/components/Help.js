import React from 'react';

function Help() {
  return (
    <div className="container">
      <section className="section-bg py-12">
        <h1 className="text-3xl font-bold mb-6">Help & FAQ</h1>
        <p className="text-lg mb-4">From Repairs to Results, Simplifying Tech A-Z!</p>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">How do I start recording a workflow?</h2>
            <p>Navigate to the SmartCapture page, click "Start Recording," and interact with your applications as usual. Stop recording to receive automation suggestions.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">What file formats are supported?</h2>
            <p>SmartCapture supports .csv, .json, .mht, .txt, .xml, and .zip files for import and analysis.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">How can I contact support?</h2>
            <p>Email us at support@patriciaeastcott.com or use the feedback form in the Profile section.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Help;