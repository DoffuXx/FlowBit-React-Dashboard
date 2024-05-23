/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AxiosError } from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
import { Contacts, PageInfo } from "./types";
export const deleteMessage = async (
  id: string,
  setLoading: (value: boolean) => void,
  setError: (value: string) => void,
  setSuccess: (value: string) => void,
  setContacts: (value: any) => void,
) => {
  setLoading(true);
  setError("");
  setSuccess("");
  try {
    await axios.delete(`${BASE_URL}/contacts/${id}`);
    setSuccess("Contact supprimé avec succès");
    setLoading(false);
    setError("");
    setContacts((contacts: Contacts) =>
      contacts.filter((contact) => contact.id !== id),
    );
  } catch (error) {
    console.error(error);
    setError("Échec de la suppression du contact");
    setLoading(false);
    setSuccess("");
  }
};

export const fetchMessages = async (
  setContacts: (value: any) => void,
  setLoading: (value: boolean) => void,
  setError: (value: string) => void,
  pageInfoCurrent: number,
  setPageInfo: ({
    currentPage,
    totalItems,
    nextPage,
    prevPage,
  }: PageInfo) => void,
) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `${BASE_URL}/contacts?page=${pageInfoCurrent}`,
    );
    setContacts(response.data["hydra:member"]);
    setPageInfo({
      currentPage: pageInfoCurrent,
      totalItems: response.data["hydra:totalItems"],
      nextPage: response.data["hydra:view"]?.["hydra:next"] || null,
      prevPage: response.data["hydra:view"]?.["hydra:previous"] || null,
    });
    setLoading(false);
    setError("");
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      console.error(error);
      setLoading(false);
      setError("Quelque chose s'est mal passé !");
      throw new Error(
        error.response.data.message || "Quelque chose s'est mal passé !",
      );
    }
  }
};
