import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
// Api
import { deleteMessage } from "../../../api/boite";
// Components
import {
  BreadCrumb,
  Loading,
  Success,
  Error,
} from "../../../components/common";
import { fetchMessages } from "../../../api/boite";
import { Contact } from "../../../api/types";
const ListBoite = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [contacts, setContacts] = useState([]);
  const deleteContact = async (id: string) => {
    await deleteMessage(id, setLoading, setError, setSuccess, setContacts);
  };
  useEffect(() => {
    fetchMessages(setContacts, setLoading);
  }, []);

  return (
    <>
      <div className="">
        <BreadCrumb layer1="Messages" />
      </div>
      <div className="mt-4 mb-2">
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

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Prenom
              </th>
              <th scope="col" className="px-6 py-3">
                Nom
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Telephone
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
                <td colSpan={6} className="text-center py-4">
                  Aucun message
                </td>
              </tr>
            ) : (
              contacts.map((contact: Contact) => (
                <tr key={contact.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.prenom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.nom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.telephone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`${contact.id}`}>
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none "
                      >
                        Voir
                      </button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteContact(contact.id)}
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-80 focus:outline-none "
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
    </>
  );
};

export default ListBoite;
