import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimatedRoutes from './transitions/AnimatedRoutes';

function App() {
  return (
    <Router>
      <AnimatedRoutes/>
    </Router>
  );
}

export default App;
