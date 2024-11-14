import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Route, Routes, useLocation } from 'react-router-dom';

import LandingPage from './components/page/pageindex';
import BookingPage from './pages/booking/booking';
import BookFormOfNormal from './components/bookform/bookformofNormal';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import ResetPasswordPage from './pages/auth/resetpassword';
import ProtectedRoute from './components/protectedroute/protechtedroute';
import BookFormOfSubcribe from './components/bookform/bookformofSubcribe';
import MenuPage from './pages/meals/menu';
import AccountPage from './pages/account/profile';
import ChangePasswordPage from './pages/account/change-password';

library.add(fas);

function App() {
  const location = useLocation(); // Dùng hook để xác định đường dẫn hiện tại

  // Kiểm tra xem trang hiện tại có phải là những trang không hiển thị Layout chung
  const showLayout = !['/login', '/register', '/forgotpassword'].includes(location.pathname);

  return (
    <>
      {showLayout && <LandingPage />}

      <Routes>
        {/* Các trang có thể không cần login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpassword" element={<ResetPasswordPage />} />

        {/* Các trang yêu cầu login */}
        <Route path="/book" element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        } />
        <Route path="/formforNomal" element={

          <BookFormOfNormal />

        } />
        <Route path='/account' element={
          <AccountPage />
        } />
        <Route path='/menu' element={
          <MenuPage />
        } />

        {/* Protected route cho booksubcribe */}
        <Route path="/booksubcribe" element={
          <ProtectedRoute>
            <BookFormOfSubcribe />
          </ProtectedRoute>
        } />
        <Route path="/account/changePassword" element={
          <ChangePasswordPage />

        } />
        {/* LandingPage cho người dùng đã đăng nhập */}

      </Routes>
    </>
  );
}

export default App;
