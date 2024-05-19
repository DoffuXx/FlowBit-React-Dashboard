import notfound from "@/assets/404/notfound.svg";

const NotFoundPage = () => {
  return (
    <div>
      <div className=" flex h-screen  items-center justify-center bg-gray-50">
        <div className="drop-shadow-x flex flex-col   items-center rounded-lg  text-center hover:drop-shadow-xl">
          <img src={notfound} alt="404 Not Found" width={200} height={200} />
          <h1 className="mb-4 text-4xl font-bold">404 - Pas trouvé</h1>
          <p className="text-gray-600">
            Désolé, la page que vous recherchez n'existe pas.
          </p>

          <div className="mt-4 text-center">
            <p className="mb-3 text-gray-600">
              Ou bien, vous voudrez peut-être explorer :
            </p>
            <a href="/" className="text-blue-500 hover:underline">
              Home
            </a>
            <a href="/blog" className="ml-2 text-blue-500 hover:underline">
              Blog
            </a>
            <a href="/contact" className="ml-2 text-blue-500 hover:underline">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
