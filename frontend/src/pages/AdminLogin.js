import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ setIsAdminLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { email, password }, { withCredentials: true });
      setIsAdminLoggedIn(true);
      navigate('/admin/dashboard');
    } catch (error) {
      setError('Failed to login');
      console.error('Error during admin login:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Admin Login</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg rounded border-0">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label text-secondary">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label text-secondary">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block w-100">Login</button>
              </form>
              {error && <p className="text-danger mt-3 text-center">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
