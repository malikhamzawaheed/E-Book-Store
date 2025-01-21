import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-primary">Admin Dashboard</h1>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-lg rounded border-0">
            <div className="card-body">
              <h5 className="card-title text-secondary">Manage Books</h5>
              <p className="card-text text-muted">Add, update, or delete books in the system.</p>
              <Link to="/admin/books" className="btn btn-outline-primary btn-lg w-100">Manage Books</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-lg rounded border-0">
            <div className="card-body">
              <h5 className="card-title text-secondary">Sales Dashboard</h5>
              <p className="card-text text-muted">Track sales statistics and generate reports.</p>
              <Link to="/admin/sales" className="btn btn-outline-primary btn-lg w-100">View Sales</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
