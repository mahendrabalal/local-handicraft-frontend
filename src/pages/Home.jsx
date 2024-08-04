import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Home.css"; // Import the CSS file

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/projects"); // Redirect logged-in users to the /projects page
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return null; // Optionally return null or a loading spinner while redirecting
  }

  return (
    <div className="home-page">
      <div className="banner-container">
        <img src="/src/assets/homePageBanner.jpg" alt="Banner" className="banner-image" />
        <div className="banner-text">
          <h1>Make Money by Selling Your Unused Items</h1>
          <br></br>
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
