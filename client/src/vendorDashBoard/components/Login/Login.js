import React from 'react'
import './Login.css'
import loginGif from './login.gif';
const Login = () => {
  return (
    <div className='loginSection'>
    <h3>Vendor Login <img src= {loginGif} alt='Login animation' className='loginGif' /></h3>
    <form>
        <input type='text' placeholder='Enter Email'/>
        <input type='password' placeholder='Enter Password'/>
    </form>
    <div className='submit-btn'>
     Login
    </div>
    </div>
  )
}

export default Login