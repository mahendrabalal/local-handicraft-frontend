import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import logo from '../assets/logo.png'; // Adjust the path as needed
import './Navbar.css';

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.navbar-toggle')) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" className="navbar-logo"/>
        </Link>

        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          {isLoggedIn ? (
            <>
              <li><Link to="/profile" className="navbar-item">Profile</Link></li>
              <li><Link to="/settings" className="navbar-item">Settings</Link></li>
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

        <div className="navbar-user">
          {isLoggedIn && (
            <Link to="/profile">
              <img src={user?.profileImageUrl || '/src/assets/account-profile-user-icon--icon-search-engine-10.png'} alt="Profile Icon" className="navbar-user-icon" />
            </Link>
          )}
        </div>

        <div className={`sidebar ${isMenuOpen ? 'open' : ''}`} ref={sidebarRef}>
          <ul className="sidebar-links">
            <li><Link to="/" className="navbar-item">Home</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link to="/dashboard" className="navbar-item">Dashboard</Link></li>
                <li><Link to="/profile" className="navbar-item">Profile</Link></li>
                <li><Link to="/settings" className="navbar-item">Settings</Link></li>
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
