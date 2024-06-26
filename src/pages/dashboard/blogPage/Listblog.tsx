import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteArticle, fetchArticles } from "@/api/blog";
import { Article, Articles, PageInfo } from "@/api/types";
import { htmlToText } from "html-to-text";
import { formatDate, formatDateforApi } from "@/helper/utils";

import {
  BreadCrumb,
  Loading,
  Success,
  Error,
  TitlePage,
  Button,
  Pagination,
  FilterComponent,
} from "@components/common";
import { ProgressContext } from "@/provider/ProgressProvider";
const ListBlog = () => {
  const { setProgress } = useContext(ProgressContext);
  const [articles, setArticles] = useState<Articles>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [beforeDate, setBeforeDate] = useState<string>("");
  const [afterDate, setAfterDate] = useState<string>("");
  const [error, setError] = useState("");
  const fetch = async (
    currentPage: number = pageInfo.currentPage,
    search?: string,
  ) => {
    fetchArticles(
      setArticles,
      setLoading,
      setError,
      currentPage,
      setPageInfo,
      beforeDate,
      afterDate,
      search,
    );
  };
  const handleChangeDateBefore = (date: Date) => {
    const formatedDate = formatDateforApi(date);
    if (afterDate && formatedDate < afterDate) {
      setError("La date avant doit être supérieure à la date après");
    } else {
      setBeforeDate(formatedDate);
    }
  };
  const handleChangeDateAfter = (date: Date) => {
    const formatedDate = formatDateforApi(date);
    if (beforeDate && beforeDate < formatedDate) {
      setError("La date avant doit être supérieure à la date après");
    } else {
      setAfterDate(formatedDate);
    }
  };
  const handleDelete = async (id: number) => {
    await deleteArticle(id, setLoading, setError, setSuccess, setArticles);
  };
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    currentPage: 1,
    totalItems: 0,
    nextPage: null,
    prevPage: null,
  });

  const handleDeleteFilter = () => {
    setBeforeDate("");
    setAfterDate("");
    setPageInfo({
      currentPage: 1,
      totalItems: 0,
      nextPage: null,
      prevPage: null,
    });
    fetch();
  };
  useEffect(() => {
    setProgress(100);
    fetch();
    return () => {
      setProgress(0);
    };
  }, [setProgress, pageInfo.currentPage, afterDate, beforeDate]);

  const nextPage = async () => {
    if (pageInfo.nextPage) {
      fetch(pageInfo.currentPage + 1);
    }
  };

  const prevPage = async () => {
    if (pageInfo.prevPage) {
      fetch(pageInfo.currentPage - 1);
    }
  };

  const handleSearch = async (
    e: React.MouseEvent,
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    e.preventDefault();
    fetch(1, search);
    setSearch("");
  };

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

      <TitlePage title="Blog Home" />

      <FilterComponent
        handleSearch={handleSearch}
        beforeDate={beforeDate}
        afterDate={afterDate}
        handleChangeDateBefore={handleChangeDateBefore}
        handleChangeDateAfter={handleChangeDateAfter}
        handleDeleteFilter={handleDeleteFilter}
      />
      <div className="mt-4 flex justify-end">
        <Link to="/articles/create">
          <Button
            Text="Add an Article
"
          ></Button>
        </Link>
      </div>
      <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right ">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>

              <th scope="col" className="px-6 py-3">
                Content
              </th>

              <th scope="col" className="px-6 py-3">
                CREATED AT
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
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
                    {htmlToText(article.content?.substring(0, 50))}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {formatDate(article.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Link to={`${article.id}`}>
                      <Button Text="See" variant="primary"></Button>
                    </Link>

                    <Link to={`${article.id}/edit`}>
                      <Button variant="secondary" Text="Update"></Button>
                    </Link>
                    <Button
                      Text="DELETE"
                      variant="danger"
                      onClick={() => handleDelete(article.id)}
                    ></Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagniation */}
      <div className="mt-4 flex justify-center">
        {articles.length > 0 && (
          <Pagination
            nextPage={nextPage}
            prevPage={prevPage}
            totalItems={pageInfo.totalItems}
            currentPage={pageInfo.currentPage}
            listofItems={articles.length}
          />
        )}
      </div>
    </>
  );
};

export default ListBlog;
