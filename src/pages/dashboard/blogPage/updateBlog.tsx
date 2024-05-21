/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, useContext } from "react";
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
} from "@/components/common";
import { handleUpdate, fetchArticle } from "@/api/blog";
import { Article } from "@/api/types";
import { ProgressContext } from "@/provider/ProgressProvider";
const UpdateBlog = () => {
  const { setProgress } = useContext(ProgressContext);
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
        setProgress(100);
      } catch (error) {
        console.error("Error:", error);
        setError("Quelque chose s'est mal passé !");
        setSuccess("");
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      setProgress(0);
    };
  }, [id]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [article, setArticle] = useState({} as Article);
  const handleInputChangeContent = (_e: any, editor: any) => {
    const data = editor.getData();
    setArticle({ ...article, content: data });
  };

  const handleInputChangeContentArabe = (_e: any, editor: any) => {
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
      await handleUpdate(id as string, article);
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
                    className="w-full border-2 border-gray-300 p-2"
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
                    data={article.contentArabe ? article.contentArabe : ""}
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

                  <Link to="/articles">
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
