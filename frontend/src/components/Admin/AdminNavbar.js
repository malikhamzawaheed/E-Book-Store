import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import './AdminNavbar.css'; // Assuming you will create a separate CSS file for custom styles

const AdminNavbar = ({ handleLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" to="/admin/dashboard">Admin Dashboard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${isActive('/admin/books')}`}>
              <Link className="nav-link text-white" to="/admin/books">Manage Books</Link>
            </li>
            <li className={`nav-item ${isActive('/admin/sales')}`}>
              <Link className="nav-link text-white" to="/admin/sales">Sales Dashboard</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
