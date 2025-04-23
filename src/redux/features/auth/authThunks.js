import { loginSuccess, loginFail, logout, loginStart } from "./authSlice";
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../../../api/authAPI";

export const loginThunk = (formData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const data = await loginUser(formData);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response?.data || error.message));
  }
};

export const registerThunk = (formData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    await registerUser(formData);
    // Optionally, auto-login after registration
    dispatch(
      loginThunk({ email: formData.email, password: formData.password })
    );
  } catch (error) {
    dispatch(loginFail(error.response?.data || error.message));
  }
};

export const loadUserThunk = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    if (!token) return;

    dispatch(loginStart());
    const data = await getUserProfile(token);
    dispatch(loginSuccess({ user: data.user, token }));
  } catch (error) {
    dispatch(logout());
  }
};

export const updateProfileThunk = (formData) => async (dispatch, getState) => {
  try {
    dispatch(loginStart());
    const { token } = getState().auth;
    const data = await updateUserProfile(formData, token);
    // data.user contains updated info
    dispatch(loginSuccess({ user: data.user, token }));
  } catch (error) {
    dispatch(loginFail(error.response?.data || error.message));
  }
};
