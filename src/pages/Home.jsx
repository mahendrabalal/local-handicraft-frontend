import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Local Handicraft Shop</h1>
        <p>Your one-stop solution for managing projects and tasks.</p>
      </header>

      <main className="home-content">
        {isLoggedIn ? (
          <div>
            <h2>Hello, {user?.name}!</h2>
            <p>We are glad to have you back.</p>
            <Link to="/projects">
              <button>Go to Projects</button>
            </Link>
          </div>
        ) : (
          <div>
            <h2>Get Started</h2>
            <p>Sign up or log in to start using the application.</p>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </main>

      <footer className="home-footer">
        <p>&copy; 2024 Our Application. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
