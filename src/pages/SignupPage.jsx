import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './SIgnupPage.css'

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
               <p> Discover a new way to sell your products with ease. Our platform offers intuitive tools and a wide reach to help you showcase and boost your sales effectively. <br></br><br></br>Enjoy powerful features like advanced analytics and personalized marketing to elevate your business.

Ready for a change? Switch to our platform and experience how selling can be simpler and more rewarding. <Link to="/login" className="login-link">Login here</Link></p>

            </div>
        </div>
    );
}

export default SignupPage;
