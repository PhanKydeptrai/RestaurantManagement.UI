import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingpage/landing-page";
import MealPage from "./pages/menu/meals";
import BookingPage from "./pages/booking/booking";
import AboutPage from "./pages/about/about";
import CarouselPage from "./components/carousel/carousel";
import BookFormOfNormal from "./components/bookform/bookformofNormal";

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
                        <MealPage />
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

            </Routes>
        </>
    )
}

export default ControllerPage;