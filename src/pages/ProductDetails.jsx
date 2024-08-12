import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/productServices'; // Adjust import path as needed
import './ProductDetails.css'; // Import the CSS file

const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from URL params
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

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
                </div>
            </div>
            <button className="go-back-button" onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
};

export default ProductDetails;
