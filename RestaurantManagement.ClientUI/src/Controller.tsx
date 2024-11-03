import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingpage/landing-page";
import MealPage from "./pages/menu/meals";
import BookingPage from "./pages/booking/booking";
import AboutPage from "./pages/about/about";
import CarouselPage from "./components/carousel/carousel";
import BookFormOfNormal from "./components/bookform/bookformofNormal";
import CategoryPage from "./pages/category/category";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ResetPasswordPage from "./pages/auth/resetpassword";
import MenuPage from "./pages/menu/menu";

function ControllerPage() {

    return (
        <>
            <Routes>
                <Route path="/" element=
                    {
                        <LandingPage />
                    }
                />
                <Route path="/menu" element=
                    {
                        <MenuPage />
                    }
                />
                <Route path="/book" element=
                    {
                        <BookingPage />
                    }
                />
                <Route path="/about" element=
                    {
                        <AboutPage />
                    }
                />
                <Route path="/carousel" element=
                    {
                        <CarouselPage />
                    }
                />
                <Route path="/formforNomal" element=
                    {
                        <BookFormOfNormal />
                    }
                />
                <Route path="/category" element=
                    {
                        <CategoryPage />
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
                <Route path="/meals" element={
                    <MealPage />
                }
                />
            </Routes>
        </>
    )
}

export default ControllerPage;