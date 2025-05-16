import React, { useState, useEffect } from 'react';
import { API_URL } from '../utilities/ApiPath';
import './AllProducts.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const productsHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    if (!firmId) {
      setError('No firm ID found. Please add a firm first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/product/getProductbyfirm/${firmId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      const productData = await response.json();
      // console.log('API response:', productData);
      const productsArray = Array.isArray(productData.products)
        ? productData.products
        : Array.isArray(productData)
        ? productData
        : [];
      setProducts(productsArray);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('Failed to fetch products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    productsHandler();
    console.log('useEffect triggered');
  }, []);

  const deleteProductById = async (productId) => {
    if (!productId || !/^[0-9a-fA-F]{24}$/.test(productId)) {
      console.error('Invalid productId:', productId);
      alert('Cannot delete: Invalid product ID');
      return;
    }

    const url = `${API_URL}/product/${productId}`;
    console.log('DELETE request to:', url);
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
        alert('Product deleted successfully!');
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Deletion failed: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert(`Failed to delete product: ${error.message}`);
    } finally {
      setShowConfirmModal(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProductById(productToDelete);
    }
  };

  return (
    <div className="productsSection">
      <h3>Products List</h3>
      {isLoading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="no-products">{error}</p>
      ) : !Array.isArray(products) || products.length === 0 ? (
        <p className="no-products">No Products added</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>
                  {item.image ? (
                    <img
                      src={`${API_URL}/Uploads/${item.image}`}
                      alt={item.productName}
                      className="product-image"
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(item._id)}
                    aria-label={`Delete ${item.productName}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showConfirmModal && (
        <div className="confirm-modal">
          <div className="confirm-modal-content">
            <p>Are you sure you want to delete this product?</p>
            <div className="confirm-modal-buttons">
              <button className="confirm-btn" onClick={handleConfirmDelete}>
                Yes
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowConfirmModal(false);
                  setProductToDelete(null);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;