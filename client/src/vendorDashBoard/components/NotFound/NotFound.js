import React from 'react';
import { Link } from 'react-router-dom';
import gif from './giphy.gif';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="errorSection">
      <h1>404</h1>
      <div className="gifContainer">
        <img src={gif} alt="pagenotfound" />
      </div>
      <Link to="/">
        <p>Go Back</p>
      </Link>
    </div>
  );
};

export default NotFound;
