import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";

const AdminDashboard = () => {
  // Dummy stats — replace later with API calls
  const [stats] = useState({
    totalUsers: 120,
    totalOrders: 340,
    totalSales: 12900,
    totalProducts: 85,
  });

  useEffect(() => {
    // TODO: Fetch real data from backend
  }, []);

  const dashboardCards = [
    {
      title: "Users",
      value: stats.totalUsers,
      icon: <FaUsers className="text-blue-600 text-3xl" />,
      bg: "bg-blue-100",
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: <FaShoppingCart className="text-green-600 text-3xl" />,
      bg: "bg-green-100",
    },
    {
      title: "Sales",
      value: `$${stats.totalSales.toLocaleString()}`,
      icon: <FaDollarSign className="text-yellow-600 text-3xl" />,
      bg: "bg-yellow-100",
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen className="text-purple-600 text-3xl" />,
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome Admin 👋
      </h1>

      {/* Summary Cards */}
      <Grid container spacing={3}>
        {dashboardCards.map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card className={`${card.bg} shadow-md`}>
              <CardContent className="flex items-center justify-between">
                <div>
                  <Typography variant="subtitle2" className="text-gray-600">
                    {card.title}
                  </Typography>
                  <Typography variant="h5" className="font-bold">
                    {card.value}
                  </Typography>
                </div>
                <div>{card.icon}</div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Sales Overview (Coming Soon)
        </h2>
        <div className="h-64 flex items-center justify-center bg-white rounded shadow">
          <p className="text-gray-500">📊 Chart will be here</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
