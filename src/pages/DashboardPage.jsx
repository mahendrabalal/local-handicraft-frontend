import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import ProductForm from '../components/ProductForm';
import './Dashboard.css'; // Import the CSS file for styling

function Dashboard() {
  const { user } = useContext(AuthContext);
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

  const handleSubmit = async () => {
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
        <h3>Hello, {user?.name}! We are glad to have you back.</h3>
      </header>

      <main className="dashboard-content">
        <ProductForm 
          formData={formData} 
          setFormData={setFormData} 
          editProductId={editProductId} 
          setEditProductId={setEditProductId} 
          onSubmit={handleSubmit} 
          error={error} 
          successMessage={editProductId ? 'Your product is updated successfully' : 'You have posted your product successfully'}
        />
        <section className="product-list-section">
          <ul className="product-list">
            {products.length > 0 ? (
              products.map(product => (
                <li 
                  key={product._id} 
                  ref={el => (productRefs.current[product._id] = el)} // Assign ref to product item
                  className={`product-item ${product._id === scrollTarget ? 'highlight' : ''}`}
                >
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Category: {product.category}</p>
                    <p>Stock: {product.stock}</p>
                    {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="product-image" />}
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
