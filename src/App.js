import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './Router/Routing';
import './App.css';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="main">
        <Navbar />
        <Routing />
      </div>
    </Router>
  );
};

export default App;
