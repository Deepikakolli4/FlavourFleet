import React from 'react'

const AddProduct = () => {
    return (
        <div className="firmSection">
              <h3>Add Product</h3>
         <form>
              <input type='text' placeholder='Enter ProductName'/>
              <input type='text' placeholder='Enter Price'/>
              <input type='text' placeholder='Enter Category'/>
              <input type='text' placeholder='Enter BestSeller'/>
              <input type='text' placeholder='Enter Description'/>
              <input type='file' placeholder='Enter Image'/>
              <div className="submit-btn-container">
              <button className="submit-btn" type="submit">
               Submit
               </button>
               </div>
        </form>
        </div>
      )
}

export default AddProduct