import React from 'react'
import './NavBar.css'
const NavBar = ({showLoginHandler , showRegisterHandler}) => {
  return (
    <div className='navSection'>
        <div className='company'>
         Vendor Dashboard
        </div>
        <div className='userAuth'>
          <span onClick={showLoginHandler}>Login </span>
          <span>/</span>
          <span onClick={showRegisterHandler}>Register</span>
          <span onClick={showRegisterHandler}>LogOut</span>
        </div>
    </div>
  )
}

export default NavBar