import React, { useState, useRef } from "react";
import "./AddProduct.css";
import { API_URL } from "../../utilities/ApiPath";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState("No");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAddProduct = async (e) => {
  e.preventDefault();

  try {
    const loginToken = localStorage.getItem("loginToken");
    const firmId = localStorage.getItem("firmId");

    // console.log("Checkpoint 2: Retrieved tokens");
    // console.log("loginToken:", loginToken);
    // console.log("firmId:", firmId);

    if (!loginToken || !firmId) {
      alert("Authentication failed or Firm ID missing. Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("bestSeller", bestSeller === "Yes");
    category.forEach((value) => formData.append("category", value));
    formData.append("description", description);
    formData.append("image", file);

    // console.log("Checkpoint 3: FormData constructed");

    const apiEndpoint = `${API_URL}/product/addproduct/${firmId}`;
    // console.log("Checkpoint 4: API endpoint", apiEndpoint);

    const response = await fetch(apiEndpoint, {
      method: "POST",
      body: formData,
    });

    // console.log("Checkpoint 5: API response status", response.status);

    if (response.ok) {
      alert("Product added successfully");
     
      setProductName("");
      setPrice("");
      setCategory([]);
      setBestSeller("No");
      setDescription("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } else {
      const data = await response.json();
      // console.log("Checkpoint 7: Error response data", data);
      console.error("AddProduct failed:", data.message || "Unknown error");
      alert(data.message || "Failed to add product");
    }
  } catch (error) {
    console.error("catch block error", error.message);
    alert("Failed to add product");
  }
};


  return (
    <div className="firmSection">
      <h3>Add Product</h3>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Enter ProductName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checboxContainer">
              <label>Veg</label>
              <input
                type="checkbox"
                value="veg"
                checked={category.includes("veg")}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="checboxContainer">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                value="non-veg"
                checked={category.includes("non-veg")}
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
                checked={bestSeller === "Yes"}
                onChange={handleBestSellerChange}
              />
            </div>
            <div className="radioContainer">
              <label>No</label>
              <input
                type="radio"
                name="bestSeller"
                value="No"
                checked={bestSeller === "No"}
                onChange={handleBestSellerChange}
              />
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          placeholder="Enter Image"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
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
