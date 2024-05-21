import { useEffect, useState } from "react";
import { updateMediatheque, fetchMediatheque } from "@/api/mediatheque";

import { BreadCrumb, Label, Button, Success, Error } from "@components/common";
import { Link, useParams } from "react-router-dom";
import { Media } from "@/api/types";
const UpdateMediatheque = () => {
  const REACT_APP_API_HOME = import.meta.env.VITE_REACT_APP_API_HOME;
  const [Mediatitle, setMediaTitle] = useState("");
  const [MediaType, setMediaType] = useState("Image");
  const [Files, setFiles] = useState([] as File[]);
  const [media, setMedia] = useState({} as Media);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const idParm = useParams();
  const id = idParm.id;
  useEffect(() => {
    const fetchMediathequeData = async () => {
      try {
        await fetchMediatheque(id as string, setMedia, setMediaTitle);
        console.log(media);
      } catch (error) {
        console.error("Error:", error);
        setError("Quelque chose s'est mal passé !");
        setSuccess("");
      }
    };
    fetchMediathequeData();
  }, [id]);
  const handleUpdateForm = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", Mediatitle);
    form.append("mediaType", MediaType);
    Files.map((file) => form.append("files[]", file));
    console.log(Files);
    console.log(form);
    await updateMediatheque(id as string, form);
  };
  const handleChangeFiles = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      console.log(files);
      setFiles(Array.from(files));
    }
  };
  return (
    <div className="">
      <div className="">
        <BreadCrumb layer1="Mediatheque" layer2="Modifer" />
      </div>

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mt-2">
          {success && <Success success={success} />}
          {error && <Error error={{ error: error }} />}
        </div>
        <p className="mt-4 max-w-lg text-3xl font-semibold leading-loose text-gray-900 ">
          Modifer le Media
        </p>
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
          <div className="border-b border-gray-200 bg-white p-6">
            <form className=" grid auto-rows-auto grid-cols-3  gap-1">
              {/* Titre */}
              <div className="col-span-2">
                <div className="bg-slate-50 rounded-3xl   p-4">
                  <Label>Titre</Label>
                  <br />
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 p-2"
                    name="title"
                    id="title"
                    value={Mediatitle}
                    onChange={(e) => setMediaTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="bg-slate-50 rounded-3xl   p-4">
                  <Label>Choisir le type de media </Label>
                  <form className="mt-2 max-w-sm">
                    <select
                      id="countries"
                      onChange={(e) => setMediaType(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      {MediaType === "Image" ? (
                        <option selected value="Image">
                          Image
                        </option>
                      ) : (
                        <option selected value="Video">
                          Video
                        </option>
                      )}
                    </select>
                  </form>
                </div>
                {/* Affichage des images */}
                <div className="">
                  {media.mediaType === "Image" ? (
                    <div className="bg-slate-50 grid grid-cols-3 gap-4 rounded-3xl  p-4">
                      {media.files.map((file) => (
                        <div>
                          <img
                            src={`${REACT_APP_API_HOME}/Media/${file.fileName}`}
                            key={file.id}
                            alt="Media Files"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                {/* UploadFiles */}
                <div className="col-start-2 row-start-1 p-6">
                  <label className="mb-2 block text-sm font-bold text-gray-900 dark:text-white">
                    Modifer les fichiers
                  </label>
                  <input
                    className="
                    block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900  focus:outline-none   "
                    type="file"
                    accept="{MediaType === 'Image' ? 'image/*' : 'video/*'}"
                    multiple
                    onChange={handleChangeFiles}
                  />
                </div>
                {/* Ajouter */}
                <div className="row-start-3 mt-4">
                  <div className="flex p-1">
                    <Button
                      onClick={handleUpdateForm}
                      variant="secondary"
                      Text="Modifer"
                      role="submit"
                    ></Button>
                    <Link to="/mediatheque">
                      <Button variant="primary" Text="Annuler"></Button>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMediatheque;
