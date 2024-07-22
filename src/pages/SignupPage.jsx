import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    
    const handleSignupSubmit = (e) => {
        e.preventDefault();

        // Client-side validation
        if (!email || !password || !name) {
            setErrorMessage("All fields are required.");
            return;
        }
        
        setLoading(true);

        // Create an object representing the request body
        const requestBody = { email, password, name };

        // Make an axios request to the API
        axios.post(`${API_URL}/auth/signup`, requestBody)
          .then((response) => {
            setLoading(false);
            navigate('/login');
          })
          .catch((error) => {
            setLoading(false);
            const errorDescription = error.response?.data?.message || "An error occurred. Please try again later.";
            setErrorMessage(errorDescription);
          });
    };

    return (
        <div className="SignupPage">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignupSubmit}>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    required
                />

                <label htmlFor="name">Name:</label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleName}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
        </div>
    );
}

export default SignupPage;