import React from 'react'
import registerGif from './register.gif';
import './Register.css'
const Register = () => {
   return (
      <div className='registerSection'>
      <h3>Vendor Register <img src= {registerGif} alt='Login animation' className='registerGif' /></h3>
      <form>
          <input type='text' placeholder='Enter Username'/>
          <input type='text' placeholder='Enter Email'/>
          <input type='password' placeholder='Enter Password'/>
      </form>
      <div className='submit-btn'>
       Register
      </div>
      </div>
    )
}

export default Register