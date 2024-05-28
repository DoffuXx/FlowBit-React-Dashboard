import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteMediatheque, fetchMediatheques } from "@/api/mediatheque";

import {
  BreadCrumb,
  Loading,
  Success,
  Button,
  TitlePage,
  Pagination,
  Error,
} from "@components/common";
import { Media, PageInfo } from "@/api/types";
import { ProgressContext } from "@/provider/ProgressProvider";

const ListMediatheque = () => {
  const { setProgress } = useContext(ProgressContext);
  const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_HOME;
  const [loading, setLoading] = useState(false);
  const [medias, setMedias] = useState<Media[]>([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    currentPage: 1,
    totalItems: 0,
    nextPage: null,
    prevPage: null,
  });
  useEffect(() => {
    setProgress(100);
    fetchMediatheques(
      setMedias,
      setLoading,
      setSuccess,
      pageInfo.currentPage,
      setPageInfo,
    );
    return () => {
      setProgress(0);
    };
  }, [setProgress, pageInfo.currentPage]);
  const handleDelete = async (id: string) => {
    await deleteMediatheque(id, setSuccess, setLoading, setMedias);
  };
  const nextPage = async () => {
    if (pageInfo.nextPage) {
      fetchMediatheques(
        setMedias,
        setLoading,
        setError,
        pageInfo.currentPage + 1,
        setPageInfo,
      );
    }
  };

  const prevPage = async () => {
    if (pageInfo.prevPage) {
      fetchMediatheques(
        setMedias,
        setLoading,
        setError,
        pageInfo.currentPage - 1,
        setPageInfo,
      );
    }
  };

  return (
    <>
      <div className="">
        <BreadCrumb layer1="Mediatheque" />
      </div>
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

      <TitlePage title="Accueil des Médiathèque" />
      <div className="flex justify-end">
        <Link to="/mediatheque/create">
          <Button Text="             Ajouter un Médiathèque"></Button>
        </Link>
      </div>
      <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right ">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
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
            {medias.map((media: Media) => (
              <tr key={media.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                      {media.mediaType === "Image"
                        ? media.files.map((file) => (
                            <img
                              className=" rounded-md transition duration-500 ease-in-out hover:translate-x-28 hover:scale-[2.5] sm:h-16 "
                              src={`${REACT_APP_API_URL}/Media/${file.fileName}`}
                              key={file.id}
                              alt=""
                            />
                          ))
                        : media.files?.map((file) => (
                            <video
                              src={`${REACT_APP_API_URL}/Media/${file.fileName}`}
                              controls
                              key={file.id}
                              className="h-44 w-44 rounded-md"
                            />
                          ))}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">{media.name}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {media.mediaType}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Link to={`${media.id}`}>
                    <Button Text="Voir" variant="primary"></Button>
                  </Link>

                  <Link to={`${media.id}/edit`}>
                    <Button variant="secondary" Text="Modifier"></Button>
                  </Link>
                  <Button
                    Text="Supprimer"
                    variant="danger"
                    onClick={() => handleDelete(media.id)}
                  ></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center"></div>
      {/* Pagniation */}
      <div className="mt-4 flex justify-center">
        {medias.length > 0 && (
          <Pagination
            nextPage={nextPage}
            prevPage={prevPage}
            totalItems={pageInfo.totalItems}
            currentPage={pageInfo.currentPage}
            listofItems={medias.length}
          />
        )}
      </div>
    </>
  );
};

export default ListMediatheque;
