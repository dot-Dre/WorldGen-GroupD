import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Generate from './pages/Generate';
import DMView from './pages/DMView';
import PlayerView from './pages/PlayerView';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/Generate" element={<Generate />} />
        <Route path = "/DMView" element={<DMView />} />
        <Route path = "/PlayerView" element={<PlayerView />} />
      </Routes>
    </Router>
  );
}

export default App;
