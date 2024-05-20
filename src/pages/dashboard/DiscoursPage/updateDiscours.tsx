/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import type { EventInfo } from "@ckeditor/ckeditor5-utils";
import { fetchDiscoursById, handleUpdate } from "../../../api/discours";

import {
  BreadCrumb,
  Button,
  Loading,
  Success,
  Error,
} from "../../../components/common";
import { Discours } from "../../../api/types";
const UpdateDiscours = () => {
  const idParm = useParams();
  const id = idParm.id;
  const [contenuArabeCopy, setContenuArabeCopy] = useState("");
  const [contenuCopy, setContenuCopy] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchDiscoursById(id as string);
        setDiscours({
          ...discours,
          title: data.title || "",
          titreArabe: data.titreArabe || "",
          contenuArabe: data.contenuArabe || "",
          content: data.content || "",
        });
        setContenuArabeCopy(data.contenuArabe);
        setContenuCopy(data.content);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError("Quelque chose s'est mal passé !");
        setSuccess("");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [discours, setDiscours] = useState({} as Discours);

  const handleInputChangeContent = (_e: EventInfo, editor: ClassicEditor) => {
    const data = editor.getData();
    setDiscours({ ...discours, content: data });
  };

  const handleInputChangeContentArabe = (
    _e: EventInfo,
    editor: ClassicEditor,
  ) => {
    const data = editor.getData();
    setDiscours({ ...discours, contenuArabe: data });
  };

  const handleUpdateForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      setSuccess("Discours modifié avec succès");
      setLoading(false);
      await handleUpdate(id as string, discours);
      setTimeout(() => {
        navigate("/dashboard/discours");
      }, 500);
    } catch (error) {
      console.error("Error:", error);
      setError("Quelque chose s'est mal passé !");
      setSuccess("");
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="">
        <BreadCrumb layer1="Discours" layer2="Modifier" />
      </div>

      {!discours ? (
        <div className="flex h-screen items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="border-b border-gray-200 bg-white p-6">
              <form>
                <div className="mb-4">
                  <label className="text-xl text-gray-600">
                    Titre <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 p-2"
                    name="title"
                    id="title"
                    value={discours.title}
                    onChange={(e) => {
                      setDiscours({ ...discours, title: e.target.value });
                    }}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xl text-gray-600">
                    Titre en arabe <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    dir="rtl"
                    type="text"
                    className="w-full border-2 border-gray-300 p-2"
                    name="title"
                    id="title"
                    value={discours.titreArabe}
                    onChange={(e) => {
                      setDiscours({ ...discours, titreArabe: e.target.value });
                    }}
                    required
                  />
                </div>

                <div className="mb-8">
                  <label className="text-xl text-gray-600">
                    Contenu <span className="text-red-500">*</span>
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={contenuCopy ? contenuCopy : ""}
                    onChange={handleInputChangeContent}
                  />
                </div>

                <div className="mb-8">
                  <label className="text-xl text-gray-600">
                    Contenu en arabe <span className="text-red-500">*</span>
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      language: {
                        ui: "ar",
                        content: "ar",
                      },
                    }}
                    data={contenuArabeCopy ? contenuArabeCopy : ""}
                    onChange={handleInputChangeContentArabe}
                  />
                </div>
                <div className="flex space-x-5 p-1">
                  <Button
                    Text="Modifier"
                    variant="secondary"
                    role="submit"
                    onClick={handleUpdateForm}
                  ></Button>

                  <Link to="/discours">
                    <Button Text="Annuler" role="submit"></Button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateDiscours;
