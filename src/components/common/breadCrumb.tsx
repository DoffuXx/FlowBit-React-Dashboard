import { Link } from "react-router-dom";
const toLowerCase = (str: string) => {
  return str.toLowerCase();
};

interface BreadCrumbProps {
  layer1: string;
  layer2?: string;
  isHome?: boolean;
}

const BreadCrumb = ({ layer1, layer2, isHome }: BreadCrumbProps) => {
  return (
    <nav className="mt-4 flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <a
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            <svg
              className="me-2.5 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Home
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <Link
              to={isHome ? "/" : "/" + toLowerCase(layer1)}
              className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 "
            >
              {layer1}
            </Link>
          </div>
        </li>
        {layer2 && (
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                <Link
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 "
                  to={""}
                >
                  {layer2}
                </Link>
              </span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
