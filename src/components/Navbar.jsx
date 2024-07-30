import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/src/assets/logo.png" alt="Logo" className="navbar-logo"/>
        </Link>

        <button className="navbar-toggle" onClick={handleMenuToggle} aria-label="Toggle navigation">
          <span className="navbar-toggle-icon"></span>
        </button>

        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" className="navbar-item">Home</Link>
          </li>
          <li>
            <Link to="/products" className="navbar-item">Products</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/home" className="navbar-item">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile" className="navbar-item">Profile</Link>
              </li>
              <li>
                <Link to="/settings" className="navbar-item">Settings</Link>
              </li>
              <li>
                <button onClick={logOutUser} className="navbar-button">Logout</button>
              </li>
              <li className="navbar-user">{user && user.name}</li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup" className="navbar-item">Sign Up</Link>
              </li>
              <li>
                <Link to="/login" className="navbar-item">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
