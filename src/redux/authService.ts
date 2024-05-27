import { loginSuccess, logoutSuccess } from "./authSlice";
import axios from "axios";
import { store } from "./store";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
const AUTH_STORAGE_KEY = "auth";

export const authService = {
  async login(userData: {
    username: string;
    password: string;
    rememberMe: boolean;
  }) {
    const response = await axios.post(`${BASE_URL}/login`, {
      username: userData.username,
      password: userData.password,
    });
    const user = response.data;
    store.dispatch(loginSuccess(user));
    if (userData.rememberMe) {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ user, isAuth: true }),
      );
    } else {
      sessionStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ user, isAuth: true }),
      );
    }
  },
  async logout() {
    logoutSuccess();
    store.dispatch(logoutSuccess());
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  },
  async isAuthenticated() {
    const isAuth = store.getState().auth.isAuthenticated;
    return isAuth;
  },
};
