import React,{useState} from 'react'
import { itemData } from '../Pages/data'
const ItemsDisplay = () => {
    const [displayItem , setDisplayItem] = useState(itemData);
  return (
    <div className='itemSection'>
         <div className=''>
              <h4>Whats in your mind?</h4>
         </div>
       {displayItem.map((item)=>{
          return(
            <div className='itemsImage'>
                <img src={item.item_image} alt="images" />
            </div>
          )
       })}
    </div>
  )
}

export default ItemsDisplay