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
  Pagination,
  FilterComponent,
} from "@components/common";
import { htmlToText } from "html-to-text";
import { Discours, PageInfo } from "@/api/types";
import { formatDate, formatDateforApi } from "@/helper/utils";
import { ProgressContext } from "@/provider/ProgressProvider";

const ListDiscours = () => {
  const { setProgress } = useContext(ProgressContext);
  const [discours, setDiscours] = useState([] as Discours[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [beforeDate, setBeforeDate] = useState<string>("");
  const [afterDate, setAfterDate] = useState<string>("");
  const handleDeleteButton = async (id: string) => {
    await handleDelete(id, setLoading, setSuccess, setError, setDiscours);
  };

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    currentPage: 1,
    totalItems: 0,
    nextPage: null,
    prevPage: null,
  });

  const fetch = async (
    currentPage: number = pageInfo.currentPage,
    search?: string,
  ) => {
    fetchDiscours(
      setDiscours,
      setLoading,
      setError,
      currentPage,
      setPageInfo,
      beforeDate,
      afterDate,
      search,
    );
  };

  const handleSearch = async (
    e: React.MouseEvent,
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    e.preventDefault();
    fetch(1, search);
    setSearch("");
  };

  const handleChangeDateBefore = (date: Date) => {
    const formatedDate = formatDateforApi(date);
    if (afterDate && formatedDate < afterDate) {
      setError("La date avant doit être supérieure à la date après");
    } else {
      setBeforeDate(formatedDate);
    }
  };
  const handleChangeDateAfter = (date: Date) => {
    const formatedDate = formatDateforApi(date);
    if (beforeDate && beforeDate < formatedDate) {
      setError("La date avant doit être supérieure à la date après");
    } else {
      setAfterDate(formatedDate);
    }
  };

  const handleDeleteFilter = () => {
    setBeforeDate("");
    setAfterDate("");
    setPageInfo({
      currentPage: 1,
      totalItems: 0,
      nextPage: null,
      prevPage: null,
    });
    fetch();
  };

  useEffect(() => {
    setProgress(100);
    fetch();

    return () => {
      setProgress(0);
    };
  }, [setProgress, pageInfo.currentPage, afterDate, beforeDate]);

  const nextPage = async () => {
    if (pageInfo.nextPage) {
      fetch(pageInfo.currentPage + 1);
    }
  };

  const prevPage = async () => {
    if (pageInfo.prevPage) {
      fetch(pageInfo.currentPage - 1);
    }
  };

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

      <FilterComponent
        handleSearch={handleSearch}
        beforeDate={beforeDate}
        afterDate={afterDate}
        handleChangeDateBefore={handleChangeDateBefore}
        handleChangeDateAfter={handleChangeDateAfter}
        handleDeleteFilter={handleDeleteFilter}
      />
      <div className="mt-4 flex justify-end">
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
            {discours.length === 0 ? (
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

                    <Link to={`${discour.id}/edit`}>
                      <Button variant="secondary" Text="Modifier"></Button>
                    </Link>
                    <Button
                      Text="Supprimer"
                      onClick={() => handleDeleteButton(discour.id)}
                      variant="danger"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagniation */}
      <div className="mt-4 flex justify-center">
        {discours.length > 0 && (
          <Pagination
            nextPage={nextPage}
            prevPage={prevPage}
            totalItems={pageInfo.totalItems}
            currentPage={pageInfo.currentPage}
            listofItems={discours.length}
          />
        )}
      </div>
    </>
  );
};

export default ListDiscours;
