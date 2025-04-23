import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  updateCartQuantity,
} from "../redux/cartSlice";
import { Button, Grid, IconButton, Typography, Box } from "@mui/material";
import { Delete } from "@mui/icons-material";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ id, quantity }));
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Box className="container mx-auto p-4">
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Box
                  className="flex items-center bg-white p-4 shadow-md rounded-lg"
                  sx={{ borderBottom: "1px solid #eee" }}
                >
                  <img
                    src={item.images?.[0]?.url}
                    alt={item.name}
                    className="w-20 h-20 object-contain mr-4"
                  />
                  <Box className="flex-grow">
                    <Typography variant="body1" className="font-semibold">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ${item.price.toFixed(2)}
                    </Typography>
                    <Box className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Typography>{item.quantity}</Typography>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </Box>
                  </Box>

                  <IconButton
                    onClick={() => handleRemoveFromCart(item._id)}
                    color="error"
                    aria-label="delete"
                    className="ml-4"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box className="flex justify-between mt-4">
            <Typography variant="h6">
              Total: ${calculateTotalPrice()}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              className="rounded-lg"
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;
