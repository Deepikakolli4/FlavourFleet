import React from 'react'
import './NavBar.css'
const NavBar = () => {
  return (
    <div className='navSection'>
        <div className='company'>
         Vendor Dashboard
        </div>
        <div className='userAuth'>
          <span>Login </span>
          <span>/</span>
          <span>Register</span>
        </div>
    </div>
  )
}

export default NavBar