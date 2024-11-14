import { Route, Routes } from "react-router-dom";
import BookingPage from "./pages/booking/booking";
import BookFormOfNormal from "./components/bookform/bookformofNormal";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ResetPasswordPage from "./pages/auth/resetpassword";
import ProtectedRoute from "./components/protectedroute/protechtedroute";
import BookFormOfSubcribe from "./components/bookform/bookformofSubcribe";
import LandingPage from "./components/page/pageindex";

function ControllerPage() {

    return (
        <>
            <Routes>
                <Route path="/" element={
                    <LandingPage />
                }
                />
                {/* <Route path="/landingPage" element={
                    
                }
                /> */}
                <Route path="/book" element=
                    {
                        <BookingPage />
                    }
                />

                <Route path="/formforNomal" element=
                    {
                        <BookFormOfNormal />
                    }
                />
                <Route path="/login" element={
                    <LoginPage />
                }
                />
                <Route path="/register" element={
                    <RegisterPage />
                }
                />
                <Route path="/forgotpassword" element={
                    <ResetPasswordPage />
                }
                />
                <Route path="/booksubcribe" element={
                    <ProtectedRoute>
                        <BookFormOfSubcribe />
                    </ProtectedRoute>
                }
                />
            </Routes>
        </>
    )
}

export default ControllerPage;