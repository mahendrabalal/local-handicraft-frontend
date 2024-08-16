import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/productServices';
import { AuthContext } from '../context/auth.context';
import StarRating from '../components/StarRating'; // Import StarRating component
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // Access the user context
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(0); // Manage star rating
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [loading, setLoading] = useState(false); // State for loading review submission

    useEffect(() => {
        const getProduct = async () => {
            try {
                const productData = await fetchProductById(id);
                setProduct(productData);
            } catch (error) {
                setError('Failed to load product details.');
            }
        };

        getProduct();
    }, [id]);

    const handleReviewSubmit = async () => {
        if (!user) {
            alert('You need to be logged in to leave a review.');
            return;
        }
    
        if (rating < 1 || rating > 5) {
            alert('Please select a rating between 1 and 5 stars.');
            return;
        }

        setLoading(true); // Set loading to true when submission starts
    
        try {
            const response = await fetch(`/api/reviews/product/${id}/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ rating, comment }),
            });
    
            if (!response.ok) {
                const errorData = await response.text(); // Capture error response
                throw new Error(errorData || 'Failed to submit review.');
            }
    
            const responseData = await response.json();
            setProduct(await fetchProductById(id));
            setRating(0);
            setComment('');
            setSuccessMessage('Thank you for your review!');
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (error) {
            console.error('Failed to submit review:', error);
            setError(error.message || 'Failed to submit review.');
        } finally {
            setLoading(false); // Set loading to false when submission ends
        }
    };
    
    if (error) return <p className="error-message">{error}</p>;

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-details-container">
            <div className="product-details-content">
                <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
                <div className="product-detail-info">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Stock:</strong> {product.stock}</p>
                    <p><strong>Status:</strong> {product.sold ? 'Sold' : 'Available'}</p>
                    <p><strong>Average Rating:</strong> {product.averageRating ? `${product.averageRating.toFixed(1)}/5` : 'No ratings yet'}</p>
                </div>
            </div>
            <div className="product-details-buttons">
                <button className="go-back-button" onClick={() => navigate(-1)}>Go Back</button>
            </div>
            {/* Review Form */}
            <div className="review-form">
                <h2>Leave a Review</h2>
                <div>
                    <label>
                        Rating:
                        <StarRating rating={rating} setRating={setRating} />
                    </label>
                </div>
                <div>
                    <label>
                        Comment:
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </label>
                </div>
                <button onClick={handleReviewSubmit} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Review'}
                </button>
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </div>
    );
};

export default ProductDetails;
