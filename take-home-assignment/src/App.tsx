import React from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './routes/router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
