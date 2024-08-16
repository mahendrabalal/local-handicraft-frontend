import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import './ProfilePage.css';
import { API_URL } from '../config';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getToken, logOutUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        email: '',
        bio: '',
        profileImage: '',
        socialLinks: {
            facebook: '',
            twitter: '',
            instagram: ''
        },
        hobbies: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = getToken();
                if (!token) {
                    throw new Error("No token found");
                }
                const response = await axios.get(`${API_URL}/auth/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
                setEditData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error.response ? error.response.data : error.message);
                setError("Failed to load user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [getToken]);

    const handleEditClick = async () => {
        if (isEditing) {
            try {
                const token = getToken();
                if (!token) throw new Error("No token found");

                await axios.put(`${API_URL}/auth/profile`, editData, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const response = await axios.get(`${API_URL}/auth/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
                setEditData(response.data);
            } catch (error) {
                console.error("Error updating profile:", error.response ? error.response.data : error.message);
                setError("Failed to update profile.");
            }
        } else {
            setEditData({
                name: user.name,
                email: user.email,
                bio: user.bio || '',
                profileImage: user.profileImage || '',
                socialLinks: user.socialLinks || {
                    facebook: '',
                    twitter: '',
                    instagram: ''
                },
                hobbies: user.hobbies || ''
            });
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('socialLinks')) {
            const key = name.split('.')[1];
            setEditData({ ...editData, socialLinks: { ...editData.socialLinks, [key]: value } });
        } else {
            setEditData({ ...editData, [name]: value });
        }
    };

    const handleLogout = () => {
        logOutUser();
        window.location.href = '/login'; 
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-card">
                {isEditing ? (
                    <input
                        type="text"
                        name="profileImage"
                        value={editData.profileImage}
                        onChange={handleInputChange}
                        placeholder="Profile Image URL"
                        className="profile-input profile-input-image"
                    />
                    
                ) : (
                    user.profileImage && (
                        <img src={user.profileImage} alt="Profile" className="profile-image" />
                    )
                )}

                <h1 className="profile-name">
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleInputChange}
                            className="profile-input"
                        />
                    ) : (
                        user.name
                    )}
                </h1>
                <h2 className="profile-email-label">E-mail</h2>
                <p className="profile-email">
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={editData.email}
                            onChange={handleInputChange}
                            className="profile-input"
                        />
                    ) : (
                        user.email
                    )}
                </p>
                <h2>About Me</h2>
                <div className="profile-details">
                    {isEditing ? (
                        <textarea
                            name="bio"
                            value={editData.bio}
                            onChange={handleInputChange}
                            rows="5"
                            className="profile-textarea"
                        />
                    ) : (
                        <p>{user.bio || "No bio available."}</p>
                    )}
                </div>
                <h2>Social Links</h2>
                <div className="profile-section">
                    {isEditing ? (
                        <div className="social-links">
                            <input
                                type="text"
                                name="socialLinks.facebook"
                                value={editData.socialLinks.facebook}
                                onChange={handleInputChange}
                                placeholder="Facebook"
                                className="profile-input"
                            />
                            <input
                                type="text"
                                name="socialLinks.twitter"
                                value={editData.socialLinks.twitter}
                                onChange={handleInputChange}
                                placeholder="Twitter"
                                className="profile-input"
                            />
                            <input
                                type="text"
                                name="socialLinks.instagram"
                                value={editData.socialLinks.instagram}
                                onChange={handleInputChange}
                                placeholder="Instagram"
                                className="profile-input"
                            />
                        </div>
                    ) : (
                        <div className="social-links">
                            {user.socialLinks?.facebook && <p><a href={user.socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></p>}
                            {user.socialLinks?.twitter && <p><a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></p>}
                            {user.socialLinks?.instagram && <p><a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></p>}
                        </div>
                    )}
                </div>
                <h2>Hobbies</h2>
                <div className="profile-section">
                    {isEditing ? (
                        <textarea
                            name="hobbies"
                            value={editData.hobbies}
                            onChange={handleInputChange}
                            rows="3"
                            className="profile-textarea"
                            placeholder="List your hobbies..."
                        />
                    ) : (
                        <p>{user.hobbies || "No hobbies listed."}</p>
                    )}
                </div>

                <div className="profile-actions">
                    <button className="edit-button" onClick={handleEditClick}>
                        {isEditing ? "Save" : "Edit Profile"}
                    </button>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
