import { Routes, Route } from "react-router-dom";
import Home from "./pages/dashboard/home";
import CategoryPage from "./pages/category-page/categories";
import CreateCategoryPage from "./pages/category-page/createcategory";


function Controller() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/createcategory" element={<CreateCategoryPage />} />

            </Routes>
        </>
    )
}

export default Controller;