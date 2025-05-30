import React, { useState, useEffect } from 'react';
import { API_URL } from '../../Api';

const Chains = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [vendorData, setVendorData] = useState([]);

  const vendorFirmHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/allvendors`);
      const newData = await response.json();
      setVendorData(newData);
      console.log('this is API Data', newData);
    } catch (error) {
      alert('failed to fetch data of the vendors');
      console.log(error);
    }
  };

  useEffect(() => {
    vendorFirmHandler();
  }, []);

  const handleScroll = (direction) => {
    const gallery = document.getElementById('chainGallery');
    const scrollAmount = 500;
    if (direction === 'left') {
      gallery.scrollTo({
        left: gallery.scrollLeft - scrollAmount,
        behavior: 'smooth',
      });
    } else if (direction === 'right') {
      gallery.scrollTo({
        left: gallery.scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Check if carousel is at start or end to disable buttons
  const isAtStart = scrollPosition === 0;
  const isAtEnd = scrollPosition >= document.getElementById('chainGallery')?.scrollWidth - document.getElementById('chainGallery')?.clientWidth;

  return (
    <div className="chains-container">
      <h3>Our Top Restaurants</h3>
      <div className="carousel-wrapper">
        <div className="btnSection">
          <button 
            className="arrow-btn left-arrow" 
            aria-label="Scroll left" 
            onClick={() => handleScroll('left')} 
            disabled={isAtStart}
          ></button>
          <button 
            className="arrow-btn right-arrow" 
            aria-label="Scroll right" 
            onClick={() => handleScroll('right')} 
            disabled={isAtEnd}
          ></button>
        </div>
        <section className="scrollable-container" id="chainGallery" onScroll={(e) => setScrollPosition(e.target.scrollLeft)}>
          <div className="gallery-content">
            {vendorData.vendors &&
              vendorData.vendors.map((vendor, index) => (
                <div className="vendorBox" key={index}>
                  {vendor.firm.map((item, idx) => (
                    <div className="vendorCard">
                      <div className="firmName">{item.firmName}</div>
                      <div className="firmImage">
                        <img src={`${API_URL}/Uploads/${item.image}`} alt={item.firmName} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chains;