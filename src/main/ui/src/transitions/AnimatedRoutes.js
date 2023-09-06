import Home from '../pages/Home';
import Generate from '../pages/Generate';
import DMView from '../pages/DMView';
import PlayerView from '../pages/PlayerView';
import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
    const location = useLocation();
    return (
     <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path = "/" element={<Home />} />
            <Route path = "/Generate" element={<Generate />} />
            <Route path = "/DMView" element={<DMView />} />
            <Route path = "/PlayerView" element={<PlayerView />} />
        </Routes>
      </AnimatePresence>
    );
}

export default AnimatedRoutes
