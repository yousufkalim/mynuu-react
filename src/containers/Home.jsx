// Init
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Home Component
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <button
        onClick={() => navigate('/laveinte')}
        type="submit"
        to="/laveinte/menu"
        className="home_start"
      >
        Tap to start
      </button>
      <button
        onClick={() => navigate('/laveinte/signin/phone')}
        type="submit"
        to="/laveinte/menu"
        className="home_start"
      >
        Get Started
      </button>
    </div>
  );
}
