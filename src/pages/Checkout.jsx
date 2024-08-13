import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/productServices';
import './Checkout.css'; // Import your CSS file

const Checkout = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null); // For error handling
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const productData = await fetchProductById(productId);
                if (productData) {
                    setProduct(productData);
                    setTotalPrice((productData.price * quantity).toFixed(2));
                } else {
                    setError('Product not found.');
                }
            } catch (error) {
                setError('Failed to load product.');
                console.error('Failed to load product.', error);
            }
        };

        getProduct();
    }, [productId, quantity]);

    useEffect(() => {
        if (window.paypal) {
            // Check if PayPal buttons are already rendered
            const paypalButtonContainer = document.getElementById('paypal-button-container');
            if (paypalButtonContainer && paypalButtonContainer.childElementCount === 0) {
                window.paypal.Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: totalPrice
                                }
                            }]
                        });
                    },
                    onApprove: async (data, actions) => {
                        await actions.order.capture();
                        alert('Your item is on its way!');
                        navigate('/thank-you'); // Redirect to a thank you or confirmation page
                    },
                    onError: (err) => {
                        console.error('PayPal Checkout error', err);
                        setError('Payment failed. Please try again.');
                    }
                }).render('#paypal-button-container');
            }
        }
    }, [totalPrice, navigate]);

    const handleQuantityChange = (e) => {
        const newQuantity = Number(e.target.value);
        setQuantity(newQuantity);
        if (product) {
            setTotalPrice((product.price * newQuantity).toFixed(2));
        }
    };

    if (error) return <p className="error-message">{error}</p>;
    if (!product) return <p>Loading...</p>;

    return (
        <div className="checkout-container">
            <div className="checkout-card">
                <h1>Checkout</h1>
                <div className="checkout-details">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">Price: ${product.price.toFixed(2)}</p>
                    <label className="quantity-label">
                        Quantity:
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="quantity-input"
                        />
                    </label>
                    <p className="total-price">Total Bill: ${totalPrice}</p>
                    <div id="paypal-button-container" className="paypal-button-container"></div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
