/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AxiosError } from "axios";
import { Discours, Discourss } from "./types";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchDiscours = async (setDiscours: (value: any) => void) => {
  try {
    const response = await axios.get(`${BASE_URL}/discours`);
    const discours = response.data["hydra:member"];
    setDiscours(discours);
  } catch (error) {
    console.error(error);
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
      navigate("/dashboard/discours");
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
