// components/Header.js
import React, { useState, useEffect, useRef } from 'react';
import './Header.css'; // Ensure you have corresponding styles

function Header({ user, showForm, setShowForm }) {
  const [headerVisible, setHeaderVisible] = useState(true); // Track header visibility
  const lastScrollY = useRef(0); // Track last scroll position

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setHeaderVisible(false);
      } else {
        // Scrolling up
        setHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePostItemClick = () => {
    setShowForm(!showForm);
  };

  return (
    <header className={`dashboard-header ${headerVisible ? 'visible' : 'hidden'}`}>
      <div className="slider">
        <div className="slides">
          <div className="slide" style={{ backgroundImage: 'url(/path/to/image1.jpg)' }}></div>
          <div className="slide" style={{ backgroundImage: 'url(/path/to/image2.jpg)' }}></div>
          <div className="slide" style={{ backgroundImage: 'url(/path/to/image3.jpg)' }}></div>
        </div>
      </div>
      <div className="header-content">
        <h3>Hello, {user?.name}!</h3>
        <p>We are glad to have you back. Consider posting your item to our platform.</p>
        <button onClick={handlePostItemClick} className="toggle-form-button">
          {showForm ? 'Hide Form' : 'Post New Product'}
        </button>
      </div>
    </header>
  );
}

export default Header;
