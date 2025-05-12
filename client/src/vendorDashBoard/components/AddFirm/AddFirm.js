import React from 'react'
import './AddFirm.css'
const AddFirm = () => {
  return (
    <div className="firmSection">
          <h3>Add Firm</h3>
     <form>
          <input type='text' placeholder='Enter FirmName'/>
          <input type='text' placeholder='Enter Area'/>
          <div className='check-input'>
            <label>Region</label>
            <div className='checkBoxContainer'>
              <label>SouthIndian</label>
              <input type="checkbox" value="SouthIndian" required/>
              <label>NorthIndian</label>
              <input type="checkbox" value="NorthIndian"/>
              <label>Chinese</label>
              <input type="checkbox" value="Chinese"/>
              <label>Bakery</label>
              <input type="checkbox" value="Bakery"/>
            </div>
          </div>
          <div className='check-input'>
            <label>Category</label>
            <div className='checkBoxContainer'>
              <label>Veg</label>
              <input type="checkbox" value="Veg" required/>
              <label>Non-Veg</label>
              <input type="checkbox" value="Non-Veg"/>
            </div>
          </div>
          <input type='text' placeholder='Enter Offer'/>
          <input type='file' placeholder='Enter Image'/>
      </form>
     <div className='submit-btn'>
      Submit
      </div>
    </div>
  )
}

export default AddFirm