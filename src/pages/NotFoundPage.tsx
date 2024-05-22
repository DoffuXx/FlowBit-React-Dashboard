import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="flex flex-col  justify-center text-center">
          <img
            src="https://ccpmfiguig.ma/assets/A-PRIM-qdR7wAJ4.png"
            className=""
            alt="Maison Médicale Jubilé"
          />

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oPss!
          </h1>

          <p className="mt-4 text-gray-500">
            Nous ne trouvons pas cette page .
          </p>
          <div className="mt-4">
            <Button Text="Retourner" onClick={() => navigate(-1)}></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
