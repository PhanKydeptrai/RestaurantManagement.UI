import { Route, Routes } from "react-router-dom";
import HomePage from "./page/normalpage/home/homes";
import MenuPage from "./page/normalpage/menu/menus";
import BookFormOfNormal from "./page/normalpage/book/book";
import ProtectedRoute from "./components/protectedroute/protectedroute";
import AccountPage from "./page/authentication/account";
import ChangePasswordPage from "./page/authentication/change-password";
import VoucherPage from "./page/normalpage/voucher/voucher";

function ControllerPage() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/normalbook" element={<BookFormOfNormal />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/changePassword" element={<ChangePasswordPage />} />
                <Route path="voucher" element={<VoucherPage />} />

                <Route path="/abc" element={
                    <ProtectedRoute>
                        <Route path="/home" element={<HomePage />} />
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    )
};

export default ControllerPage;