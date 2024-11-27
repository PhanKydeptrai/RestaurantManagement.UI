import { Route, Routes } from "react-router-dom";
import HomePage from "./page/normalpage/home/homes";
import MenuPage from "./page/normalpage/menu/menus";
import BookFormOfNormal from "./page/normalpage/book/book";

function ControllerPage() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/normalbook" element={<BookFormOfNormal />} />
            </Routes>
        </>
    )
};

export default ControllerPage;