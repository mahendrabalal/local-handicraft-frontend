import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";
import { API_URL } from "../config";

function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/email/send-email`, formData);
            if (response.status === 200) {
                setSubmitted(true);
                setErrorMessage('');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setErrorMessage('There was an error sending your message. Please try again later.');
        }
    };

    return (
        <div className="contact-us">
            {submitted ? (
                <p className="submit-message" aria-live="polite">
                    Thank you for your message. We appreciate your interest in LocalHandicraft and will get back to you shortly.
                </p>
            ) : (
                <div className="contact-form">
                    <h3>Get in Touch with Us</h3>
                    <p>
                        We're here to help with any questions or concerns. Please fill out the form below, and we'll respond as soon as possible.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="subject">Subject:</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                required
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button type="submit">Submit</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            )}

            <div className="map">
                <h3>Visit Our Workshop</h3>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.2381615427055!2d-87.63348168454338!3d41.88514637921921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2cae14d7c73f%3A0xa5c765a2453b7d9b!2s200%20N%20LaSalle%20Dr%2C%20Chicago%2C%20IL%2060601%2C%20USA!5e0!3m2!1sen!2s!4v1596581625798!5m2!1sen!2s"
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                    title="Google Maps"
                ></iframe>

                <div className="social-links">
                    <h3>Connect with Us:</h3>
                    <ul>
                        <li>
                            <a href="https://instagram.com/localhandicraft" target="_blank" rel="noopener noreferrer">
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a href="https://pinterest.com/localhandicraft" target="_blank" rel="noopener noreferrer">
                                Pinterest
                            </a>
                        </li>
                        <li>
                            <a href="https://facebook.com/localhandicraft" target="_blank" rel="noopener noreferrer">
                                Facebook
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Contact;
