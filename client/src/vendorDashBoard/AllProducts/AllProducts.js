import React, {useState,useEffect} from 'react'
import { API_URL } from '../utilities/ApiPath';


//useEffect helps to make the frontend in coord with the backend api if backend api 
//gets more load it updates frontend in such a way that it account the changes
const AllProducts = () => {
  const [products,setProducts] = useState([]);
  const productsHandler = async()=>{
    const firmId = localStorage.getId('firmId');
    try{
        const response = await fetch(`${API_URL}/product/getProductbyfirm/${firmId}`);
        const productData = await response.json();
        setProducts(productData);
    }catch(error){

    }
  }
  useEffect(()=>{
    productsHandler();
  },[])//empty dependency it implement the changes in the doc once
  //
  return (
    <div>AllProducts</div>
  )
}

export default AllProducts