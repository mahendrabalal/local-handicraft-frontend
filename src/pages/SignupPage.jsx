import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './SignupPage.css'; // Import the CSS file

const API_URL = "http://localhost:5005";

function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [loading, setLoading] = useState(false);
   
    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);
    
    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !name) {
            setErrorMessage("All fields are required.");
            return;
        }
        
        setLoading(true);

        const requestBody = { email, password, name };

        try {
            await axios.post(`${API_URL}/auth/signup`, requestBody);
            navigate('/login');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-form">
                <h1 className="signup-title">Sign Up</h1>
                <form onSubmit={handleSignupSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmail}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePassword}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleName}
                            required
                        />
                    </div>

                    <button type="submit" className="signup-button" disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <p className="login-prompt">Already have an account? <Link to="/login" className="login-link">Login</Link></p>
            </div>
            <div className="signup-text">
                <h2>Welcome to Our Platform</h2>
                <p>Join us and enjoy a range of amazing features tailored just for you. Our platform offers a user-friendly experience and a community of like-minded individuals.</p>
                <p>By signing up, you’ll gain access to exclusive content, updates, and personalized support. Don’t miss out on the opportunity to be part of something special!</p>
                <p>Already a member? <Link to="/login" className="login-link">Login here</Link></p>
            </div>
        </div>
    );
}

export default SignupPage;
