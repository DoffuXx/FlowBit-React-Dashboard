import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
// Api
import { deleteMessage } from "@/api/boite";
// Components
import {
  BreadCrumb,
  Loading,
  Success,
  Error,
  Pagination,
  TitlePage,
} from "@components/common";
import { fetchMessages } from "@/api/boite";
import { Contact, PageInfo } from "@/api/types";
import { ProgressContext } from "@/provider/ProgressProvider";
const ListBoite = () => {
  const { setProgress } = useContext(ProgressContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [contacts, setContacts] = useState([]);
  const deleteContact = async (id: string) => {
    await deleteMessage(id, setLoading, setError, setSuccess, setContacts);
  };

  const fetch = async (currentPage: number = pageInfo.currentPage) => {
    fetchMessages(setContacts, setLoading, setError, currentPage, setPageInfo);
  };

  // const handleSearch = async (
  //   e: React.MouseEvent,
  //   setSearch: React.Dispatch<React.SetStateAction<string>>,
  // ) => {
  //   e.preventDefault();
  //   fetch(1);
  //   setSearch("");
  // };
  //
  // const handleChangeDateBefore = (date: Date) => {
  //   const formatedDate = formatDateforApi(date);
  //   if (afterDate && formatedDate < afterDate) {
  //     setError("La date avant doit être supérieure à la date après");
  //   } else {
  //     setBeforeDate(formatedDate);
  //   }
  // };
  // const handleChangeDateAfter = (date: Date) => {
  //   const formatedDate = formatDateforApi(date);
  //   if (beforeDate && beforeDate < formatedDate) {
  //     setError("La date avant doit être supérieure à la date après");
  //   } else {
  //     setAfterDate(formatedDate);
  //   }
  // };
  //
  // const handleDeleteFilter = () => {
  //   setBeforeDate("");
  //   setAfterDate("");
  //   setPageInfo({
  //     currentPage: 1,
  //     totalItems: 0,
  //     nextPage: null,
  //     prevPage: null,
  //   });
  //   fetch();
  // };
  //
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    currentPage: 1,
    totalItems: 0,
    nextPage: null,
    prevPage: null,
  });
  useEffect(() => {
    setProgress(100);
    fetch();
    return () => {
      setProgress(0);
    };
  }, [setProgress, pageInfo.currentPage]);

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
        <BreadCrumb layer1="Messages" />
      </div>
      <div className="mb-2 mt-4">
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

      <TitlePage title="Messages" />

      {/* <FilterComponent */}
      {/*   handleSearch={handleSearch} */}
      {/*   beforeDate={beforeDate} */}
      {/*   afterDate={afterDate} */}
      {/*   handleChangeDateBefore={handleChangeDateBefore} */}
      {/*   handleChangeDateAfter={handleChangeDateAfter} */}
      {/*   handleDeleteFilter={handleDeleteFilter} */}
      {/*   optionalPlaceHolder="Recherche Par Email..." */}
      {/* /> */}

      <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right ">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                First name
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-center">
                  Aucun message
                </td>
              </tr>
            ) : (
              contacts.map((contact: Contact) => (
                <tr key={contact.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    {contact.prenom}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{contact.nom}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {contact.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {contact.telephone}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {contact.message.substring(0, 30) + "..."}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Link to={`${contact.id}`}>
                      <button
                        type="button"
                        className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 "
                      >
                        Voir
                      </button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteContact(contact.id)}
                      className="dark:focus:ring-red-80 mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 "
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagniation */}
      <div className="mt-4 flex justify-center">
        {contacts.length > 0 && (
          <Pagination
            nextPage={nextPage}
            prevPage={prevPage}
            totalItems={pageInfo.totalItems}
            currentPage={pageInfo.currentPage}
            listofItems={contacts.length}
          />
        )}
      </div>
    </>
  );
};

export default ListBoite;
