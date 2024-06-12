/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { fetchCoordonnee, updateCoordonne } from "@/api/coordonnee";
import { Coordonnee } from "@/api/types";

import {
  BreadCrumb,
  Button,
  Loading,
  Success,
  Error,
  TitlePage,
} from "@components/common";
import { ProgressContext } from "@/provider/ProgressProvider";
const ContactDetailes = () => {
  const { setProgress } = useContext(ProgressContext);
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
    setProgress(100);
    fetchCoordonnee(setCoordonnee, setLoading, setError);
    return () => {
      setProgress(0);
    };
  }, []);

  return (
    <>
      <div className="">
        <BreadCrumb layer1="Contact details" />
      </div>
      <div className="mt-6">
        <div className="mt-4">
          {loading && <Loading />}
          {success && <Success success={success} />}
          {error && (
            <Error
              error={{
                error: error,
              }}
            />
          )}
        </div>

        <TitlePage title="Modifier les Coordonnées" />
        <div className="block  rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 ">
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm    text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              value={coordonnee.numero}
              onChange={(e) =>
                setCoordonnee({ ...coordonnee, numero: e.target.value })
              }
              required
            />

            <label
              htmlFor="floating_email"
              className="peer-focus: absolute top-3 -z-10  origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              Phone number{" "}
            </label>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm    text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              value={coordonnee.email}
              onChange={(e) =>
                setCoordonnee({ ...coordonnee, email: e.target.value })
              }
              required
            />
            <label
              htmlFor="floating_email"
              className="absolute top-3 -z-10 origin-[0]  -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              Email
            </label>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="text"
              name="floating_localisation"
              id="floating_localisation"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm  text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
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
              className="absolute top-3 -z-10 origin-[0]  -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              Localisation
            </label>
          </div>

          <Button Text="Update" onClick={handleUpdate}></Button>
        </div>
      </div>
    </>
  );
};

export default ContactDetailes;
