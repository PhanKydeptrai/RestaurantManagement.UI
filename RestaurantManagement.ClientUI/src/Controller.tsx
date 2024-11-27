import { Route, Routes } from "react-router-dom";
import HomePage from "./page/normalpage/home/homes";
import MenuPage from "./page/normalpage/menu/menus";
import BookFormOfNormal from "./page/normalpage/book/book";
import ProtectedRoute from "./components/protectedroute/protectedroute";

function ControllerPage() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/normalbook" element={<BookFormOfNormal />} />

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