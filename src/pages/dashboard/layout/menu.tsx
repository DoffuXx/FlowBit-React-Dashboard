import { FaAddressBook, FaBlog, FaHome, FaInbox } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";
import { RiFilePaperFill } from "react-icons/ri";

export const navLinks = [
  { path: "/", icon: FaHome, text: "Tableau de bord" },
  { path: "/articles", icon: FaBlog, text: "Articles" },
  { path: "/discours", icon: RiFilePaperFill, text: "Discours" },
  { path: "/mediatheque", icon: MdPermMedia, text: "Médiathèque" },
  { path: "/coordonnées", icon: FaAddressBook, text: "Coordonnées" },
  { path: "/messages", icon: FaInbox, text: "Boîte de réception" },
];
