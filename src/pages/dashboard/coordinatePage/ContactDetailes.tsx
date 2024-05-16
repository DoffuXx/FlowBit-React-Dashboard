import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa";
import { fetchCoordonnee, updateCoordonne } from "../../../api/coordonnee";
import { Coordonnee } from "../../../api/types";

import {
  BreadCrumb,
  Button,
  Loading,
  Success,
  Error,
  TitlePage,
} from "../../../components/common";
const ContactDetailes = () => {
  const [coordonnee, setCoordonnee] = useState({} as Coordonnee);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async (e: any) => {
    setSuccess("");
    e.preventDefault();
    setLoading(true);
    if (
      !coordonnee.numero ||
      !coordonnee.email ||
      !coordonnee.localisation ||
      !coordonnee.facebook ||
      !coordonnee.instagram ||
      !coordonnee.twitter
    ) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }
    updateCoordonne(coordonnee);
    setLoading(false);
    setSuccess("Coordonnée modifié avec succès");
  };

  useEffect(() => {
    fetchCoordonnee(setCoordonnee, setLoading, setError, setSuccess);
  }, []);

  return (
    <>
      <div className="">
        <BreadCrumb layer1="Coordonnées" />
      </div>
      <div className="mt-6">
        <div className="mt-4">
          {loading && <Loading />}
          {success && <Success success={success} />}
          {error && <Error error={error} />}
        </div>

        <TitlePage title="Modifier les Coordonnées" />
        <div className="block  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={coordonnee.numero}
              onChange={(e) =>
                setCoordonnee({ ...coordonnee, numero: e.target.value })
              }
              required
            />

            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Numéro de téléphone{" "}
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={coordonnee.email}
              onChange={(e) =>
                setCoordonnee({ ...coordonnee, email: e.target.value })
              }
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_localisation"
              id="floating_localisation"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={coordonnee.localisation}
              onChange={(e) =>
                setCoordonnee({
                  ...coordonnee,
                  localisation: e.target.value,
                })
              }
              required
            />
            <label
              htmlFor="floating_localisation"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Localisation
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="Facebook"
              name="floating_facebook"
              id="floating_facebook"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={coordonnee.facebook}
              onChange={(e) =>
                setCoordonnee({
                  ...coordonnee,
                  facebook: e.target.value,
                })
              }
              required
            />
            <label
              htmlFor="floating_facebook"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Facebook
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_instagram"
              id="floating_instagram"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={coordonnee.instagram}
              onChange={(e) =>
                setCoordonnee({
                  ...coordonnee,
                  instagram: e.target.value,
                })
              }
              required
            />
            <label
              htmlFor="floating_instagram"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Instagram
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_twitter"
              id="floating_twitter"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={coordonnee.twitter}
              onChange={(e) =>
                setCoordonnee({
                  ...coordonnee,
                  twitter: e.target.value,
                })
              }
              required
            />
            <label
              htmlFor="floating_twitter"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Twitter
            </label>
          </div>
          <Button Text="Modifier" onClick={handleUpdate}></Button>
        </div>
      </div>
    </>
  );
};

export default ContactDetailes;
