import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteArticle, fetchArticles } from "../../../api/blog";
import { Article, Articles } from "../../../api/types";
import { htmlToText } from "html-to-text";
import { formatDate } from "../../../helper/utils";

import {
  BreadCrumb,
  Loading,
  Success,
  Error,
  TitlePage,
  Button,
} from "../../../components/common";
const ListBlog = () => {
  const [articles, setArticles] = useState<Articles>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleDelete = async (id: number) => {
    await deleteArticle(id, setLoading, setError, setSuccess, setArticles);
  };

  useEffect(() => {
    fetchArticles(setArticles);
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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
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
                <td colSpan={6} className="text-center py-4 ">
                  Aucun article trouvé
                </td>
              </tr>
            ) : (
              articles.map((article: Article) => (
                <tr key={article.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {article.title.substring(0, 50)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {article.titreArabe.substring(0, 50)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {htmlToText(article.content.substring(0, 50))}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {htmlToText(article.contenuArabe.substring(0, 50))}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(article.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
      <div className="flex justify-center mt-4"></div>
    </>
  );
};

export default ListBlog;
