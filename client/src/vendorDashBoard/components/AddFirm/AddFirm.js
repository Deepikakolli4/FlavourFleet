import React from 'react'
import './AddFirm.css'
const AddFirm = () => {
  return (
    <div className="firmSection">
          <h3>Add Firm</h3>
     <form>
          <input type='text' placeholder='Enter FirmName'/>
          <input type='text' placeholder='Enter Area'/>
          <input type='text' placeholder='Enter Region'/>
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