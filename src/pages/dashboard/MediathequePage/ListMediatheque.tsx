/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteMediatheque, fetchMediatheques } from "../../../api/mediatheque";

import {
  BreadCrumb,
  Loading,
  Success,
  Button,
  TitlePage,
} from "../../../components/common";
import { Media } from "../../../api/types";

const ListMediatheque = () => {
  const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_HOME;
  const [loading, setLoading] = useState(false);
  const [medias, setMedias] = useState<Media[]>([]);
  const [success, setSuccess] = useState("");
  useEffect(() => {
    fetchMediatheques(setMedias);
  }, []);
  const handleDelete = async (id: number) => {
    await deleteMediatheque(id, setSuccess, setLoading, setMedias);
  };
  return (
    <>
      <div className="">
        <BreadCrumb layer1="Mediatheque" />
      </div>
      <div className="mt-4">
        {loading && <Loading />}
        {success && <Success success={success} />}
      </div>

      <TitlePage title="Accueil des Mediatheque" />
      <div className="flex justify-end">
        <Link to="/mediatheque/create">
          <Button Text="             Ajouter un Mediatheque"></Button>
        </Link>
      </div>
      <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Media
              </th>
              <th scope="col" className="px-6 py-3">
                MediaTitle
              </th>
              <th scope="col" className="px-6 py-3">
                MediaType
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {medias.map((media: any) => (
              <tr key={media.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="grid grid-cols-2 gap-2">
                      {media.files.map((file: any) => (
                        <img
                          className="h-16 rounded-md transition duration-500 ease-in-out hover:scale-[2.5] hover:translate-x-28"
                          src={`${REACT_APP_API_URL}/Media/${file.fileName}`}
                          alt=""
                        />
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{media.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {media.mediaType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`${media.id}`}>
                    <Button Text="Voir" variant="primary"></Button>
                  </Link>
                  <Button
                    Text="Supprimer"
                    variant="danger"
                    onClick={() => handleDelete(media.id)}
                  ></Button>

                  <Link to={`${media.id}/edit`}>
                    <Button variant="secondary" Text="Modifer"></Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4"></div>
    </>
  );
};

export default ListMediatheque;
