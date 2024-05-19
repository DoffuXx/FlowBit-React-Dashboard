import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteArticle, fetchArticles } from "@/api/blog";
import { Article, Articles } from "@/api/types";
import { htmlToText } from "html-to-text";
import { formatDate } from "@/helper/utils";

import {
  BreadCrumb,
  Loading,
  Success,
  Error,
  TitlePage,
  Button,
} from "@components/common";
const ListBlog = () => {
  const [articles, setArticles] = useState<Articles>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleDelete = async (id: number) => {
    await deleteArticle(id, setLoading, setError, setSuccess, setArticles);
  };

  useEffect(() => {
    fetchArticles(setArticles, setLoading);
  }, []);

  return (
    <>
      <div className="">
        <BreadCrumb layer1="Articles" />
      </div>
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

      <TitlePage title="Accueil des Blogs" />
      <div className="flex justify-end">
        <Link to="/articles/create">
          <Button
            Text="Ajouter un Article
"
          ></Button>
        </Link>
      </div>
      <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right ">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Titre
              </th>

              <th scope="col" className="px-6 py-3">
                Titre en arabe
              </th>
              <th scope="col" className="px-6 py-3">
                Contenu
              </th>

              <th scope="col" className="px-6 py-3">
                Contenu en arabe
              </th>
              <th scope="col" className="px-6 py-3">
                CRÉÉ À
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!articles ? (
              <tr>
                <td colSpan={6} className="py-4 text-center ">
                  Aucun article trouvé
                </td>
              </tr>
            ) : (
              articles.map((article: Article) => (
                <tr key={article.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    {article.title.substring(0, 50)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {article.titreArabe.substring(0, 50)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {htmlToText(article.content.substring(0, 50))}...
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {htmlToText(article.contenuArabe.substring(0, 50))}...
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {formatDate(article.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Link to={`${article.id}`}>
                      <Button Text="Voir" variant="primary"></Button>
                    </Link>
                    <Button
                      Text="Supprimer"
                      variant="danger"
                      onClick={() => handleDelete(article.id)}
                    ></Button>

                    <Link to={`${article.id}/edit`}>
                      <Button variant="secondary" Text="Modifer"></Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagniation */}
      <div className="mt-4 flex justify-center"></div>
    </>
  );
};

export default ListBlog;
