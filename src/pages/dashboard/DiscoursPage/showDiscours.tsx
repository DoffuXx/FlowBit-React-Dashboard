import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { BreadCrumb, Loading } from "../../../components/common";
import { fetchDiscoursById } from "src/api/discours";
import { Discours } from "src/api/types";
const ShowDiscours = () => {
  const REACT_APP_API_HOME = import.meta.env.VITE_REACT_APP_API_HOME;
  const { id } = useParams();
  const [discours, setDiscours] = useState({} as Discours);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDiscoursById(id);
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
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="p-8">
          <div className="w-full rounded-lg overflow-hidden">
            <img
              className="w-full h-80 object-cover"
              src={`${REACT_APP_API_HOME}/images/blogs/${discours.coverImage}`}
              alt=""
            />
          </div>
          <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 " />
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
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
              }}
              onChange={(event) => {}}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
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
              onReady={(editor) => {}}
              onChange={(event) => {}}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ShowDiscours;
