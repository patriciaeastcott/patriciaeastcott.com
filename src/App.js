import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import SmartCapture from './components/SmartCapture';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import APIDocs from './components/APIDocs';
import Help from './components/Help';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header user={user} setUser={setUser} />
        <main className="flex-grow">
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/smartcapture" component={SmartCapture} />
            <Route path="/login" render={(props) => <Login {...props} setUser={setUser} />} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/api-docs" component={APIDocs} />
            <Route path="/help" component={Help} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;