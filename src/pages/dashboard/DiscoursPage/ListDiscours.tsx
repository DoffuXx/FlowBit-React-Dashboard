import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDiscours, handleDelete } from "@/api/discours";
import {
  BreadCrumb,
  Loading,
  Success,
  Error,
  TitlePage,
  Button,
} from "@components/common";
import { htmlToText } from "html-to-text";
import { Discours } from "@/api/types";
import { formatDate } from "@/helper/utils";
import { ProgressContext } from "@/provider/ProgressProvider";

const ListDiscours = () => {
  const { setProgress } = useContext(ProgressContext);
  const [discours, setDiscours] = useState([] as Discours[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleDeleteButton = async (id: string) => {
    await handleDelete(id, setLoading, setSuccess, setError, setDiscours);
  };
  useEffect(() => {
    setProgress(100);
    const fetchDiscoursData = async () => {
      fetchDiscours(setDiscours, setLoading);
    };
    fetchDiscoursData();

    return () => {
      setProgress(0);
    };
  }, []);

  return (
    <>
      <div className="">
        <BreadCrumb layer1="Discours" />
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

      <TitlePage title="Accueil Discours" />
      <div className="flex justify-end">
        <Link to="/discours/create">
          <Button
            Text="
Ajouter un discours
"
          ></Button>
        </Link>
      </div>
      <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right ">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Titre
              </th>

              <th scope="col" className="px-6 py-3">
                Titre en arabe
              </th>
              <th scope="col" className="px-6 py-3">
                Contenu
              </th>

              <th scope="col" className="px-6 py-3">
                Contenu en arabe
              </th>
              <th scope="col" className="px-6 py-3">
                CRÉÉ À
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!discours ? (
              <tr>
                <td colSpan={6} className="py-4 text-center ">
                  Aucune donnée disponible
                </td>
              </tr>
            ) : (
              discours.map((discour) => (
                <tr key={discour.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    {discour.title.substring(0, 50)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {discour.titreArabe.substring(0, 50)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {htmlToText(discour.content.substring(0, 50))}...
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {htmlToText(discour.contenuArabe.substring(0, 50))}...
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {formatDate(discour.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Link to={`${discour.id}`}>
                      <Button Text="Voir" />
                    </Link>
                    <Button
                      Text="Supprimer"
                      onClick={() => handleDeleteButton(discour.id)}
                      variant="danger"
                    />

                    <Link to={`${discour.id}/edit`}>
                      <Button variant="secondary" Text="Modifer"></Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListDiscours;
