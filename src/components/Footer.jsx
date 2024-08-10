import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [visible, setVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.offsetHeight;

      if (scrollPosition >= documentHeight) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    const handleClickOutside = (event) => {
      if (footerRef.current && !footerRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClickOutside);

    // Initial check in case the user is already at the bottom
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <footer
      className={`footer ${visible ? 'visible' : ''}`}
      ref={footerRef}
    >
      <div className="footer-content">
        <p>&copy; 2024 Local Handicraft. All Rights Reserved.</p>
        <ul className="footer-links">
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><a href="/terms-of-service">Terms of Service</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
