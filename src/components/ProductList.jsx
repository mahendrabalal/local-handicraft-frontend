import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { fetchProducts } from '../services/productServices';
import { AuthContext } from '../context/auth.context';
import { Link } from 'react-router-dom';
import StarRating from '../components/StarRating'; // Correct import path
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [userToken, setUserToken] = useState(null);

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

        if (isLoggedIn && user) {
            setUserToken(user.token);
        }

        getProducts();
    }, [isLoggedIn, user]);

    const handleRatingSubmit = async (productId, rating, userToken) => {
        if (!userToken) {
            alert('You must be logged in to rate products.');
            return;
        }

        try {
            const response = await axios.post(
                `${API_URL}/api/reviews/product/${productId}/rate`,
                { rating },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
            const newAverageRating = response.data.averageRating;
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === productId
                        ? { ...product, averageRating: newAverageRating }
                        : product
                )
            );
        } catch (error) {
            alert('Failed to submit rating.');
        }
    };

    return (
        <div className="product-list-container">
            {isLoggedIn && user && (
                <div className="welcome-message">
                    <h2>Hello, {user.name}!</h2>
                    <p>We are glad to have you back.</p>
                </div>
            )}

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
                                {/* Display average rating */}
                                <div className="average-rating">
                                    <h4>Average Rating: {product.averageRating ? `${product.averageRating.toFixed(1)}/5` : 'No ratings yet'}</h4>
                                </div>
                                {/* Display reviews */}
                                {product.reviews && product.reviews.length > 0 ? (
                                    <div className="reviews">
                                        <h4>Reviews:</h4>
                                        {product.reviews.slice(0, 2).map((review) => (
                                            <div key={review._id} className="review">
                                                <p><strong>{review.user.name}:</strong> {review.comment}</p>
                                                <p>Rating: {review.rating}/5</p>
                                            </div>
                                        ))}
                                        {product.reviews.length > 2 && (
                                            <Link to={`/products/${product._id}`}>See more reviews</Link>
                                        )}
                                    </div>
                                ) : (
                                    <div className="review-rating">
                                        <p>No reviews yet</p>
                                        {isLoggedIn && (
                                            <StarRating
                                                productId={product._id}
                                                onRate={handleRatingSubmit}
                                                userToken={userToken}
                                            />
                                        )}
                                    </div>
                                )}
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
