import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import SideBar from '../components/SideBar/SideBar'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
const LandingPage = () => {
  return (
   <>
   <section className='landingSection'>
    <NavBar/>
    <div className='collection'>
    <SideBar/>
    {/* <Login /> */}
    <Register />
    </div>
   </section>
   </>
  )
}

export default LandingPage