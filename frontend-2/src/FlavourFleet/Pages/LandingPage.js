import React from 'react'
import { NavBar } from '../components/NavBar'
import ItemsDisplay from '../components/ItemsDisplay'
import Intro from '../components/Intro'
const LandingPage = () => {
  return (
    <div>
        <NavBar />
        <Intro />
        <div className='landingSection'>
        <ItemsDisplay />
        </div>
    </div>
  )
}

export default LandingPage