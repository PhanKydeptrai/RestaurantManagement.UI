import { Routes, Route, Router } from "react-router-dom";
import Home from "./pages/dashboard/home";
import CategoryPage from "./pages/category-page/categories";
import CreateCategoryPage from "./pages/category-page/createcategory";
import Login from "./pages/auth-page/login";
import ProtectedRoute from "./components/protectedroute/protectedroute";
import EmployeePage from "./pages/employee-page/empolyees";
import CreateEmployee from "./pages/employee-page/createemployee";
import CustomerPage from "./pages/customer-page/customers";
import UpdateCategoryPage from "./pages/category-page/updatecategory";
import MealPage from "./pages/meal-page/meals";
import CreateMealPage from "./pages/meal-page/createmeal";
import UpdateMealPage from "./pages/meal-page/updatemeal";
import TableTypePage from "./pages/table-page/tables";
import DetailEmployeePage from "./pages/employee-page/detailemployee";
import DetailCategoryPage from "./pages/category-page/detailcategory";
import DetailMealPage from "./pages/meal-page/detailmeal";
import CreateTableTypePage from "./pages/table-page/createtabletype";
import CreateTablePage from "./pages/table-page/createtable";
import VoucherPage from "./pages/voucher-page/vouchers";
import CreateVoucherPage from "./pages/voucher-page/createvoucher";

function Controller() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/categories" element={
                    <ProtectedRoute>
                        <CategoryPage />
                    </ProtectedRoute>
                } />
                <Route path="/categories/createcategory" element={
                    <ProtectedRoute>
                        <CreateCategoryPage />
                    </ProtectedRoute>
                } />
                <Route path="/categories/updatecategory/:categoryId" element={
                    <ProtectedRoute>
                        <UpdateCategoryPage />
                    </ProtectedRoute>
                } />
                <Route path="/categories/detailcategory/:categoryId" element={
                    <ProtectedRoute>
                        <DetailCategoryPage />
                    </ProtectedRoute>
                } />
                <Route path="/employees" element={
                    <ProtectedRoute>
                        <EmployeePage />
                    </ProtectedRoute>
                } />
                <Route path="/createemployee" element={
                    <ProtectedRoute>
                        <CreateEmployee />
                    </ProtectedRoute>
                } />
                <Route path="employees/detailemployee/:userId" element={
                    <ProtectedRoute>
                        <DetailEmployeePage />
                    </ProtectedRoute>
                } />
                <Route path="/customers" element={
                    <ProtectedRoute>
                        <CustomerPage />
                    </ProtectedRoute>
                } />

                <Route path="/meals" element={
                    <ProtectedRoute>
                        <MealPage />
                    </ProtectedRoute>
                } />
                <Route path="/createmeal" element={
                    <ProtectedRoute>
                        <CreateMealPage />
                    </ProtectedRoute>
                } />
                <Route path="meals/updatemeal/:mealId" element={
                    <ProtectedRoute>
                        <UpdateMealPage />
                    </ProtectedRoute>
                } />
                <Route path="meals/detailmeal/:mealId" element={
                    <ProtectedRoute>
                        <DetailMealPage />
                    </ProtectedRoute>
                } />
                <Route path="/tables" element={
                    <ProtectedRoute>
                        <TableTypePage />
                    </ProtectedRoute>
                } />
                <Route path="/createtabletype" element={
                    <ProtectedRoute>
                        <CreateTableTypePage />
                    </ProtectedRoute>
                } />
                <Route path="/createtable" element={
                    <ProtectedRoute>
                        <CreateTablePage />
                    </ProtectedRoute>
                } />
                <Route path="/vouchers" element={
                    <ProtectedRoute>
                        <VoucherPage />
                    </ProtectedRoute>
                } />
                <Route path="/createvoucher" element={
                    <ProtectedRoute>
                        <CreateVoucherPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    )
}

export default Controller;