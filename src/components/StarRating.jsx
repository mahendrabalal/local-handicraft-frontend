// components/StarRating.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './StarRating.css'; // Ensure this CSS file exists

const StarRating = ({ productId, onRate, userToken }) => {
    const [hoveredRating, setHoveredRating] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);

    const handleMouseEnter = (rating) => setHoveredRating(rating);
    const handleMouseLeave = () => setHoveredRating(null);
    const handleClick = (rating) => {
        setSelectedRating(rating);
        onRate(productId, rating, userToken);
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star ${star <= (hoveredRating || selectedRating) ? 'filled' : ''}`}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

StarRating.propTypes = {
    productId: PropTypes.string.isRequired,
    onRate: PropTypes.func.isRequired,
    userToken: PropTypes.string,
};

export default StarRating;
