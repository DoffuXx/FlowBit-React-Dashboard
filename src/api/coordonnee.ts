import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
import { CoordonneeProps, Coordonnee } from "./types";

export const fetchCoordonnee = async (
  setCoordonnee: (value: Coordonnee) => void,
  setLoading: (value: boolean) => void,
  setError: (value: string) => void,
  setSuccess: (value: string) => void,
) => {
  try {
    setLoading(true);
    const response = await axios.get(`${BASE_URL}/coordonnee/`);
    if (response.status === 200) {
      setLoading(false);
    } else {
      setLoading(false);
      setError("Une erreur est survenue");
    }
    setCoordonnee(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const updateCoordonne = async (Coordonnee: Coordonnee) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/coordonnee/edit`,
      {
        numero: Coordonnee.numero,
        email: Coordonnee.email,
        localisation: Coordonnee.localisation,
        facebook: Coordonnee.facebook,
        instagram: Coordonnee.instagram,
        twitter: Coordonnee.twitter,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response.data.message || "Quelque chose s'est mal passé !",
    );
  }
};
