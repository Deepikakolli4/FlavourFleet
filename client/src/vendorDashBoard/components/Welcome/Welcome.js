import React from 'react';
import waiterGif from './waiter.gif';
import './Welcome.css';

const Welcome = ({ showAllProductsHandler }) => {
  const firmName = localStorage.getItem('firmName') || 'Vendor';

  return (
    <div className="welcomeSection">
      <h2>Welcome, {firmName}!</h2>
      <div className="gifContainer">
        <img src={waiterGif} alt="Waiter animation" className="waiterGif" />
      </div>
      <p className="welcomeMessage">
        {firmName === 'Vendor'
          ? 'Thank you for joining our platform! Get started by adding your firm or exploring products.'
          : 'You’re all set to manage your firm’s products and services. Let’s get started!'}
      </p>
      <div className="action-btn-container">
        <button className="action-btn" onClick={showAllProductsHandler}>
          View Products
        </button>
      </div>
    </div>
  );
};

export default Welcome;