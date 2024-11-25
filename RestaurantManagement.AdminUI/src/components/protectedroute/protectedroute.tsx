
import { Button, Result } from 'antd';
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
    return <div>
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không có quyền truy cập trang này."
      />
    </div>;
  }
  // Nếu có token, cho phép truy cập vào trang
  return children;
};

export default ProtectedRoute;