import React from 'react';

export const NavBar = React.memo(() => {
  return (
    <nav className='navBarSection'>
      <div className='name'>
        <h2>FlavourFleet</h2>
      </div>
      <div className='searchBar'>
        <input
          type="text"
          placeholder='search your favourite food'
        />
      </div>
      <div className='user'>
        Login / Signup
      </div>
    </nav>
  );
});