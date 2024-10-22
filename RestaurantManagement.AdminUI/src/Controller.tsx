import { Routes, Route } from "react-router-dom";
import Home from "./pages/dashboard/home";
import CategoryPage from "./pages/category-page/categories";
import CreateCategoryPage from "./pages/category-page/createcategory";
import Login from "./pages/auth-page/login";
import ProtectedRoute from "./components/protectedroute/protectedroute";

function Controller() {
    return (
        <>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/createcategory" element={<CreateCategoryPage />} />
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/categories"element={
                    <ProtectedRoute>
                        <CategoryPage />
                    </ProtectedRoute>
                }/>
                <Route path="/categories/createcategory" element={
                    <ProtectedRoute>
                        <CreateCategoryPage />
                    </ProtectedRoute>
                }/>

            </Routes>
        </>
    )
}

export default Controller;