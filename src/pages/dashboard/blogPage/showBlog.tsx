import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { BreadCrumb, Loading } from "../../../components/common";
import { fetchArticle } from "../../../api/blog";
import { Article } from "../../../api/types";
import { ProgressContext } from "@/provider/ProgressProvider";
export const ShowBlog = () => {
  const { setProgress } = useContext(ProgressContext);
  const REACT_APP_API_HOME = import.meta.env.VITE_REACT_APP_API_HOME;
  const { id } = useParams();
  const [post, setPost] = useState({} as Article);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchArticle(id as string);
        setPost(data);
        setProgress(100);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
    return () => {
      setProgress(0);
    };
  }, [id]);

  return (
    <div>
      <div className="mb-8">
        <BreadCrumb layer1="Articles" layer2="Afficher" />
      </div>
      {!post.title && !post.content ? (
        <div className="flex h-screen items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="p-8">
          <div className="w-full overflow-hidden rounded-lg">
            <img
              className="h-80 w-full object-cover"
              src={`${REACT_APP_API_HOME}/images/blogs/${post.coverImage}`}
              alt=""
            />
          </div>
          <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 md:my-10 " />
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
