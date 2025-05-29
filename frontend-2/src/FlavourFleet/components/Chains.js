import React, { useState, useEffect } from "react";
import { API_URL } from "../../Api";
const Chains = () => {
  const [vendorData, setVendorData] = useState([]);
  const vendorFirmHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/allvendors`);
      const newData = await response.json();
      setVendorData(newData);
      console.log("this is API Data", newData);
    } catch (error) {
      alert("failed to fetch data of the vendors");
      console.log(error);
    }
  };
  useEffect(() => {
    vendorFirmHandler();
  }, []);
  return (
   <>
    <h3>Our Top Restuarants</h3>
    <section className="chainSection">
      {vendorData.vendors &&
        vendorData.vendors.map((vendor) => {
          return (
            <>
              <div className="vendorBox">
                {vendor.firm.map((item) => {
                  return (
                  <>
                  <div>
                    {item.firmName}
                  </div>
                  <div className="firmImage">
                   <img src={`${API_URL}/uploads/${item.image}`} alt="Firm Images"/>
                  </div>
                  </>
                  )
                })}
              </div>
            </>
          );
        })}
    </section>
   </>
  );
};

export default Chains;
