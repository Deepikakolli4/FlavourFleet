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
  const[showFirm,setShowFirm] = useState(false);
  const[showProduct,setShowProduct] = useState(false);
  const showLoginHandler = () => {
       setShowLogin(true);
       setShowRegister(false);
       setShowFirm(false);
       setShowProduct(false);
  }
  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
  }
  const showFirmHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(true);
    setShowProduct(false);
  }
  const showProductHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(true);
  }
  return (
   <>
   <section className='landingSection'>
    <NavBar showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler}/>
    <div className='collection'>
    <SideBar showFirmHandler = {showFirmHandler} showProductHandler = {showProductHandler}/>
    {showLogin && <Login />}
    {showRegister && <Register />}
    {showFirm && <AddFirm/>}
    {showProduct && <AddProduct />}
    </div>
   </section>
   </>
  )
}

export default LandingPage