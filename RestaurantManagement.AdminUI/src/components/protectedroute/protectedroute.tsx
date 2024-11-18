
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRoles }: { children: JSX.Element, requiredRoles: string[] }) => {
  const token = sessionStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (!token) {
    // Nếu không có token, chuyển hướng đến trang đăng nhập
    return <Navigate to="/" />;
  }
  if (!token || role && !requiredRoles.includes(role)) {
    return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
      <h2>Access Denied</h2>
      <p>You do not have permission to access this page.</p>
    </div>;
  }
  // Nếu có token, cho phép truy cập vào trang
  return children;
};

export default ProtectedRoute;