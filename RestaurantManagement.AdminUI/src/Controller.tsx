import { Routes, Route } from "react-router-dom";
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
import AccountPage from "./pages/account-page/account";
import BookingPage from "./pages/booking-page/booking";
import DetailBookingPage from "./pages/booking-page/bookingdetail";
import ArrangeBookPage from "./pages/booking-page/arangebook";
import OrderDetailPage from "./pages/order-page/orderdetail";
import OrderPage from "./pages/order-page/orders";
import CreateOrderPage from "./pages/order-page/createorder";
import AssignCustomerPage from "./pages/table-page/assigncustomer";
import BillPage from "./pages/bill-page/bill";
import BillDetailPage from "./pages/bill-page/billdetail";
import ChangePasswordPage from "./pages/account-page/change-password";

function Controller() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager']}>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/categories" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Waiter', 'Manager']}>
                        <CategoryPage />
                    </ProtectedRoute>
                } />
                <Route path="/categories/createcategory" element={
                    <ProtectedRoute requiredRoles={['Boss']}>
                        <CreateCategoryPage />
                    </ProtectedRoute>
                } />
                <Route path="/categories/updatecategory/:categoryId" element={
                    <ProtectedRoute requiredRoles={['Boss']}>
                        <UpdateCategoryPage />
                    </ProtectedRoute>
                } />
                <Route path="/categories/detailcategory/:categoryId" element={
                    <ProtectedRoute requiredRoles={['Boss']}>
                        <DetailCategoryPage />
                    </ProtectedRoute>
                } />
                <Route path="/employees" element={
                    <ProtectedRoute requiredRoles={['Boss', "Manager"]}>
                        <EmployeePage />
                    </ProtectedRoute>
                } />
                <Route path="/createemployee" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager']}>
                        <CreateEmployee />
                    </ProtectedRoute>
                } />
                <Route path="employees/detailemployee/:userId" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <DetailEmployeePage />
                    </ProtectedRoute>
                } />
                <Route path="/customers" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <CustomerPage />
                    </ProtectedRoute>
                } />

                <Route path="/meals" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <MealPage />
                    </ProtectedRoute>
                } />
                <Route path="/createmeal" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <CreateMealPage />
                    </ProtectedRoute>
                } />
                <Route path="meals/updatemeal/:mealId" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <UpdateMealPage />
                    </ProtectedRoute>
                } />
                <Route path="meals/detailmeal/:mealId" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <DetailMealPage />
                    </ProtectedRoute>
                } />
                <Route path="/tables" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <TableTypePage />
                    </ProtectedRoute>
                } />
                <Route path="/account" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <AccountPage />
                    </ProtectedRoute>
                } />

                <Route path="/createtabletype" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <CreateTableTypePage />
                    </ProtectedRoute>
                } />
                <Route path="/createtable" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <CreateTablePage />
                    </ProtectedRoute>
                } />
                <Route path="/vouchers" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <VoucherPage />
                    </ProtectedRoute>
                } />
                <Route path="/createvoucher" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <CreateVoucherPage />

                    </ProtectedRoute>
                } />
                <Route path="/bookings" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <BookingPage />
                    </ProtectedRoute>
                } />
                <Route path="bookings/bookingdetail/:bookId" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <DetailBookingPage />
                    </ProtectedRoute>
                } />
                <Route path="/arrangebooking/:BookingId" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <ArrangeBookPage />
                    </ProtectedRoute>
                } />
                <Route path="/tableorder/:tableId" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <OrderDetailPage />
                    </ProtectedRoute>
                } />
                <Route path="/orders" element={
                    <ProtectedRoute requiredRoles={['Boss']}>
                        <OrderPage />
                    </ProtectedRoute>
                } />
                <Route path="/order/create" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <CreateOrderPage />
                    </ProtectedRoute>
                } />
                <Route path="/orders/:tableId" element={
                    <ProtectedRoute requiredRoles={['Boss']}>
                        <OrderDetailPage />
                    </ProtectedRoute>
                } />
                <Route path="/tables/TableStatusEmpty" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <AssignCustomerPage />
                    </ProtectedRoute>
                } />
                <Route path="/bills" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <BillPage />
                    </ProtectedRoute>
                } />
                <Route path="/bill/detailbill/:billId" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <BillDetailPage />
                    </ProtectedRoute>
                } />
                <Route path="/account/changePassword" element={
                    <ProtectedRoute requiredRoles={[]}>
                        <ChangePasswordPage />
                    </ProtectedRoute>
                } />


            </Routes>
        </>
    )
}

export default Controller;