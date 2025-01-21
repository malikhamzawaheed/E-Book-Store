import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookList from './components/Customer/BookList';
import BookDetails from './components/Customer/BookDetails';
import Cart from './components/Customer/Cart';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import BookManager from './components/Admin/BookManager';
import SalesDashboard from './components/Admin/SalesDashboard';
import AdminNavbar from './components/Admin/AdminNavbar';
import { AdminContext } from './context/AdminContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FaShoppingBasket } from 'react-icons/fa';

axios.defaults.withCredentials = true;

const ProtectedRoute = ({ children }) => {
  const { isAdminLoggedIn } = useContext(AdminContext);
  return isAdminLoggedIn ? children : <Navigate to="/admin/login" />;
};

function App() {
  const { isAdminLoggedIn, setIsAdminLoggedIn } = useContext(AdminContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/checkAuth');
        setIsLoggedIn(response.data.isAuthenticated);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleAddToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/logout');
      setIsLoggedIn(false);
      setCart([]); // clear cart on logout
    } catch (error) {
      console.error('Failed to logout');
    }
  };

  const handleAdminLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin/logout');
      setIsAdminLoggedIn(false);
    } catch (error) {
      console.error('Failed to logout');
    }
  };

  return (
    <Router>
      {isAdminLoggedIn ? (
        <AdminNavbar handleLogout={handleAdminLogout} />
      ) : (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Bookstore</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/books">Books</Link>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/cart">
                        <FaShoppingBasket />
                        {cart.length > 0 && <span className="badge bg-secondary ms-1">{cart.length}</span>}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails handleAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/admin/login" element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/books" element={<ProtectedRoute><BookManager /></ProtectedRoute>} />
        <Route path="/admin/sales" element={<ProtectedRoute><SalesDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
