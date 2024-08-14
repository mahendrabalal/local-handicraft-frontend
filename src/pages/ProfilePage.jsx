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
        profilePicture: ''
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
                profilePicture: user.profilePicture || ''
            });
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
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
            <div className="profile-header">
                {isEditing ? (
                    <input
                        type="text"
                        name="profilePicture"
                        value={editData.profilePicture}
                        onChange={handleInputChange}
                        placeholder="Profile Picture URL"
                    />
                ) : (
                    user.profilePicture && (
                        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
                    )
                )}
                <h1 className="profile-name">
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleInputChange}
                        />
                    ) : (
                        user.name
                    )}
                </h1>
                <p className="profile-email">
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={editData.email}
                            onChange={handleInputChange}
                        />
                    ) : (
                        user.email
                    )}
                </p>
            </div>
            <div className="profile-details">
                <h2>About Me</h2>
                {isEditing ? (
                    <textarea
                        name="bio"
                        value={editData.bio}
                        onChange={handleInputChange}
                        rows="5"
                        cols="50"
                    />
                ) : (
                    <p>{user.bio || "No bio available."}</p>
                )}
            </div>
            <div className="profile-actions">
                <button className="edit-button" onClick={handleEditClick}>
                    {isEditing ? "Save" : "Edit Profile"}
                </button>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default ProfilePage;
