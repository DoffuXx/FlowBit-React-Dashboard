import React, { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchDiscoursById, handleUpdate } from "src/api/discours";

import {
  BreadCrumb,
  Button,
  CKEditorComponent,
  Loading,
  Success,
  Error,
} from "../../../components/common";
import { Discours } from "src/api/types";
const UpdateDiscours = () => {
  const idParm = useParams();
  const id = idParm.id;
  const [contenuArabeCopy, setContenuArabeCopy] = useState("");
  const [contenuCopy, setContenuCopy] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchDiscoursById(id);
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

  const handleInputChangeContent = (e: any, editor) => {
    const data = editor.getData();
    setDiscours({ ...discours, content: data });
  };

  const handleInputChangeContentArabe = (e: any, editor) => {
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
      await handleUpdate(id, discours);
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
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <form>
                <div className="mb-4">
                  <label className="text-xl text-gray-600">
                    Titre <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
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
                    className="border-2 border-gray-300 p-2 w-full"
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
                    onInit={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={handleInputChangeContent}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </div>

                <div className="mb-8">
                  <label className="text-xl text-gray-600">
                    Contenu en arabe <span className="text-red-500">*</span>
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    onInit={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    config={{
                      language: {
                        ui: "ar",
                        content: "ar",
                      },
                    }}
                    data={contenuArabeCopy ? contenuArabeCopy : ""}
                    onChange={handleInputChangeContentArabe}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </div>
                <div className="flex p-1 space-x-5">
                  <Button
                    Text="Modifier"
                    variant="secondary"
                    role="submit"
                    onClick={handleUpdateForm}
                  ></Button>

                  <Link to="/dashboard/discours">
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
