import { useState } from "react";
import { handleSubmit } from "@/api/mediatheque";
import { BreadCrumb, Label, Button, Success, Error } from "@components/common";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, MouseEvent } from "@/helper/types";

const CreateMediatheque = () => {
  const navigate = useNavigate();
  const [Mediatitle, setMediaTitle] = useState("");
  const [MediaType, setMediaType] = useState("Image");
  const [Files, setFiles] = useState([] as File[]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmitForm = async (e: MouseEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", Mediatitle);
    form.append("type", MediaType);
    Files.map((file) => form.append("files[]", file));
    await handleSubmit(form, setSuccess, setError, navigate);
  };
  const handleChangeFiles = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target.files;
    if (file) {
      setFiles(Array.from(file));
    }
  };
  return (
    <div className="">
      <div className="">
        <BreadCrumb layer1="Mediatheque" layer2="Ajouter" />
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
          Ajouter un Media
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
                      <option selected value="Image">
                        Image
                      </option>
                      <option value="Video">Video</option>
                    </select>
                  </form>
                </div>
                {/* UploadFiles */}
                <div className="col-start-2 row-start-1 p-6">
                  <label className="mb-2 block text-sm  font-bold text-gray-900 dark:text-white">
                    Télécharger plusieurs fichiers
                  </label>
                  <input
                    className="
                    block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900  focus:outline-none   "
                    type="file"
                    accept={MediaType === "Image" ? "image/*" : "video/*"}
                    multiple
                    onChange={handleChangeFiles}
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

export default CreateMediatheque;
