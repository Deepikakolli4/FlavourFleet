import React, { useState, useRef } from "react";
import "./AddFirm.css";
import { API_URL } from "../../utilities/ApiPath";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        alert("Please log in to add a firm.");
        // Optionally redirect to login page
        // window.location.href = '/login';
        return;
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      category.forEach((value) => {
        formData.append("category", value);
      });
      region.forEach((value) => {
        formData.append("region", value);
      });
      if (file) {
        formData.append("image", file);
      }

      const response = await fetch(`${API_URL}/firm/addfirm`, {
        method: "POST",
        headers: {
          token: `${loginToken}`,
        },
        body: formData,
      });

      // Handle HTTP-level errors
      if (!response.ok) {
        if (response.status === 401) {
          alert("Unauthorized: Please log in again.");
          throw new Error("Unauthorized: Invalid or expired token");
        }

        const errorData = await response.json().catch(() => ({}));

        // Check custom error message from backend
        if (errorData.message === "vendor can have only one firm") {
          alert("Firm exists!! Only one firm can be added.");
          setFirmName("");
          setArea("");
          setCategory([]);
          setRegion([]);
          setOffer("");
          setFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = null;
          }
        }

        throw new Error(
          errorData.message || `Failed to add firm: ${response.statusText}`
        );
      }

      // If response is OK, proceed
      const data = await response.json();
      alert("Firm added successfully!");
      console.log("Firm added successfully");
      console.log(data);
      const firmId = data.firmId;
      localStorage.setItem("firmId", firmId);

      // Reset form
      setFirmName("");
      setArea("");
      setCategory([]);
      setRegion([]);
      setOffer("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error: ${error.message}`);
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
              checked={category.includes("veg")}
              onChange={handleCategoryChange}
              value="veg"
            />

            <label>Non-Veg</label>
            <input
              type="checkbox"
              checked={category.includes("non-veg")}
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
              checked={region.includes("south-indian")}
              onChange={handleRegionChange}
            />

            <label>North Indian</label>
            <input
              type="checkbox"
              checked={region.includes("north-indian")}
              onChange={handleRegionChange}
              value="north-indian"
            />

            <label>Chinese</label>
            <input
              type="checkbox"
              checked={region.includes("chinese")}
              onChange={handleRegionChange}
              value="chinese"
            />

            <label>Bakery</label>
            <input
              type="checkbox"
              checked={region.includes("bakery")}
              onChange={handleRegionChange}
              value="bakery"
            />

            <label>Traditional</label>
            <input
              type="checkbox"
              checked={region.includes("traditional")}
              onChange={handleRegionChange}
              value="traditional"
            />

            <label>Authentic</label>
            <input
              type="checkbox"
              checked={region.includes("authentic")}
              onChange={handleRegionChange}
              value="authentic"
            />

            <label>Juices</label>
            <input
              type="checkbox"
              checked={region.includes("juices")}
              onChange={handleRegionChange}
              value="juices"
            />

            <label>Thickshake</label>
            <input
              type="checkbox"
              checked={region.includes("Thickshake")}
              onChange={handleRegionChange}
              value="Thickshake"
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

export default AddFirm;
