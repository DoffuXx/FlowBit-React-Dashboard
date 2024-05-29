import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    });
    const { data } = response;
    const token = data.token;
    console.log(token);
  } catch (error) {
    console.error(error);
  }
};

export const changeCredentials = async (
  username: string,
  password: string,
  oldpassword: string,
  user: { username: string; password: string; id: string },
  setSuccess: (value: string) => void,
  setError: (value: string) => void,
  setLoading: (value: boolean) => void,
) => {
  try {
    setLoading(true);
    setSuccess("");
    setError("");
    await axios.put(`${BASE_URL}/changecredentials/${user.id}`, {
      username,
      password,
      oldpassword,
    });
    setSuccess(" Credentials changed successfully");
    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
    setSuccess("");
    setError("Error changing credentials");
  }
};
