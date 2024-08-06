import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Dashboard.css'; // Import the CSS file for styling

function Dashboard({ username }) {
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

  const navigate = useNavigate(); 

  // Fetch the product list on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/products'); 
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting form with data:', formData); // Debugging log

    try {
      const response = await axios.post('http://localhost:5005/api/products', formData); // Adjust the URL as needed
      console.log('Product added:', response.data); // Debugging log

      // Clear the form
      setFormData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: 'Clothing', // Reset to default category
        stock: ''
      });

      // Redirect to the products page
      navigate('/products'); // Navigate to products page
    } catch (error) {
      console.error('Error posting product:', error);
    }
  };

  const handlePostItemClick = () => {
    setShowForm(!showForm); // Toggle form visibility
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Hello, {username}! We are glad to have you back.</h1>
      </header>

      <main className="dashboard-content">
        <section className="sell-section">
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
              <button type="submit">Submit</button>
            </form>
          )}

          <section className="product-list">
            <h2>Product List</h2>
            <ul>
              {products.map(product => (
                <li key={product._id}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Category: {product.category}</p>
                  <p>Stock: {product.stock}</p>
                  {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
                </li>
              ))}
            </ul>
          </section>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
