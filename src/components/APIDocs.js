import React from 'react';

function APIDocs() {
  return (
    <div className="container">
      <section className="section-bg py-12">
        <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
        <p className="text-lg mb-4">From Repairs to Results, Simplifying Tech A-Z!</p>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">POST /api/start_session</h2>
            <p>Starts a new session for workflow recording.</p>
            <p><strong>Headers:</strong> Authorization: Bearer &lt;token&gt;</p>
            <p><strong>Response:</strong> { "session_id": &lt;id&gt; }</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">POST /api/analyze</h2>
            <p>Analyzes captured events for automation suggestions.</p>
            <p><strong>Body:</strong> { "events": [] }</p>
            <p><strong>Response:</strong> { "suggestions": [] }</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">POST /api/upload</h2>
            <p>Uploads files for processing (.csv, .json, etc.).</p>
            <p><strong>Body:</strong> multipart/form-data</p>
            <p><strong>Response:</strong> { "status": "File uploaded" }</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">POST /api/export/&lt;format&gt;</h2>
            <p>Exports reports in PDF, CSV, or JSON format.</p>
            <p><strong>Body:</strong> { "suggestions": [] }</p>
            <p><strong>Response:</strong> File download</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default APIDocs;