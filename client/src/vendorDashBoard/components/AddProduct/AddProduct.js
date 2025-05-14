import React, { useState } from 'react';
import './AddProduct.css';
const AddProduct = () => {
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState('No');

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSellerChange = (event) => {
    setBestSeller(event.target.value);
  };

  return (
    <div className="firmSection">
      <h3>Add Product</h3>
      <form>
        <input type="text" placeholder="Enter ProductName" />
        <input type="text" placeholder="Enter Price" />
        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checboxContainer">
              <label>Veg</label>
              <input
                type="checkbox"
                value="veg"
                checked={category.includes('veg')}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="checboxContainer">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                value="non-veg"
                checked={category.includes('non-veg')}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>
        <div className="checkInp">
          <label>Best Seller</label>
          <div className="inputsContainer">
            <div className="radioContainer">
              <label>Yes</label>
              <input
                type="radio"
                name="bestSeller"
                value="Yes"
                checked={bestSeller === 'Yes'}
                onChange={handleBestSellerChange}
              />
            </div>
            <div className="radioContainer">
              <label>No</label>
              <input
                type="radio"
                name="bestSeller"
                value="No"
                checked={bestSeller === 'No'}
                onChange={handleBestSellerChange}
              />
            </div>
          </div>
        </div>
        <input type="text" placeholder="Enter Description" />
        <input type="file" placeholder="Enter Image" />
        <div className="submit-btn-container">
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;