import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import SideBar from '../components/SideBar/SideBar'
import Login from '../components/Login/Login'
const LandingPage = () => {
  return (
   <>
   <section className='landingSection'>
    <NavBar/>
    <div className='collection'>
    <SideBar/>
    <Login />
    </div>
   </section>
   </>
  )
}

export default LandingPage