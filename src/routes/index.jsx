// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Home from '../containers/Home';
import Menu from '../containers/Menu';
import SignInPhone from '../containers/SignInPhone';

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/laveinte" element={<Menu />} />
      <Route path="/laveinte/signin/phone" element={<SignInPhone />} />
    </Routes>
  );
}
export default Index;
