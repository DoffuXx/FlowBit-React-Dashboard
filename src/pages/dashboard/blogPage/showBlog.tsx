import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { BreadCrumb, Loading } from "../../../components/common";
import { fetchArticle } from "../../../api/blog";
import { Article } from "../../../api/types";
export const ShowBlog = () => {
  const REACT_APP_API_HOME = import.meta.env.VITE_REACT_APP_API_HOME;
  const { id } = useParams();
  const [post, setPost] = useState({} as Article);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchArticle(id as string);
        setPost(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <div className="mb-8">
        <BreadCrumb layer1="Articles" layer2="Afficher" />
      </div>
      {!post.title && !post.content ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="p-8">
          <div className="w-full rounded-lg overflow-hidden">
            <img
              className="w-full h-80 object-cover"
              src={`${REACT_APP_API_HOME}/images/blogs/${post.coverImage}`}
              alt=""
            />
          </div>
          <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 " />
          <h5 className="text-xl ">
            Titre : <span className="font-bold">{post.title}</span>
          </h5>

          <h5 dir="rtl" className="text-xl ">
            عنوان : <span className="font-bold">{post.titreArabe}</span>
          </h5>
          <div className="mt-8">
            <CKEditor
              editor={ClassicEditor}
              data={post.content}
              disabled={true}
            />
          </div>

          <div className="mt-8">
            <CKEditor
              editor={ClassicEditor}
              data={post.contenuArabe}
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
    </div>
  );
};
