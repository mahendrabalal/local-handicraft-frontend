import React, { useState } from "react";
import "./Contact.css";

function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setTimeout(() => {
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="contact-us">
            {submitted ? (
                <p className="submit-message">
                    Thank you for your message. We appreciate your interest in LocalHandicraft and will get back to you shortly.
                </p>
            ) : (
                <div className="contact-form">
                    <h3>Get in Touch with Us</h3>
                    <p>
                        We're here to help with any questions or concerns. Please fill out the form below, and we'll respond as soon as possible.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />

                        <label htmlFor="subject">Subject:</label>
                        <input type="text" id="subject" name="subject" required />

                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="5" required></textarea>

                        <button type="submit">Submit</button>
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
