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
import TablePage from "./pages/table-page/tables";
import TableTypesPage from "./pages/tabletype-page/tabletypes";
import CreateTableTypePage from "./pages/tabletype-page/createtabletype";

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
                    <ProtectedRoute requiredRoles={['Boss', 'Manager']}>
                        <DetailEmployeePage />
                    </ProtectedRoute>
                } />
                <Route path="/customers" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Receptionist']}>
                        <CustomerPage />
                    </ProtectedRoute>
                } />

                <Route path="/meals" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Waiter']}>
                        <MealPage />
                    </ProtectedRoute>
                } />
                <Route path="/createmeal" element={
                    <ProtectedRoute requiredRoles={['Boss']}>
                        <CreateMealPage />
                    </ProtectedRoute>
                } />
                <Route path="meals/updatemeal/:mealId" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager']}>
                        <UpdateMealPage />
                    </ProtectedRoute>
                } />
                <Route path="meals/detailmeal/:mealId" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Waiter']}>
                        <DetailMealPage />
                    </ProtectedRoute>
                } />
                <Route path="/tables" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Receptionist']}>
                        <TablePage />
                    </ProtectedRoute>
                } />
                <Route path="/tabletypes" element={
                    <ProtectedRoute requiredRoles={['Boss']}>
                        <TableTypesPage />
                    </ProtectedRoute>
                } />
                <Route path="/account" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Receptionist', 'Waiter', 'Cashier']}>
                        <AccountPage />
                    </ProtectedRoute>
                } />

                <Route path="/createtabletype" element={
                    <ProtectedRoute requiredRoles={['Boss']}>
                        <CreateTableTypePage />
                    </ProtectedRoute>
                } />
                <Route path="/createtable" element={
                    <ProtectedRoute requiredRoles={['Boss']}>
                        <CreateTablePage />
                    </ProtectedRoute>
                } />
                <Route path="/vouchers" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Receptionist', 'Waiter', 'Cashier']}>
                        <VoucherPage />
                    </ProtectedRoute>
                } />
                <Route path="/createvoucher" element={
                    <ProtectedRoute requiredRoles={['Boss']}>
                        <CreateVoucherPage />

                    </ProtectedRoute>
                } />
                <Route path="/bookings" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Receptionist']}>
                        <BookingPage />
                    </ProtectedRoute>
                } />
                <Route path="bookings/bookingdetail/:bookId" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Receptionist']}>
                        <DetailBookingPage />
                    </ProtectedRoute>
                } />
                <Route path="/arrangebooking/:BookingId" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Receptionist']}>
                        <ArrangeBookPage />
                    </ProtectedRoute>
                } />
                <Route path="/tableorder/:tableId" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Waiter', 'Cashier']}>
                        <OrderDetailPage />
                    </ProtectedRoute>
                } />
                <Route path="/orders" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Waiter', 'Cashier']}>
                        <OrderPage />
                    </ProtectedRoute>
                } />
                <Route path="/order/create" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Waiter']}>
                        <CreateOrderPage />
                    </ProtectedRoute>
                } />
                <Route path="/orders/:tableId" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Waiter', 'Cashier']}>
                        <OrderDetailPage />
                    </ProtectedRoute>
                } />
                <Route path="/tables/TableStatusEmpty" element={
                    <ProtectedRoute requiredRoles={['Receptionist', 'Boss', 'Manager']}>
                        <AssignCustomerPage />
                    </ProtectedRoute>
                } />
                <Route path="/bills" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Cashier']}>
                        <BillPage />
                    </ProtectedRoute>
                } />
                <Route path="/bill/detailbill/:billId" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Cashier']}>
                        <BillDetailPage />
                    </ProtectedRoute>
                } />
                <Route path="/account/changePassword" element={
                    <ProtectedRoute requiredRoles={['Boss', 'Manager', 'Waiter', 'Receptionist', 'Cashier']}>
                        <ChangePasswordPage />
                    </ProtectedRoute>
                } />


            </Routes>
        </>
    )
}

export default Controller;