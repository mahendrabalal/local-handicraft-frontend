// src/components/StarRating.js
import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, setRating }) => {
    const handleClick = (newRating) => {
        setRating(newRating);
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star ${star <= rating ? 'filled' : ''}`}
                    onClick={() => handleClick(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
