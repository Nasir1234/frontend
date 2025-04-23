import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Button,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetUserOrdersQuery } from "../redux/api/orderApi"; // adjust path

const OrderHistoryPage = () => {
  const { data: orders, isLoading, error } = useGetUserOrdersQuery();

  return (
    <Box className="p-4 min-h-[70vh]">
      <Typography variant="h5" fontWeight={600} gutterBottom>
        My Orders
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Failed to load orders</Typography>
      ) : orders?.length === 0 ? (
        <Typography>No orders found</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id.substring(0, 8)}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    {order.isDelivered ? (
                      <Typography color="success.main">Delivered</Typography>
                    ) : (
                      <Typography color="warning.main">Pending</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/orders/${order._id}`}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default OrderHistoryPage;
