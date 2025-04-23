import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../redux/api/orderApi";
import { format } from "date-fns";

const OrderDetailPage = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError, error } = useGetOrderByIdQuery(id);

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center min-h-[40vh]">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className="text-center text-red-600 mt-10">
        <Typography variant="h6">
          {error?.data?.message || "Order not found"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="max-w-5xl mx-auto p-4 space-y-6">
      <Typography variant="h5" className="font-bold">
        Order #{order._id}
      </Typography>

      {/* Shipping */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Shipping Address
          </Typography>
          <Typography>
            {order.shippingAddress?.fullName}, {order.shippingAddress?.address},{" "}
            {order.shippingAddress?.city}, {order.shippingAddress?.postalCode},{" "}
            {order.shippingAddress?.country}
          </Typography>
          <Chip
            label={
              order.isDelivered
                ? `Delivered on ${format(new Date(order.deliveredAt), "PPP")}`
                : "Not Delivered"
            }
            color={order.isDelivered ? "success" : "warning"}
            className="mt-2"
          />
        </CardContent>
      </Card>

      {/* Payment */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Payment Method
          </Typography>
          <Typography>{order.paymentMethod}</Typography>
          <Chip
            label={
              order.isPaid
                ? `Paid on ${format(new Date(order.paidAt), "PPP")}`
                : "Not Paid"
            }
            color={order.isPaid ? "success" : "warning"}
            className="mt-2"
          />
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>
          {order.orderItems?.map((item) => (
            <Grid
              container
              key={item._id}
              spacing={2}
              className="border-b py-2 items-center"
            >
              <Grid item xs={2}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full rounded"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{item.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  {item.quantity} x ${item.price.toFixed(2)} = $
                  {(item.quantity * item.price).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Divider className="my-2" />
          <Box className="flex justify-between">
            <Typography>Items:</Typography>
            <Typography>${order.itemsPrice.toFixed(2)}</Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography>Shipping:</Typography>
            <Typography>${order.shippingPrice.toFixed(2)}</Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography>Tax:</Typography>
            <Typography>${order.taxPrice.toFixed(2)}</Typography>
          </Box>
          <Box className="flex justify-between font-bold mt-2">
            <Typography>Total:</Typography>
            <Typography>${order.totalPrice.toFixed(2)}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderDetailPage;
