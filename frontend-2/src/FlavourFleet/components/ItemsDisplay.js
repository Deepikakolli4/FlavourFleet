import React, { useState } from 'react';
import { itemData } from '../Pages/data';

const ItemsDisplay = () => {
  const [displayItem, setDisplayItem] = useState(itemData);

  return (
    <div>
      <div className='title'>
        <h4>What's in your mind?</h4>
      </div>

      <div className='itemsContainer'>
        {displayItem.map((item) => (
          <div className='itemsImage' key={item.id}>
            <img src={item.item_image} alt="images" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsDisplay;
