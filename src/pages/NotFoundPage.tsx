import notfound from "../assets/404/notfound.svg";

const NotFoundPage = () => {
  return (
    <div>
      <div className=" bg-gray-50 flex  items-center justify-center h-screen">
        <div className="rounded-lg flex flex-col   text-center items-center  drop-shadow-x hover:drop-shadow-xl">
          <img src={notfound} alt="404 Not Found" width={200} height={200} />
          <h1 className="text-4xl font-bold mb-4">404 - Pas trouvé</h1>
          <p className="text-gray-600">
            Désolé, la page que vous recherchez n'existe pas.
          </p>

          <div className="mt-4 text-center">
            <p className="text-gray-600 mb-3">
              Ou bien, vous voudrez peut-être explorer :
            </p>
            <a href="/" className="text-blue-500 hover:underline">
              Home
            </a>
            <a href="/blog" className="text-blue-500 hover:underline ml-2">
              Blog
            </a>
            <a href="/contact" className="text-blue-500 hover:underline ml-2">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
