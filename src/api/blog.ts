/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AxiosError } from "axios";
const BASE_URL = process.env.VITE_REACT_APP_API_URL;
const auth = localStorage.getItem("auth") || sessionStorage.getItem("auth");
const user = JSON.parse(auth!);

import { Article, Articles, PageInfo } from "./types";

export const deleteArticle = async (
  id: number,
  setLoading: (value: boolean) => void,
  setSuccess: (value: string) => void,
  setError: (value: string) => void,
  setArticles: (value: any) => void,
) => {
  setLoading(true);
  setError("");
  setSuccess("");
  try {
    await axios.delete(`${BASE_URL}/post/${id}`, {
      headers: {
        Authorization: user.user.token,
      },
    });
    setSuccess("Article successfully deleted");
    setLoading(false);
    setArticles((articles: Articles) =>
      articles.filter((article) => article.id !== id),
    );
  } catch (error) {
    setError("Failed to delete article");
    setLoading(false);
    setSuccess("");
  }
};

export const fetchArticles = async (
  setArticles: (value: any) => void,
  setLoading: (value: boolean) => void,
  setError: (value: string) => void,
  pageInfoCurrent: number,
  setPageInfo: ({
    currentPage,
    totalItems,
    nextPage,
    prevPage,
  }: PageInfo) => void,
  beforeDate: string,
  afterDate: string,
  search?: string,
) => {
  try {
    setLoading(true);
    const url = `${BASE_URL}/posts`;
    const response = await axios.get(url);
    const articles = response.data;
    setArticles(articles);
    setPageInfo({
      currentPage: pageInfoCurrent,
      totalItems: response.data["hydra:totalItems"],
      nextPage: response.data["hydra:view"]?.["hydra:next"] || null,
      prevPage: response.data["hydra:view"]?.["hydra:previous"] || null,
    });
    setLoading(false);
    setError("");
  } catch (error) {
    console.error(error);
    setLoading(false);
    setError("An error has occurred");
  }
};

export const handleSubmit = async (
  e: any,
  form: FormData,
  setError: (value: string) => void,
  setSuccess: (value: string) => void,
  setTitle: (value: string) => void,
  setContent: (value: string) => void,
  setCoverImage: (value: any) => void,
  navigate: (value: string) => void,
) => {
  e.preventDefault();
  if (!form.get("title") || !form.get("content") || !form.get("coverImage")) {
    setError("please complete all fields");
    return;
  }
  setError("");
  setSuccess("");
  try {
    await axios.post(`${BASE_URL}/post`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setSuccess("Article added successfully");
    setError("");
    setTitle("");
    setTitreArabe("");
    setContentArabe("");
    setContent("");
    setCoverImage(null);
    setTimeout(() => {
      navigate("/articles");
    }, 500);
  } catch (error) {
    console.error(error);
    setError("Failed to add item");
    setSuccess("");
  }
};

export const handleUpdate = async (id: string, article: Article) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/posts/${id}`,
      {
        title: article.title,
        content: article.content,
        created_at: article.createdAt,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      console.error(error);
      throw new Error(error.response.data.message || "Something went wrong !");
    }
  }
};

export const fetchArticle = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      console.error(error);
      throw new Error(error.response.data.message || "Something went wrong !");
    }
  }
};
