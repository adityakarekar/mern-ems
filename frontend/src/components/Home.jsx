import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt, FaUsers } from 'react-icons/fa';
import './Home.css'; // External CSS for styling

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Employee Management System</h1>
        <p>Welcome to the employee management portal. Please sign in or register to manage employees.</p>
      </header>
      <div className="home-actions">
        <Link to="/register" className="home-button">
          <FaUserPlus /> Register
        </Link>
        <Link to="/login" className="home-button">
          <FaSignInAlt /> Login
        </Link>
        <Link to="/employees" className="home-button">
          <FaUsers /> Manage Employees
        </Link>
      </div>
    </div>
  );
};

export default Home;
