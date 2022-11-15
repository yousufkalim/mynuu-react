// Init
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Home Component
export default function Home() {
  const navigate = useNavigate();
  const params = useParams();
  console.log('params ', params);

  return (
    <div className="home">
      <button onClick={() => navigate(`/${params?.id}/menu`)} type="submit" className="home_start">
        Tap to start
      </button>
      <button
        onClick={() => navigate(`/${params?.id}/signin/phone`)}
        type="submit"
        className="home_start"
      >
        Get Started
      </button>
    </div>
  );
}
