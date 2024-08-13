// Dashboard.js
import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import ProductForm from '../components/ProductForm';
import Header from '../components/Header'; // Import the Header component
import { Link } from 'react-router-dom'; // Correct import
import './Dashboard.css';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: 'Textiles',
    stock: ''
  });
  const [editProductId, setEditProductId] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [scrollTarget, setScrollTarget] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const productRefs = useRef({});

  useEffect(() => {
    const fetchProducts = async () => {
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
      }
    }
  }, [scrollTarget]);

  const handleSubmit = async () => {
    const processedFormData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };
    try {
      if (editProductId) {
        await axios.put(`http://localhost:5005/api/products/${editProductId}`, processedFormData);
        setSuccessMessage('Your product is updated successfully');
      } else {
        const response = await axios.post('http://localhost:5005/api/products', processedFormData);
        setScrollTarget(response.data._id);
        setSuccessMessage('You have posted your product successfully');
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: 'Textiles',
        stock: ''
      });
      setEditProductId(null);

      const updatedResponse = await axios.get('http://localhost:5005/api/products', {
        params: { userId: user.id }
      });
      setProducts(updatedResponse.data);

    } catch (error) {
      console.error('Error posting product:', error);
      setError('Error posting product. Please try again later.');
    } finally {
      setTimeout(() => setSuccessMessage(''), 3000);
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
    setShowForm(true); // Ensure form is shown
    setScrollTarget(product._id);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/products/${id}`);
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
      <Header user={user} showForm={showForm} setShowForm={setShowForm} />

      <main className="dashboard-content">
        {showForm && (
          <ProductForm 
            formData={formData} 
            setFormData={setFormData} 
            editProductId={editProductId} 
            setEditProductId={setEditProductId} 
            onSubmit={handleSubmit} 
            error={error} 
            successMessage={successMessage}
          />
        )}
        <section className="product-list-section">
          <ul className="product-list">
            {products.length > 0 ? (
              products.map(product => (
                <li 
                  key={product._id} 
                  ref={el => (productRefs.current[product._id] = el)}
                  className={`product-item ${product._id === scrollTarget ? 'highlight' : ''}`}
                >
                  <div className="product-info">
                    <Link to={`/products/${product._id}`} className='product-link'>
                      {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="product-image" />}
                    </Link>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p><b>${product.price}</b></p>
                  </div>
                  <div className="product-actions">
                    <button onClick={() => handleEditClick(product)} className="edit-button">Edit</button>
                    <button onClick={() => handleDeleteClick(product._id)} className="delete-button">Delete</button>
                  </div>
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
