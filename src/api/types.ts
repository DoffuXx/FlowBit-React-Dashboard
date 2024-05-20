/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Article {
  contentArabe: any;
  id: number;
  title: string;
  content: string;
  titreArabe: string;
  contenuArabe: string;
  coverImage: string;
  createdAt: Date;
}

export interface Discours {
  id: string;
  title: string;
  content: string;
  titreArabe: string;
  contenuArabe: string;
  coverImage: string;
  createdAt: Date;
}
export interface Articles extends Array<Article> {}

export interface Discourss extends Array<Discours> {}

export interface ArticleProps {
  id: number;
  setLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setSuccess: (value: string) => void;
  setArticles: (value: any) => void;
}

export interface ContactProps {
  id: number;
  setLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setSuccess: (value: string) => void;
  setContacts: (value: any) => void;
}
export interface DiscoursProps {
  id: number;
  setLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setSuccess: (value: string) => void;
}

export interface Contact {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  message: string;
}

export interface Contacts extends Array<Contact> {}

export interface MediathequeProps {
  id: number;
  e: any;
  form: FormData;
  setLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setSuccess: (value: string) => void;
}
export interface Media {
  id: number;
  name: string;
  mediaType: string;
  files: { fileName: string; id: string; media: string }[];
}
export interface Coordonnee {
  id: number;
  numero: string;
  email: string;
  localisation: string;
  facebook: string;
  instagram: string;
  twitter: string;
}
export interface CoordonneeProps {
  setLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setSuccess: (value: string) => void;
  setCoordonnee: (value: Coordonnee) => void;
}
