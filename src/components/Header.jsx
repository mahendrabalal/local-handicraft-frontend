import React from 'react';
import './Header.css'; // Ensure you have corresponding styles

function Header({ user, showForm, setShowForm }) {
  const handlePostItemClick = () => {
    setShowForm(!showForm);
  };

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h3>Hello, {user?.name}!</h3>
        <p>We are glad to have you back. Consider posting your item to our platform.</p>
        <button onClick={handlePostItemClick} className="toggle-form-button">
          {showForm ? 'Hide Form' : 'Post New Product'}
        </button>
      </div>
    </header>
  );
}

export default Header;
