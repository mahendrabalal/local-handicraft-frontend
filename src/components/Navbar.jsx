import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

import logo from "../assets/logo.png"; 
import defaultProfileIcon from "../assets/account-profile-user-icon--icon-search-engine-10.png";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null); 

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.navbar-toggle')) {
      setIsMenuOpen(false); 
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Add event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Clean up event listener
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <button 
          className="navbar-toggle" 
          onClick={handleMenuToggle} 
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
        </button>

        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" className="navbar-logo"/>
        </Link>

        {/* Navigation Links */}
        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          {isLoggedIn ? (
            <>
              <li><Link to="/profile" className="navbar-item">Profile</Link></li>
              <li><Link to="/Contact" className="navbar-item">Contact Us</Link></li>
              <li><button onClick={logOutUser} className="navbar-button">Logout</button></li>

            </>
          ) : (
            <>
              <li><Link to="/products" className="navbar-item">Products</Link></li>
              <li><Link to="/signup" className="navbar-item">Sign Up</Link></li>
              <li><Link to="/login" className="navbar-item">Login</Link></li>
              <li><Link to="/contact" className="navbar-item">Contact Us</Link></li>
            </>
          )}
        </ul>

        {/* User Profile */}
        <div className="navbar-user">
          {isLoggedIn && (
            <Link to="/profile">
              <img src={user?.profileImageUrl || defaultProfileIcon} alt="Profile Icon" className="navbar-user-icon" />
            </Link>
          )}
        </div>

        {/* Sidebar */}
        <div className={`sidebar ${isMenuOpen ? 'open' : ''}`} ref={sidebarRef}>
          <ul className="sidebar-links">
            <li><Link to="/" className="navbar-item">Home</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link to="/" className="navbar-item">Dashboard</Link></li>
                <li><Link to="/profile" className="navbar-item">Profile</Link></li>
                <li><button onClick={logOutUser} className="navbar-button">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/products" className="navbar-item">Products</Link></li>
                <li><Link to="/signup" className="navbar-item">Sign Up</Link></li>
                <li><Link to="/login" className="navbar-item">Login</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
