import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Contact } from "@/api/types";

import { BreadCrumb, Button, Loading } from "@components/common";
const ShowBoite = () => {
  const { id } = useParams();
  const [contact, setContact] = useState({} as Contact);

  useEffect(() => {
    fetch("http://localhost:8000/api/contact/" + id)
      .then((response) => response.json())
      .then((data) => {
        setContact(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  return (
    <div>
      <div className="mb-8">
        <BreadCrumb layer1="messages" layer2="Afficher" />
      </div>
      {!contact.prenom && !contact.nom ? (
        <div className="flex h-screen items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className=" space-y-4 p-8">
          <h5 className="text-xl ">
            Prenom : <span className="">{contact.prenom}</span>
          </h5>
          <h5 className="text-xl ">
            Nom : <span className="">{contact.nom}</span>
          </h5>
          <h5 className="text-xl ">
            Email : <span className="">{contact.email}</span>
          </h5>
          <h5 className="text-xl ">
            Telephone : <span className="">{contact.telephone}</span>
          </h5>
          <label
            htmlFor="message"
            className="mb-2  block text-sm font-medium text-gray-900 "
          >
            Message :
          </label>
          <textarea
            id="message"
            value={contact.message}
            disabled={true}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
          ></textarea>
          <div className="mt-4">
            <Link to="/messages">
              <Button Text="retour"></Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBoite;
