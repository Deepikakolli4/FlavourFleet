import React from 'react'
import { NavBar } from '../components/NavBar'
import ItemsDisplay from '../components/ItemsDisplay'
import Intro from '../components/Intro'
import Chains from '../components/Chains'
const LandingPage = () => {
  return (
    <div>
        <NavBar />
        <Intro />
        <div className='landingSection'>
        <ItemsDisplay />
        <Chains />
        </div>
    </div>
  )
}

export default LandingPage