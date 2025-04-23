import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileThunk } from "../redux/features/auth/authThunks";
import {
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((f) => ({ ...f, name: user.name, email: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileThunk(formData));
  };

  return (
    <Paper sx={{borderRadius: "20px"}}
      elevation={3}
      className="max-w-lg mx-auto mt-20 p-6 bg-gray-50 shadow-md rounded-md"
    >
      <Typography variant="h4" component="h2" className="mb-6 font-semibold text-center">
        My Profile
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-2 mt-3">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="New Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          placeholder="Leave blank to keep current"
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          className="bg-indigo-600 hover:bg-indigo-700"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Paper>
  );
};

export default Profile;
