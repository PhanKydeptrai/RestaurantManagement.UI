import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute checks if the user is authenticated
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = sessionStorage.getItem('Token'); // Get auth token from sessionStorage

  // If no token found, redirect to the login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
