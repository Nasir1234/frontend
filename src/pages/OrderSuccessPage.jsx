import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderSuccessPage = () => {
  const { orderId } = useParams();

  return (
    <Box className="flex items-center justify-center min-h-[70vh] p-4">
      <Paper sx={{borderRadius: "18px"}} elevation={3} className="p-8 max-w-lg w-full text-center space-y-4">
        <CheckCircleIcon sx={{ fontSize: 60, color: "green" }} />
        <Typography variant="h4" fontWeight={600}>
          Order Placed Successfully!
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Thank you for your purchase. Your order ID is:
        </Typography>
        <Typography variant="h6" fontWeight={500}>
          {orderId}
        </Typography>

        <Box className="mt-6 space-x-3">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
          >
            Continue Shopping
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to={`/orders/${orderId}`}
          >
            View Order Details
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderSuccessPage;
