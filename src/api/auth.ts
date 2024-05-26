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
