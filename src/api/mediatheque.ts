/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
import { AxiosError } from "axios";
import { Media } from "./types";

export const handleSubmit = async (
  form: FormData,
  setSuccess: (value: string) => void,
  setError: (value: string) => void,
) => {
  try {
    const response = await axios.post(`${BASE_URL}/mediaPost`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      setSuccess("Votre média a bien été ajouté");
    } else {
      setError("Une erreur est survenue");
      setSuccess("");
    }
  } catch (error) {
    console.error(error);
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
) => {
  try {
    const response = await axios.get(`${BASE_URL}/media/${id}`);
    const media = response.data;
    setMedia(media);
  } catch (error) {
    console.log(error);
  }
};

export const updateMediatheque = async (id: string, formData: FormData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/mediaUpdate/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
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
