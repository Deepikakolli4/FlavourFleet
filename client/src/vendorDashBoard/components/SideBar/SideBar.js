import React from 'react'
import './SideBars.css'
const SideBar = ({showFirmHandler,showProductHandler,showAllProductsHandler}) => {
  return (
   <div className='sideBarSection'>
       <ul>
        <li onClick={showFirmHandler}>Add Firm</li>
        <li onClick={showProductHandler}>Add Product</li>
        <li onClick={showAllProductsHandler}>All Products</li>
        <li>User Details</li>
       </ul>
   </div>
  )
}

export default SideBar