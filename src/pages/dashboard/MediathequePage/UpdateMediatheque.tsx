/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { handleSubmit } from "../../../api/mediatheque";

import {
  BreadCrumb,
  Label,
  Button,
  Success,
  Error,
} from "../../../components/common";
const UpdateMediatheque = () => {
  const [Mediatitle, setMediaTitle] = useState("");
  const [MediaType, setMediaType] = useState("Image");
  const [Files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // const handleChangeFiles = (incommingFiles: []) => {
  //   setFiles(incommingFiles);
  // };
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", Mediatitle);
    form.append("type", MediaType);
    Files.map((file) => form.append("files[]", file));
    console.log(Files);
    console.log(form);
    await handleSubmit(form, setSuccess, setError);
  };
  const handleChnageFiles = (e: any) => {
    const file = e.target.files;
    console.log(file);
    if (file) {
      setFiles(Array.from(file));
    }
  };
  return (
    <div className="">
      <div className="">
        <BreadCrumb layer1="Mediatheque" layer2="Ajouter" />
      </div>

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="mt-2">
          {success && <Success success={success} />}
          {error && <Error error={{ error: error }} />}
        </div>
        <p className="max-w-lg mt-4 text-3xl font-semibold leading-loose text-gray-900 ">
          Modifer le Media
        </p>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <form className=" grid grid-cols-3 auto-rows-auto  gap-1">
              {/* Titre */}
              <div className="col-span-2">
                <div className="bg-slate-50 p-4   rounded-3xl">
                  <Label>Titre</Label>
                  <br />
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="title"
                    id="title"
                    value={Mediatitle}
                    onChange={(e) => setMediaTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="bg-slate-50 p-4   rounded-3xl">
                  <Label>Choisir le type de media </Label>
                  <form className="max-w-sm mt-2">
                    <select
                      id="countries"
                      onChange={(e) => setMediaType(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected value="Image">
                        Image
                      </option>
                      <option value="Video">Video</option>
                    </select>
                  </form>
                </div>
                {/* UploadFiles */}
                <div className="col-start-2 row-start-1 p-6">
                  <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                    Télécharger plusieurs fichiers
                  </label>
                  <input
                    className="
                    block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none   "
                    type="file"
                    accept="{MediaType === 'Image' ? 'image/*' : 'video/*'}"
                    multiple
                    onChange={handleChnageFiles}
                  />
                </div>
                {/* Ajouter */}
                <div className="row-start-3 mt-4">
                  <div className="flex p-1">
                    <Button
                      onClick={handleSubmitForm}
                      variant="primary"
                      Text="Ajouter"
                      role="submit"
                    ></Button>
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
