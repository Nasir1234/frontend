import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { token } = useSelector((state) => state.auth);

  // If not logged in, redirect to Login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
