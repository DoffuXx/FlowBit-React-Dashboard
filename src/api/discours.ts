/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AxiosError } from "axios";
import { Discours, Discourss, PageInfo } from "./types";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchDiscours = async (
  setDiscours: (value: any) => void,
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
    let url = `${BASE_URL}/discours?page=${pageInfoCurrent}`;
    if (beforeDate.length > 0) {
      url = `${BASE_URL}/discours?createdAt[before]=${beforeDate}&page=${pageInfoCurrent}`;
    }
    if (afterDate.length > 0) {
      url = `${BASE_URL}/discours?createdAt[after]=${afterDate}&page=${pageInfoCurrent}`;
    }
    if (beforeDate.length > 0 && afterDate.length > 0) {
      url = `${BASE_URL}/discours?createdAt[before]=${beforeDate}&createdAt[after]=${afterDate}&page=${pageInfoCurrent}`;
    }
    if (search) {
      url = `${BASE_URL}/discours?title=${search}&page=${pageInfoCurrent}`;
    }
    if (search && beforeDate.length > 0) {
      url = `${BASE_URL}/discours?title=${search}&createdAt[before]=${beforeDate}&page=${pageInfoCurrent}`;
    }
    if (search && afterDate.length > 0) {
      url = `${BASE_URL}/discours?title=${search}&createdAt[after]=${afterDate}&page=${pageInfoCurrent}`;
    }
    if (search && beforeDate.length > 0 && afterDate.length > 0) {
      url = `${BASE_URL}/discours?title=${search}&createdAt[before]=${beforeDate}&createdAt[after]=${afterDate}&page=${pageInfoCurrent}`;
    }
    const response = await axios.get(url);
    const discours = response.data["hydra:member"];
    setDiscours(discours);
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
    setError("Quelque chose s'est mal passé");
  }
};

export const handleSubmit = async (
  e: any,
  // title,
  // content,
  // coverImage,
  form: FormData,
  setLoading: (value: any) => void,
  setError: (value: string) => void,
  setSuccess: (value: string) => void,
  navigate: (value: string) => void,
) => {
  e.preventDefault();
  setLoading(true);
  setSuccess("");
  setError("");
  try {
    await axios.post(`${BASE_URL}/discoursPost`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setSuccess("Discours ajouté avec succès");
    setLoading(false);
    setError("");
    setTimeout(() => {
      navigate("/discours");
    }, 500);
  } catch (error) {
    console.error(error);
    setError("Echec de l'ajout du discours");
    setSuccess("");
    setLoading(false);
  }
};

export const fetchDiscoursById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/discours/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const handleUpdate = async (id: string, discours: Discours) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/discoursUpdate/${id}`,
      {
        title: discours.title,
        content: discours.content,
        titreArabe: discours.titreArabe,
        contenuArabe: discours.contenuArabe,
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

export const handleDelete = async (
  id: string,
  setLoading: (value: boolean) => void,
  setSuccess: (value: string) => void,
  setError: (value: string) => void,
  setDiscours: (value: any) => void,
) => {
  setLoading(true);
  setError("");
  setSuccess("");
  try {
    axios.delete(`${BASE_URL}/discours/${id}`);
    setSuccess("Discours supprimé avec succès");
    setError("");
    setLoading(false);
    setDiscours((discours: Discourss) =>
      discours.filter((discour) => discour.id !== id),
    );
  } catch (error) {
    setError("Quelque chose s'est mal passé");
    setLoading(false);
    setSuccess("");
  }
};
