/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSubmit } from "@/api/blog";
import { formatDateIso } from "@/helper/utils";

import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { BreadCrumb, Button, Success, Error } from "../../../components/common";
import { Datepicker } from "flowbite-react";
const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [created_at, setCreatedAt] = useState<Date>();
  const [titreArabe, setTitreArabe] = useState("");
  const [contenuArabe, setContenuArabe] = useState("");
  const [loading, setLoading] = useState({ status: false, progress: 0 });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const handleChangeCoverImage = (e: any) => {
    setCoverImage(null);
    setLoading({ status: true, progress: 0 });
    const file = e.target.files[0];
    setName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(file);
    };
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        setLoading((prevState) => ({
          ...prevState,
          progress: Math.round((e.loaded / e.total) * 100),
        }));
      }
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (loading.progress === 100) {
      setLoading({ status: false, progress: 0 });
    }
  }, [loading.progress]);
  const handleSubmitForm = async (e: any) => {
    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    form.append("titreArabe", titreArabe);
    form.append("contenuArabe", contenuArabe);
    if (created_at !== undefined) {
      form.append("created_at", formatDateIso(created_at));
    }
    if (coverImage !== null) {
      form.append("coverImage", coverImage);
    }

    await handleSubmit(
      e,
      form,
      setError,
      setSuccess,
      setTitle,
      setContent,
      setTitreArabe,
      setContenuArabe,
      setCoverImage,
      navigate,
    );
  };

  return (
    <div className="">
      <div className="">
        <BreadCrumb layer1="Articles" layer2="Ajouter" />
      </div>

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mt-2">
          {success && <Success success={success} />}
          {error && (
            <Error
              error={{
                error: error,
              }}
            />
          )}
        </div>
        <p className="mt-4 max-w-lg text-3xl font-semibold leading-loose text-gray-900 ">
          Ajouter un nouvel article
        </p>
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
          <div className="border-b border-gray-200 bg-white p-6">
            <form className=" grid auto-rows-auto grid-cols-3  gap-1">
              {/* Titre */}
              <div className="col-span-2">
                <div className="bg-slate-50 rounded-3xl   p-4">
                  <label className="text-xl text-gray-600">
                    Titre <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 p-2"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div dir="rtl" className="bg-slate-50 rounded-3xl    p-4">
                  <label className="rtl text-xl  text-gray-600">
                    عنوان <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 p-2"
                    name="title"
                    id="title"
                    value={titreArabe}
                    onChange={(e) => setTitreArabe(e.target.value)}
                    required
                  />
                </div>
                {/* Contenu */}
                <div className="bg-slate-50 rounded-3xl   p-4">
                  <label className="text-xl text-gray-600">
                    Contenu <span className="text-red-500">*</span>
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                      console.log({ event, editor, data });
                    }}
                  />
                </div>

                <div dir="rtl" className="bg-slate-50 rounded-3xl   p-4">
                  <label className="text-xl text-gray-600">
                    محتوى <span className="text-red-500">*</span>
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={contenuArabe}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContenuArabe(data);
                      console.log({ event, editor, data });
                    }}
                  />
                </div>
              </div>

              {/* image de couverture */}
              <div className="col-start-3 row-start-1">
                <div className="bg-slate-50 rounded-3xl   p-4">
                  <label className="text-xl text-gray-600">
                    Image de couverture
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="">
                    <div className="flex w-full items-center justify-center">
                      <label
                        htmlFor="dropzone-file"
                        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50  hover:bg-gray-100 "
                      >
                        <div className="flex flex-col  items-center justify-center p-5 pb-6">
                          <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          {!name ? (
                            <div>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Cliquez pour télécharger
                                </span>{" "}
                                ou glisser-déposer
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                          ) : (
                            <p className="mb-2 rounded-lg  bg-green-50 text-sm text-green-800  dark:text-green-400 ">
                              <span className="font-semibold">
                                Votre Image a été téléchargé{" "}
                                <span className=" font-bold">{name}</span>
                              </span>
                              {loading.status && (
                                <div className="h-2.5 w-full rounded-full bg-gray-200 ">
                                  <div
                                    className="mt-6 h-2.5 rounded-full bg-green-600"
                                    style={{
                                      width: loading.progress - 50 + "%",
                                    }}
                                  ></div>
                                </div>
                              )}
                            </p>
                          )}
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          accept="/image/*"
                          className="hidden"
                          onChange={handleChangeCoverImage}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xl text-gray-600">
                    Date de publication
                  </label>
                  <div className="mt-4">
                    <Datepicker
                      onSelectedDateChanged={(date: Date) => {
                        setCreatedAt(date);
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Ajouter */}
              <div className="row-start-3 mt-4">
                <div className="flex p-1">
                  <Button
                    variant="secondary"
                    Text="Ajouter"
                    role="submit"
                    onClick={handleSubmitForm}
                  ></Button>

                  <Link to="/articles">
                    <Button Text="Annuler" role="submit"></Button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
