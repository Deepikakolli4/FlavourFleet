import React, { useState, useEffect } from 'react';
import { API_URL } from '../utilities/ApiPath';
import './AllProducts.css'; // Import the new CSS file

//useEffect helps to make the frontend in coord with the backend api if backend api 
//gets more load it updates frontend in such a way that it account the changes
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const productsHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_URL}/product/getProductbyfirm/${firmId}`);
      const productData = await response.json();
      setProducts(productData.products || productData);
    } catch (error) {
      console.error("failed to fetch products:", error);
      alert("failed to fetch products");
    }
  };

  useEffect(() => {
    productsHandler();
    console.log('this is useeffect');
  }, []); //can be empty dependency or any thing we want to pass 
  //[]->empty dependency it implement the changes in the doc once
  //we fetch the data only if there are any changes in the data at the backend

  const deleteProductById = async(productId)=>{
    try{
        const response = await fetch(`${API_URL}/product/${productId}`,
            {
                method : 'DELETE',
            })
        if(response.ok){
            confirm('Are you sure to delete?');
            setProducts(products.filter(product => product._id !== productId));
            alert("product is deleted successfully!");
        }    

    }catch(error){
     console.error("Failed to delete");
     alert("Failed to delete");
    }
  }

  return (
    <div className="productsSection">
      <h3>Products List</h3>
      {products.length === 0 ? (
        <p className="no-products">No Products added</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>
                  {item.image ? (
                    <img
                      src={`${API_URL}/Uploads/${item.image}`}
                      alt={item.productName}
                      className="product-image"
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>
                  <button className="delete-btn" onClick={()=>deleteProductById(item._id)}>
                    Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;