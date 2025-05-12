import React , {useState} from 'react'
import NavBar from '../components/NavBar/NavBar'
import SideBar from '../components/SideBar/SideBar'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import AddFirm from '../components/AddFirm/AddFirm'
import AddProduct from '../components/AddProduct/AddProduct'
const LandingPage = () => {
  const[showLogin,setShowLogin] = useState(false);
  const[showRegister,setShowRegister] = useState(false);
  const showLoginHandler = () => {
       setShowLogin(true);
       setShowRegister(false);
  }
  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
}
  return (
   <>
   <section className='landingSection'>
    <NavBar showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler}/>
    <div className='collection'>
    <SideBar/>
    {showLogin && <Login />}
    {showRegister && <Register />}
    {/* <Login /> */}
    {/* <Register /> */}
    {/* <AddFirm /> */}
    {/* <AddProduct /> */}
    </div>
   </section>
   </>
  )
}

export default LandingPage