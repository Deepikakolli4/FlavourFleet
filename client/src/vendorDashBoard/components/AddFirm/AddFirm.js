import React, { useState } from 'react';
import './AddFirm.css';
import { API_URL } from '../../utilities/ApiPath';
const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.error("User not Authenticated");
        return;
      }

      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      category.forEach((value) => {
        formData.append('category', value);
      });
      region.forEach((value) => {
        formData.append('region', value);
      });
      if (file) {
        formData.append('image', file);
      }

      // Send formData to an API 
      const response = await fetch(`${API_URL}/firm/addfirm`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to add firm');
      }
      console.log('Firm added successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="firmSection">
      <h3>Add Firm</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter FirmName"
          name="firmName"
          value={firmName}
          onChange={(e) => setFirmName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Area"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <div className="check-input">
          <label>Category</label>
          <div className="checkBoxContainer">
            <label>Veg</label>
            <input
              type="checkbox"
              checked={category.includes('veg')}
              onChange={handleCategoryChange}
              value="veg"
              required
            />

            <label>Non-Veg</label>
            <input
              type="checkbox"
              checked={category.includes('non-veg')}
              onChange={handleCategoryChange}
              value="non-veg"
            />
          </div>
        </div>

        <div className="check-input">
          <label>Region</label>
          <div className="checkBoxContainer">
            <label>South Indian</label>
            <input
              type="checkbox"
              value="south-indian"
              checked={region.includes('south-indian')}
              onChange={handleRegionChange}
              required
            />

            <label>North Indian</label>
            <input
              type="checkbox"
              checked={region.includes('north-indian')}
              onChange={handleRegionChange}
              value="north-indian"
            />

            <label>Chinese</label>
            <input
              type="checkbox"
              checked={region.includes('chinese')}
              onChange={handleRegionChange}
              value="chinese"
            />

            <label>Bakery</label>
            <input
              type="checkbox"
              checked={region.includes('bakery')}
              onChange={handleRegionChange}
              value="bakery"
            />

            <label>Traditional</label>
            <input
              type="checkbox"
              checked={region.includes('traditional')}
              onChange={handleRegionChange}
              value="traditional"
            />

            <label>Authentic</label>
            <input
              type="checkbox"
              checked={region.includes('authentic')}
              onChange={handleRegionChange}
              value="authentic"
            />

            <label>Juices</label>
            <input
              type="checkbox"
              checked={region.includes('juices')}
              onChange={handleRegionChange}
              value="juices"
            />

            <label>Thickshake</label>
            <input
              type="checkbox"
              checked={region.includes('thickshake')}
              onChange={handleRegionChange}
              value="thickshake"
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="Enter Offer"
          name="offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />

        <input
          type="file"
          placeholder="Enter Image"
          onChange={handleFileChange}
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

export default AddFirm;