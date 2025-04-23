import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { PersonAdd as PersonAddIcon, Google as GoogleIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../redux/features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import { getGoogleLoginURL } from '../api/authAPI';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerThunk(formData));
  };

  const handleGoogleRegister = () => {
    window.location.href = getGoogleLoginURL();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Paper sx={{borderRadius: "20px"}} elevation={3} className="w-full max-w-md p-8 rounded-md">
        <Typography variant="h4" align="center" gutterBottom>
          Create a new Account
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <TextField
            name="name"
            label="Full Name"
            type="text"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
          />
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

          {error && <Typography className="text-red-500 text-sm">{error}</Typography>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<PersonAddIcon />}
            disabled={loading}
            sx={{ textTransform: 'none' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>

          <Button
            type="button"
            onClick={handleGoogleRegister}
            variant="contained"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              backgroundColor: '#DB4437',
              '&:hover': { backgroundColor: '#c23321' },
              textTransform: 'none',
            }}
          >
            Sign up with Google
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Register;
