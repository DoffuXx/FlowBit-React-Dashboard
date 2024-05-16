import React, { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  BreadCrumb,
  Button,
  Loading,
  Success,
  Error,
} from "../../../components/common";
import { handleUpdate, handleSubmit, fetchArticle } from "../../../api/blog";
import { Articles, Article } from "@/api/types";
const UpdateBlog = () => {
  const idParm = useParams();
  const id = idParm.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchArticle(id as string);
        console.log("data", data);
        setArticle({
          ...article,
          title: data.title,
          content: data.content,
          titreArabe: data.titreArabe,
          contentArabe: data.contenuArabe,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message || "Quelque chose s'est mal passé !");
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
  const [article, setArticle] = useState({} as Article);
  const handleInputChangeContent = (e: SyntheticEvent, editor) => {
    const data = editor.getData();
    setArticle({ ...article, content: data });
  };

  const handleInputChangeContentArabe = (e: SyntheticEvent, editor) => {
    const data = editor.getData();
    setArticle({ ...article, contenuArabe: data });
  };
  const handleUpdateForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      !article?.title ||
      !article?.content ||
      !article?.titreArabe ||
      !article?.contentArabe
    ) {
      setError("Veuillez remplir tous les champs");
      setSuccess("");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await handleUpdate(id, article);
      setSuccess("Article modifié avec succès");
      setLoading(false);
      setTimeout(() => {
        navigate("/dashboard/articles");
      }, 500);
    } catch (error) {
      console.error("Error:", error);
      setError("Quelque chose s'est mal passé !");
      setSuccess("");
      setLoading(false);
    }
  };

  console.log(article);
  return (
    <div className="">
      <div className="">
        <BreadCrumb layer1="Articles" layer2="Modifier" />
      </div>

      {!article ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="mt-4">
            {loading && <Loading />}
            {success && <Success success={success} />}
            {error && <Error error={error} />}
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
                    value={article.title}
                    onChange={(e) => {
                      setArticle({ ...article, title: e.target.value });
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
                    value={article.titreArabe}
                    onChange={(e) => {
                      setArticle({ ...article, titreArabe: e.target.value });
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
                    data={article.content}
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
                    data={article.contentArabe ? article.contentArabe : ""}
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

                  <Link to="/dashboard/articles">
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

export default UpdateBlog;
