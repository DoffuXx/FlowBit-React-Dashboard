import { Button, Line, TitlePage } from "@/components/common";
import { authService } from "@/redux/authService";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  const auth = localStorage.getItem("auth");
  const user = JSON.parse(auth!);
  return (
    <div className="mt-4">
      <TitlePage title="Page de Paramètre" />
      <div className="flex justify-between">
        <div>
          <div className="uppercase">{user && user.username}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Joined in August 2014
          </div>
        </div>
        <div>
          <img
            className="h-36 w-48 rounded"
            src="https://www.akwacommunication.ma/img/logo.PNG"
            alt="Extra large avatar"
          />
        </div>
      </div>

      <Line variant="default" />
      <form>
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div>
            <label
              for="first_name"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="first_name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="John"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            for="password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        <div className="mb-6">
          <label
            for="confirm_password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="confirm_password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        <Button
          type="submit"
          variant="secondary"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          Text="          Modifier
"
        ></Button>

        <Link to="/">
          <Button Text="Home" role="submit"></Button>
        </Link>
      </form>
    </div>
  );
};
export default SettingsPage;
