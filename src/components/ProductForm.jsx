import React from 'react';
import './ProductForm.css'; // Import the CSS file for styling

function ProductForm({ formData, setFormData, editProductId, setEditProductId, onSubmit, error, successMessage }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <aside className="product-form">
      <h2>{editProductId ? 'Edit Product' : 'Sell Your Product'}</h2>
          <p className="form-description">Ready to make some money? Post your items for sale and reach a wider audience.</p>
          <form className="post-item-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Product Name:</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL:</label>
              <input
                id="imageUrl"
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="Electronics">Electronics</option>
                <option value="Books">Books</option>
                <option value="Clothing">Clothing</option>
                <option value="Furniture">Furniture</option>
                <option value="Toys">Toys</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock:</label>
              <input
                id="stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="submit-button">{editProductId ? 'Update' : 'Submit'}</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}
          </form>
    </aside>
  );
}

export default ProductForm;
