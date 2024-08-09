import { Link } from "react-router-dom";
import './NotFoundPage.css'; // Import the CSS file

function NotFoundPage() {
    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">Oops! The page you’re looking for doesn’t exist.</p>
                <p className="not-found-description">It might have been moved or deleted. Please check the URL or go back to the homepage.</p>
                <Link to="/" className="not-found-link">Go to Homepage</Link>
            </div>
        </div>
    );
}

export default NotFoundPage;
