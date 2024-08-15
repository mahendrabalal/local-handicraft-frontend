import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '' });

    useEffect(() => {
        // Fetch the current user profile data
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('/auth/profile', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setUser(response.data);
                setFormData({ name: response.data.name, email: response.data.email });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user profile', error);
                setErrorMessage('Failed to fetch user profile.');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/auth/profile', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setUser(response.data);
            setSuccessMessage('Profile updated successfully.');
            setErrorMessage('');
        } catch (error) {
            console.error('Error updating profile', error);
            setErrorMessage('Failed to update profile.');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="settings">
            <h1>Settings</h1>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Settings;
