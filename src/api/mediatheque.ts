/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
import { AxiosError } from "axios";
import { Media } from "./types";
const DURATION = 2000;

export const handleSubmit = async (
  form: FormData,
  setSuccess: (value: string) => void,
  setError: (value: string) => void,
  navigate: (value: string) => void,
) => {
  setSuccess("");
  setError("");
  try {
    await axios.post(`${BASE_URL}/mediaPost`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setSuccess("Votre média a bien été ajouté");
    setError("");
    setTimeout(() => {
      navigate("/mediatheque");
    }, DURATION);
  } catch (error) {
    console.error(error);
    setError("Quelque chose s'est mal passé !");
    setSuccess("");
  }
};

export const fetchMediatheques = async (
  setMedias: (value: any) => void,
  setLoading: (value: boolean) => void,
) => {
  try {
    setLoading(true);
    const response = await axios.get(`${BASE_URL}/media`);
    const medias = response.data["hydra:member"];
    setMedias(medias);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

export const fetchMediatheque = async (
  id: string,
  setMedia: (value: Media) => void,
  setMediaTitle: (value: string) => void,
) => {
  try {
    const response = await axios.get(`${BASE_URL}/media/${id}`);
    const media = response.data;
    setMediaTitle(media.name);
    setMedia(media);
  } catch (error) {
    console.log(error);
  }
};

export const updateMediatheque = async (
  id: string,
  formData: FormData,
  setSuccess: (value: string) => void,
  setError: (value: string) => void,
  navigate: (value: string) => void,
) => {
  setSuccess("");
  setError("");
  try {
    await axios.post(`${BASE_URL}/mediaUpdate/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setSuccess("Votre média a bien été modifié");
    setError("");
    setTimeout(() => {
      navigate("/mediatheque");
    }, DURATION);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      setSuccess("");
      setError("Quelque chose s'est mal passé !");
      throw new Error(
        error.response.data.message || "Quelque chose s'est mal passé !",
      );
    }
  }
};

export const deleteMediatheque = async (
  id: string,
  setSuccess: (value: string) => void,
  setLoading: (value: boolean) => void,
  setMedias: (value: any) => void,
) => {
  try {
    setLoading(true);
    axios.delete(`${BASE_URL}/media/${id}`);
    setSuccess("Votre média a bien été supprimé");
    setLoading(false);
    setMedias((medias: any) => medias.filter((media: any) => media.id !== id));
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
