import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  useEffect(() => {
    const footer = document.querySelector('.footer');

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.offsetHeight;
      
      console.log('Scroll Position:', scrollPosition);
      console.log('Document Height:', documentHeight);

      if (scrollPosition >= documentHeight) {
        footer.classList.add('visible');
      } else {
        footer.classList.remove('visible');
      }
    };

    //window.addEventListener('scroll', handleScroll);

    return () => {
      //window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="footer">
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
