import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography } from "@mui/material";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <NavLink
          to="/admin/dashboard"
          className="mb-3 hover:bg-indigo-600 p-2 rounded"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/products"
          className="mb-3 hover:bg-indigo-600 p-2 rounded"
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/orders"
          className="mb-3 hover:bg-indigo-600 p-2 rounded"
        >
          Orders
        </NavLink>
        <NavLink
          to="/admin/users"
          className="mb-3 hover:bg-indigo-600 p-2 rounded"
        >
          Users
        </NavLink>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar using MUI */}
        <AppBar position="static" className="bg-white text-black shadow-md">
          <Toolbar className="justify-between">
            <Typography variant="h6">Admin Dashboard</Typography>
            <Typography variant="body1">
              Logged in as <strong>{user?.name}</strong>
            </Typography>
          </Toolbar>
        </AppBar>

        <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
