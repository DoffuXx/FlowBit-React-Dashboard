/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const login = createAsyncThunk(
  "auth/login",
  async (
    {
      username,
      password,
    }: {
      username: string;
      password: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/login`,
        { username, password },
        config,
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      console.log(data.token);
      return data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
