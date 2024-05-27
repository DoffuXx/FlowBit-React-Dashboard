import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { BreadCrumb, Button, Loading } from "../../../components/common";
import { fetchDiscoursById } from "../../../api/discours";
import { Discours } from "../../../api/types";
const ShowDiscours = () => {
  const REACT_APP_API_HOME = import.meta.env.VITE_REACT_APP_API_HOME;
  const { id } = useParams();
  const [discours, setDiscours] = useState({} as Discours);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDiscoursById(id as string);
        setDiscours({
          ...discours,
          title: data.title,
          content: data.content,
          titreArabe: data.titreArabe,
          contenuArabe: data.contenuArabe,
          coverImage: data.imageName,
        });
        console.log("discours", discours);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="mb-8">
        <BreadCrumb layer1="Discours" layer2="Afficher" />
      </div>
      {!discours.title && !discours.content ? (
        <div className="flex h-screen items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="p-8">
          <div className="w-full overflow-hidden rounded-lg">
            <img
              className="h-80 w-full object-cover"
              src={`${REACT_APP_API_HOME}/images/blogs/${discours.coverImage}`}
              alt=""
            />
          </div>
          <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 md:my-10 " />
          <h5 className="text-xl ">
            Titre : <span className="font-bold">{discours.title}</span>
          </h5>

          <h5 dir="rtl" className="text-xl ">
            عنوان : <span className="font-bold">{discours.titreArabe}</span>
          </h5>
          <div className="mt-8">
            <CKEditor
              editor={ClassicEditor}
              data={discours.content}
              disabled={true}
            />
          </div>

          <div className="mt-8">
            <CKEditor
              editor={ClassicEditor}
              data={discours.contenuArabe}
              config={{
                language: {
                  ui: "ar",
                  content: "ar",
                },
              }}
              disabled={true}
            />
          </div>
        </div>
      )}

      <Link to="/discours">
        <Button Text="Retour" role="submit"></Button>
      </Link>
    </div>
  );
};
export default ShowDiscours;
