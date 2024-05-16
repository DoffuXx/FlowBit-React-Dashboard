/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMediatheque } from "../../../api/mediatheque";
import { Media } from "../../../api/types";
import { Button, Label } from "../../../components/common";

const ShowMediatheque = () => {
  const REACT_APP_API_HOME = import.meta.env.VITE_REACT_APP_API_HOME;
  const { id } = useParams();
  const [media, setMedia] = useState({} as Media);
  useEffect(() => {
    fetchMediatheque(id as string, setMedia);
  }, [id]);
  return (
    <div className="col-span-3">
      <div className="bg-slate-50 p-4   rounded-3xl">
        <Label required={false}>Titre</Label>
        <br />
        <input
          type="text"
          className="border-2 border-gray-300 p-2 w-full"
          value={media.name}
          disabled
        />
      </div>
      <div className="bg-slate-50 p-4   rounded-3xl">
        <Label required={false}>Type</Label>
        <input
          type="text"
          className="border-2 border-gray-300 p-2 w-full"
          value={media.mediaType}
          disabled
        />
      </div>
      {media.mediaType === "Image" ? (
        <div className="bg-slate-50 p-4   rounded-3xl">
          <Label required={false}>Media</Label>

          <div className="flex-col md:flex-row space-y-4">
            {media.files &&
              media.files.map((file: any) => (
                <img
                  className="h-28  rounded-md transition duration-500 ease-in-out hover:scale-[2.5] hover:translate-x-full "
                  src={`${REACT_APP_API_HOME}/Media/${file.fileName}`}
                  alt=""
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 p-4   rounded-3xl">
          <div className="flex-col md:flex-row space-y-4">
            <Label>Media</Label>
            {media.files?.map((file: any) => (
              <video
                src={`${REACT_APP_API_HOME}/Media/${file.fileName}`}
                controls
                className="w-48 h-48"
              />
            ))}
          </div>
        </div>
      )}
      <div className="bg-slate-50 p-4   rounded-3xl">
        <Link to="/mediatheque">
          <Button Text={"Retour"}></Button>
        </Link>
      </div>
    </div>
  );
};

export default ShowMediatheque;
