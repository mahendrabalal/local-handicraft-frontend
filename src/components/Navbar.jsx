import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null); // Ref for the sidebar

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.navbar-toggle')) {
      setIsMenuOpen(false); // Close the sidebar if clicking outside
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
        <Link to="/" className="navbar-brand">
          <img src="/src/assets/logo_transparent.png" alt="Logo" className="navbar-logo"/>
        </Link>

        <button className="navbar-toggle" onClick={handleMenuToggle} aria-label="Toggle navigation">
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
        </button>

        <ul className="navbar-links">
          <li><Link to="/" className="navbar-item">Home</Link></li>
          <li><Link to="/products" className="navbar-item">Products</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/home" className="navbar-item">Dashboard</Link></li>
              <li><Link to="/profile" className="navbar-item">Profile</Link></li>
              <li><Link to="/settings" className="navbar-item">Settings</Link></li>
              <li><button onClick={logOutUser} className="navbar-button">Logout</button></li>
              <li className="navbar-user">
                <Link to="/profile">
                  <img src={user?.profileImageUrl || '/path/to/default-icon.jpg'} alt="Profile Icon" className="navbar-user-icon" />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/signup" className="navbar-item">Sign Up</Link></li>
              <li><Link to="/login" className="navbar-item">Login</Link></li>
            </>
          )}
        </ul>

        <div className={`sidebar ${isMenuOpen ? 'open' : ''}`} ref={sidebarRef}>
          <ul className="sidebar-links">
            <li><Link to="/" className="navbar-item">Home</Link></li>
            <li><Link to="/products" className="navbar-item">Products</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link to="/home" className="navbar-item">Dashboard</Link></li>
                <li><Link to="/profile" className="navbar-item">Profile</Link></li>
                <li><Link to="/settings" className="navbar-item">Settings</Link></li>
                <li><button onClick={logOutUser} className="navbar-button">Logout</button></li>
                <li className="navbar-user">
                  <Link to="/profile">
                    <img src={user?.profileImageUrl || '/path/to/default-icon.jpg'} alt="Profile Icon" className="navbar-user-icon" />
                  </Link>
                </li>
              </>
            ) : (
              <>
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
