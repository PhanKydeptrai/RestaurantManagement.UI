
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    // const token = sessionStorage.getItem('token');
    // if (!token) {
    //     // Nếu không có token, chuyển hướng đến trang đăng nhập
    //     return <Navigate to="/" />;
    // }
    // Nếu có token, cho phép truy cập vào trang
    return children;
};

export default ProtectedRoute;