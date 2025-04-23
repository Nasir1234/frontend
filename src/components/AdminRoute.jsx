import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" replace />;
  if (user?.isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default AdminRoute;
