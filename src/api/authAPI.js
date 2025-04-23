import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const loginUser = async (formData) => {
  const res = await axiosInstance.post("/auth/login", formData);
  return res.data;
};

export const registerUser = async (formData) => {
  const res = await axiosInstance.post("/auth/register", formData);
  return res.data;
};

export const getGoogleLoginURL = () => {
  return `${BASE_URL}/auth/google`;
};

export const getUserProfile = async (token) => {
  const res = await axios.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateUserProfile = async (formData, token) => {
  const res = await axios
    .create({
      baseURL: BASE_URL,
    })
    .put("/auth/profile", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  return res.data;
};
