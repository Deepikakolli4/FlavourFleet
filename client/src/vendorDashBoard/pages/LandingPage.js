import React , {useState,useEffect} from 'react'
import NavBar from '../components/NavBar/NavBar'
import SideBar from '../components/SideBar/SideBar'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import AddFirm from '../components/AddFirm/AddFirm'
import AddProduct from '../components/AddProduct/AddProduct'
import Welcome from '../components/Welcome/Welcome'
import AllProducts from '../components/AllProducts/AllProducts'
const LandingPage = () => {
  const[showLogin,setShowLogin] = useState(false);
  const[showRegister,setShowRegister] = useState(false);
  const[showFirm,setShowFirm] = useState(false);
  const[showProduct,setShowProduct] = useState(false);
  const[showWelcome,setshowWelcome] = useState(false);
  const[showAllProducts,setShowAllProducts] = useState(false);
  const[showLogOut,setShowLogOut] = useState(false);
  const[showFirmTitle,setShowFirmTitle] = useState(true);
   useEffect(()=>{
        const loginToken = localStorage.getItem('loginToken');
        if(loginToken){
          setShowLogOut(true);
          setshowWelcome(true);
        }
    },[])

  useEffect(()=>{
     const firmName = localStorage.getItem('firmName');
     if(firmName){
      setShowFirmTitle(false);
     }
  },[])
  const showLoginHandler = () => {
       setShowLogin(true);
       setShowRegister(false);
       setShowFirm(false);
       setShowProduct(false);
       setshowWelcome(false);
       setShowAllProducts(false);
  }
  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setshowWelcome(false);
    setShowAllProducts(false);
  }
  const showFirmHandler = () => {
    if(showLogOut){
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(true);
    setShowProduct(false);
    setshowWelcome(false);
    setShowAllProducts(false);
    }else{
      alert("please login to continue");
      setShowLogin(true);
    }
  }
  const showProductHandler = () => {
    if(showLogOut){
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(true);
    setshowWelcome(false);
    setShowAllProducts(false);
    }else{
      alert("please login to continue");
      setShowLogin(true);
    }
  }
  const showWelcomeHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setshowWelcome(true);
    setShowAllProducts(false);
  }
   const showAllProductsHandler = () => {
    if(showLogOut){
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setshowWelcome(false);
    setShowAllProducts(true);
    }else{
      alert("please login to continue");
      setShowLogin(true);
    }
  }
  const showLogOutHandler = () => {
  // confirm("Are you sure to logout?")
  localStorage.removeItem('loginToken');
  localStorage.removeItem('firmId');
  localStorage.removeItem('firmName');
  setshowWelcome(false);
  setShowLogOut(false);
  setShowFirmTitle(true);
  setShowAllProducts(false);
  setShowLogin(false);
};
  return (
   <>
   <section className='landingSection'>
    <NavBar 
    showLoginHandler = {showLoginHandler} 
    showRegisterHandler = {showRegisterHandler}
    showLogOut = {showLogOut}
    showLogOutHandler = { showLogOutHandler }
    />
    <div className='collection'>
    <SideBar 
    showFirmHandler = {showFirmHandler} 
    showProductHandler = {showProductHandler}
    showAllProductsHandler = {showAllProductsHandler}
    showFirmTitle = {showFirmTitle}
    />
    {showLogin && <Login showWelcomeHandler={showWelcomeHandler}/>}
    {showRegister && <Register  showLoginHandler = {showLoginHandler}/>}
    {showFirm && showLogOut &&<AddFirm/>}
    {showProduct && showLogOut &&<AddProduct />}
    {showWelcome && <Welcome showAllProductsHandler = {showAllProductsHandler}/> }
    {showAllProducts && showLogOut && <AllProducts />}
    </div>
   </section>
   </>
  )
}

export default LandingPage