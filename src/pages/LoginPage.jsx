import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import './LoginPage.css'; // Import the CSS file
import { API_URL } from "../config";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    
    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });
            const token = response.data.authToken; // Token received from server
            console.log('Token received:', token); // Verify the token
            
            // Store the token in localStorage
            localStorage.setItem('token', token);
            console.log('Token stored in localStorage:', localStorage.getItem('token')); // Verify storage
            
            storeToken(token); // Store the token in context or other state management
            authenticateUser(); // Update context state
            navigate('/'); // Redirect to home page
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="login-page">
            <div className="login-info">
                <h2>Welcome Back!</h2>
                <p>Login to access your dashboard and manage your account.</p>
            </div>
            <div className="login-form">
                <h1 className="login-title">Login</h1>
                <form onSubmit={handleLoginSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmail}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePassword}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p className="signup-prompt">Don’t have an account yet? <Link to="/signup" className="signup-link">Sign Up</Link></p>
            </div>
        </div>
    );
}

export default LoginPage;
