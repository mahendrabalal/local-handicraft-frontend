import React, { useState, useEffect, useContext } from 'react';
import { fetchProducts } from '../services/productServices';
import { AuthContext } from '../context/auth.context'; // Import AuthContext if using for authentication
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
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <div className="product-details">
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
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
