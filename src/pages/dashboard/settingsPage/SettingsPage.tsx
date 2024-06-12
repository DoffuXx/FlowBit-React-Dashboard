import {
  Button,
  Line,
  Loading,
  Success,
  TitlePage,
  Error,
} from "@/components/common";
import { useState } from "react";
import { Link } from "react-router-dom";
import { changeCredentials } from "@/api/auth";

const SettingsPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = localStorage.getItem("auth") || sessionStorage.getItem("auth");

  const verifyPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return false;
    }
    return true;
  };
  const user = JSON.parse(auth!);
  const handleUpdate = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!username || !password || !oldPassword || !confirmPassword) {
      setError("Tous les champs sont requis");
      return;
    }
    if (verifyPassword(password, confirmPassword)) {
      changeCredentials(
        username,
        password,
        oldPassword,
        user.user,
        setSuccess,
        setError,
        setLoading,
      );
    }
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setOldPassword("");
  };
  return (
    <div className="mt-4">
      <TitlePage title="Page de Paramètre" />
      <div className="flex justify-between">
        <div>
          <div className="uppercase">{user && user.user.username}</div>
        </div>
        <div>
          <img
            className="h-36 w-48 rounded"
            src="https://xsgames.co/randomusers/avatar.php?g=pixel"
            alt="Extra large avatar"
          />
        </div>
      </div>

      <Line variant="default" />

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
      <form>
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              id="first_name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Old Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="•••••••••"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="•••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Confirm password
          </label>
          <input
            type="password"
            id="confirm_password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="•••••••••"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button
          onClick={handleUpdate}
          type="submit"
          variant="secondary"
          Text="Update"
        ></Button>

        <Link to="/">
          <Button Text="Home" role="submit"></Button>
        </Link>
      </form>
    </div>
  );
};
export default SettingsPage;
