import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Home.css"; // Import the CSS file

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      // Delay the navigation to allow the loading state to be shown
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 100); // Adjust delay if needed
      return () => clearTimeout(timer);
    } else {
      setLoading(false); // Set loading to false if not redirecting
    }
  }, [isLoggedIn, navigate]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; // Replace with a spinner component if available
  }

  return (
    <div className="home-page">
      <div className="banner-container">
        <img src="/assets/home-banner.jpg" alt="Banner" className="banner-image" />
        <div className="banner-text">
          <h1>Make Money by Selling Your Unused Items</h1>
          <p>Sign up to start selling or log in if you already have an account.</p>
          <div className="home-buttons">
            <Link to="/signup">
              <button className="home-button">Sign Up</button>
            </Link>
            
            <Link to="/login">
              <button className="home-button">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
