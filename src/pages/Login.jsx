import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { getGoogleLoginURL } from "../api/authAPI";

// MUI Components
import {
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Google as GoogleIcon, Login as LoginIcon } from "@mui/icons-material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk(formData));
  };

  const handleGoogleLogin = () => {
    window.location.href = getGoogleLoginURL();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Paper
        sx={{ borderRadius: "20px"}}
        elevation={3}
        className="w-full max-w-md p-8 rounded-md"
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login to Your Account
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
          />

          {error && (
            <Typography className="text-red-500 text-sm">{error}</Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            startIcon={<LoginIcon />}
            disabled={loading}
            sx={{ textTransform: "none" }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="contained"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              backgroundColor: "#DB4437",
              "&:hover": { backgroundColor: "#c23321" },
              textTransform: "none",
            }}
          >
            Sign in with Google
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
