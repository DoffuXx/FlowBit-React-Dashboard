/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
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

export const fetchMediatheques = async (setMedias: (value: any) => void) => {
  try {
    const response = await axios.get(`${BASE_URL}/media`);
    const medias = response.data["hydra:member"];
    console.log(medias);
    setMedias(medias);
  } catch (error) {
    console.log(error);
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

export const deleteMediatheque = async (
  id: number,
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
