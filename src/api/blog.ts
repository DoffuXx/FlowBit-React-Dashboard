/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AxiosError } from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

import { Article, Articles } from "./types";

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
    await axios.delete(`${BASE_URL}/post/${id}`);
    setSuccess("Article supprimé avec succès");
    setLoading(false);
    setArticles((articles: Articles) =>
      articles.filter((article) => article.id !== id),
    );
  } catch (error) {
    setError("Echec de la suppression de l'article");
    setLoading(false);
    setSuccess("");
  }
};

export const fetchArticles = async (
  setArticles: (value: any) => void,
  setLoading: (value: boolean) => void,
) => {
  try {
    setLoading(true);
    const response = await axios.get(`${BASE_URL}/posts`);
    const articles = response.data["hydra:member"];
    setArticles(articles);
    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};

export const handleSubmit = async (
  e: any,
  form: FormData,
  setError: (value: string) => void,
  setSuccess: (value: string) => void,
  setTitle: (value: string) => void,
  setContent: (value: string) => void,
  setTitreArabe: (value: string) => void,
  setContentArabe: (value: string) => void,
  setCoverImage: (value: any) => void,
  navigate: (value: string) => void,
) => {
  e.preventDefault();
  if (
    !form.get("title") ||
    !form.get("content") ||
    !form.get("coverImage") ||
    !form.get("titreArabe") ||
    !form.get("contenuArabe")
  ) {
    setError("Veuillez remplir tous les champs");
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
    setSuccess("Article ajouté avec succès");
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
    setError("Echec de l'ajout de l'article");
    setSuccess("");
  }
};

export const handleUpdate = async (id: string, article: Article) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/post/${id}`,
      {
        title: article.title,
        content: article.content,
        titreArabe: article.titreArabe,
        contenuArabe: article.contenuArabe,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      console.error(error);
      throw new Error(
        error.response.data.message || "Quelque chose s'est mal passé !",
      );
    }
  }
};

export const fetchArticle = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/post/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      console.error(error);
      throw new Error(
        error.response.data.message || "Quelque chose s'est mal passé !",
      );
    }
  }
};
