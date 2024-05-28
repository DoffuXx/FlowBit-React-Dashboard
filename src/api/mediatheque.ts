/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
import { AxiosError } from "axios";
import { Media, PageInfo } from "./types";
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
    let url = `${BASE_URL}/media?page=${pageInfoCurrent}`;
    if (beforeDate.length > 0) {
      url = `${BASE_URL}/media?createdAt[before]=${beforeDate}&page=${pageInfoCurrent}`;
    }
    if (afterDate.length > 0) {
      url = `${BASE_URL}/media?createdAt[after]=${afterDate}&page=${pageInfoCurrent}`;
    }
    if (beforeDate.length > 0 && afterDate.length > 0) {
      url = `${BASE_URL}/media?createdAt[before]=${beforeDate}&createdAt[after]=${afterDate}&page=${pageInfoCurrent}`;
    }
    if (search) {
      url = `${BASE_URL}/media?name=${search}&page=${pageInfoCurrent}`;
    }
    if (search && beforeDate.length > 0) {
      url = `${BASE_URL}/media?name=${search}&createdAt[before]=${beforeDate}&page=${pageInfoCurrent}`;
    }
    if (search && afterDate.length > 0) {
      url = `${BASE_URL}/media?name=${search}&createdAt[after]=${afterDate}&page=${pageInfoCurrent}`;
    }
    if (search && beforeDate.length > 0 && afterDate.length > 0) {
      url = `${BASE_URL}/media?name=${search}&createdAt[before]=${beforeDate}&createdAt[after]=${afterDate}&page=${pageInfoCurrent}`;
    }
    const response = await axios.get(url);
    const medias = response.data["hydra:member"];
    setMedias(medias);
    setPageInfo({
      currentPage: pageInfoCurrent,
      totalItems: response.data["hydra:totalItems"],
      nextPage: response.data["hydra:view"]?.["hydra:next"] || null,
      prevPage: response.data["hydra:view"]?.["hydra:previous"] || null,
    });
    setLoading(false);
    setError("");
  } catch (error) {
    console.log(error);
    setLoading(false);
    setError("Quelque chose s'est mal passé");
  }
};

export const fetchMediatheque = async (
  id: string,
  setMedia: (value: Media) => void,
  setMediaTitle: (value: string) => void,
  setMediaType: (value: string) => void,
) => {
  try {
    const response = await axios.get(`${BASE_URL}/media/${id}`);
    const media = response.data;
    setMediaTitle(media.name);
    setMediaType(media.mediaType);
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
