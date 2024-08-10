import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../context/auth.context';
import './Dashboard.css'; 

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: 'Clothing', 
    stock: ''
  });
  const [editProductId, setEditProductId] = useState(null);
  const [error, setError] = useState(null);
  const [scrollTarget, setScrollTarget] = useState(null); // State to handle scroll target
  const productRefs = useRef({}); // Refs for product list items
  const formRef = useRef(null); // Ref for the form section

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user?.id) return;

      try {
        const response = await axios.get('http://localhost:5005/api/products', {
          params: { userId: user.id }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again later.');
      }
    };

    fetchProducts();
  }, [user]);

  useEffect(() => {
    if (scrollTarget) {
      if (productRefs.current[scrollTarget]) {
        productRefs.current[scrollTarget].scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [scrollTarget]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const processedFormData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      createdBy: user?.id 
    };

    try {
      let response;
      if (editProductId) {
        await axios.put(`http://localhost:5005/api/products/${editProductId}`, processedFormData);
        console.log('Product updated');
      } else {
        response = await axios.post('http://localhost:5005/api/products', processedFormData);
        console.log('Product added');
        setScrollTarget(response.data._id); // Set scroll target to the new product ID
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: 'Clothing',
        stock: ''
      });
      setEditProductId(null);
      setShowForm(false);

      // Refresh the product list
      const updatedResponse = await axios.get('http://localhost:5005/api/products', {
        params: { userId: user.id } 
      });
      setProducts(updatedResponse.data);

    } catch (error) {
      console.error('Error posting product:', error);
      setError('Error posting product. Please try again later.');
    }
  };

  const handlePostItemClick = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setScrollTarget(null); // Reset scroll target when showing form
    }
  };

  const handleEditClick = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      stock: product.stock
    });
    setEditProductId(product._id);
    setShowForm(true);
    setScrollTarget(product._id); // Set scroll target to the product ID for editing
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/products/${id}`);
      console.log('Product deleted');
      const updatedResponse = await axios.get('http://localhost:5005/api/products', {
        params: { userId: user.id } 
      });
      setProducts(updatedResponse.data);
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Error deleting product. Please try again later.');
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Hello, {user?.name}! We are glad to have you back.</h1>
      </header>

      <main className="dashboard-content">
        <section ref={formRef} className="form-section">
          <h2>Sell Your Product</h2>
          <p>Ready to make some money? Post your items for sale and reach a wider audience.</p>
          <button className="post-item-button" onClick={handlePostItemClick}>
            {showForm ? 'Cancel' : 'Post Item'}
          </button>

          {showForm && (
            <form className="post-item-form" onSubmit={handleSubmit}>
              <label>
                Product Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Image URL:
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Category:
                <select
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
              </label>
              <label>
                Stock:
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">{editProductId ? 'Update' : 'Submit'}</button>
              {error && <p className="error-message">{error}</p>}
            </form>
          )}
        </section>

        <section className="product-list-section">
          <h2>Product List</h2>
          <ul className="product-list">
            {products.length > 0 ? (
              products.map(product => (
                <li 
                  key={product._id} 
                  ref={el => (productRefs.current[product._id] = el)} // Assign ref to product item
                  className={`product-item ${product._id === scrollTarget ? 'highlight' : ''}`}
                >
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Category: {product.category}</p>
                  <p>Stock: {product.stock}</p>
                  {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="product-image" />}
                  <button onClick={() => handleEditClick(product)} className="edit-button">Edit</button>
                  <button onClick={() => handleDeleteClick(product._id)} className="delete-button">Delete</button>
                </li>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
