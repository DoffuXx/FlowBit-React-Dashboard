import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { BreadCrumb, Loading } from "../../../components/common";
const ShowBoite = () => {
  const { id } = useParams();
  const [contact, setContact] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/api/contact/" + id)
      .then((response) => response.json())
      .then((data) => {
        setContact(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <BreadCrumb layer1="messages" layer2="Afficher" />
      </div>
      {!contact.prenom && !contact.nom ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="p-8 space-y-4">
          <h5 className="text-xl ">
            Prenom : <span className="font-bold">{contact.prenom}</span>
          </h5>
          <h5 className="text-xl ">
            Nom : <span className="font-bold">{contact.nom}</span>
          </h5>
          <h5 className="text-xl ">
            Email : <span className="font-bold">{contact.email}</span>
          </h5>
          <h5 className="text-xl ">
            Telephone : <span className="font-bold">{contact.telephone}</span>
          </h5>
          <label
            htmlFor="message"
            className="block text-xl mb-2 text-sm font-medium text-gray-900 "
          >
            Message :
          </label>
          <textarea
            id="message"
            value={contact.message}
            disabled={true}
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default ShowBoite;
