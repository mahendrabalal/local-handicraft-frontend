import React, { useState, useEffect, useContext } from 'react';
import { fetchProducts } from '../services/productServices';
import { AuthContext } from '../context/auth.context'; // Import AuthContext if using for authentication
import { Link } from 'react-router-dom';
import './ProductList.css'; // Import the CSS file

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    // Retrieve authentication state
    const { isLoggedIn, user } = useContext(AuthContext);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productsData = await fetchProducts();
                setProducts(productsData);
            } catch (error) {
                setError('Failed to load products.');
            }
        };

        getProducts();
    }, []);

    return (
        <div className="product-list-container">
            {isLoggedIn && user ? (
                <div className="welcome-message">
                    <h2>Hello, {user.name}!</h2>
                    <p>We are glad to have you back.</p>
                </div>
            ) : null}

            {error && <p className="error-message">{error}</p>}

            <ul className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <li key={product._id} className="product-item">
                            <Link to={`/products/${product._id}`} className="product-link">
                                <img src={product.imageUrl} alt={product.name} className="product-image" />
                            </Link>
                            <div className="product-details">
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                                <button
                                    className="buy-now-button"
                                    onClick={() => window.location.href = `/checkout/${product._id}`}
                                >
                                    Buy it now
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </ul>
        </div>
    );
};

export default ProductList;
