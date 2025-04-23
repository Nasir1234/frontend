import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import OAuthRedirect from "../pages/OAuthRedirect";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import PrivateRoute from "../components/PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import AdminRoute from "../components/AdminRoute";
import AdminDashboard from "../features/admin/AdminDashboard";
import AdminProducts from "../features/admin/AdminProducts";
import AdminOrders from "../features/admin/AdminOrders";
import AdminUsers from "../features/admin/AdminUsers";
import EditProduct from "../features/admin/EditProduct";
import CreateProduct from "../features/admin/CreateProduct";
import ProductSearch from "../pages/ProductSearch";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import ProductList from "../pages/ProductList";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout Pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductList />} />
        </Route>

        {/* Standalone Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/google/callback" element={<OAuthRedirect />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/order-success/:orderId"
            element={<OrderSuccessPage />}
          />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="products/create" element={<CreateProduct />} />
            <Route path="products/search" element={<ProductSearch />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
