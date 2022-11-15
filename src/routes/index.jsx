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
      <Route path="/:id/signin/phone" element={<SignInPhone />} />
      <Route path="/:id" element={<Home />} />
      <Route path="/:id/menu" element={<Menu />} />
    </Routes>
  );
}
export default Index;
