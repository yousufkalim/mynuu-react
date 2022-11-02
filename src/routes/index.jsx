// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Home from '../containers/Home';
import Menu from '../containers/Menu';

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/laveinte" element={<Menu />} />
    </Routes>
  );
}
export default Index;
