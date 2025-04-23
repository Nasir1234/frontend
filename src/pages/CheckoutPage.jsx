import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Box, Grid, Paper } from "@mui/material";
import axios from "axios";
import { clearCart } from "../redux/cartSlice";

const CheckoutPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.images?.[0]?.url || "",
        })),
        shippingAddress: {
          fullName: shippingInfo.fullName,
          address: shippingInfo.address,
          phone: shippingInfo.phone,
        },
        paymentMethod: "Cash on Delivery", // Or handle this via UI
        itemsPrice: Number(totalPrice),
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: Number(totalPrice),
      };

      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `http://localhost:5000/api/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(clearCart());
      navigate(`/order-success/${data._id}`);
    } catch (error) {
      console.error("Order failed:", error);
      alert("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="container mx-auto p-4">
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Shipping Info */}
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>

            <form className="space-y-4">
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={shippingInfo.address}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleChange}
              />
            </form>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>

            {cartItems.map((item) => (
              <Box key={item._id} className="flex justify-between my-2">
                <Typography>
                  {item.name} × {item.quantity}
                </Typography>
                <Typography>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}

            <Box className="flex justify-between border-t pt-2 mt-4">
              <Typography className="font-semibold">Total</Typography>
              <Typography className="font-semibold">${totalPrice}</Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
