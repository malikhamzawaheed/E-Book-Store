import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/checkAuth', { withCredentials: true });
        setIsAdminLoggedIn(response.data.isAuthenticated);
      } catch (error) {
        setIsAdminLoggedIn(false);
      }
    };

    checkAdminAuth();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, setIsAdminLoggedIn }}>
      {children}
    </AdminContext.Provider>
  );
};