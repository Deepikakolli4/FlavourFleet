import React, { useState } from 'react';
import { itemData } from '../Pages/data';

const ItemsDisplay = () => {
  const [displayItem, setDisplayItem] = useState(itemData);

  const handleScroll = (direction) => {
    const gallery = document.getElementById('itemsGallery');
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

  return (
    <div className="items-container">
      <div className="title">
        <h4>What's in your mind?</h4>
      </div>
      <div className="carousel-wrapper">
        <div className="btnSection">
          <button className="arrow-btn left-arrow" aria-label="Scroll left" onClick={() => handleScroll('left')}></button>
          <button className="arrow-btn right-arrow" aria-label="Scroll right" onClick={() => handleScroll('right')}></button>
        </div>
        <section className="scrollable-container" id="itemsGallery">
          <div className="gallery-content">
            {displayItem.map((item) => (
              <div className="itemsImage" key={item.id}>
                <img src={item.item_image} alt={item.item_name || 'item'} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemsDisplay;