import React, { useState, useEffect } from 'react';
import { API_URL } from '../../Api';

const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);

  const firmDataHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/allvendors`);
      const newFirmData = await response.json();
      setFirmData(newFirmData.vendors);
      console.log('Firm Data:', newFirmData.vendors);
    } catch (error) {
      alert('Firm data not fetched');
      console.error(error);
    }
  };

  useEffect(() => {
    firmDataHandler();
  }, []);

  return (
    <>
      <h3>Restaurants You Will Love</h3>
      <section className='restaurantGrid'>
        {firmData.map((vendor) => {
          return (
            <>
              {vendor.firm.map((item) => {
                return (
                 <div className='restaurantCard'>
                  <div className='restaurantMedia'>
                    <img src={`${API_URL}/Uploads/${item.image}`} alt={item.firmName} />
                    <div className='restaurantOffer'>
                        {item.offer}
                    </div>
                  </div>
                  <div className='restaurantInfo'>
                    <ul>
                    <strong>
                        <li className='restaurantName'>{item.firmName}</li>
                    </strong>
                     <li>{item.region}</li>
                     <li>{item.area}</li>
                    </ul>
                  </div>
                  </div>
                );
              })}
            </>
          );
        })}
      </section>
    </>
  );
};

export default FirmCollections;