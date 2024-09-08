import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// Compnents
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';

function App() {
  return (
      <Router>
      <Navigation />
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        <Footer />
      </Router>
  );
}

export default App;
