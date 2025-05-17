import React from 'react'
import './NavBar.css'
const NavBar = ({showLoginHandler , showRegisterHandler,showLogOut, showLogOutHandler }) => {
  return (
    <div className='navSection'>
        <div className='company'>
         Vendor Dashboard
        </div>
        <div className='userAuth'>
          {!showLogOut ? 
          <>
          <span onClick={showLoginHandler}>Login </span>
          <span>/</span>
          <span onClick={showRegisterHandler}>Register</span>
          </>
          :
          <span onClick={ showLogOutHandler }>LogOut</span>
         }
        </div>
    </div>
  )
}

export default NavBar