import { authService } from "@/redux/authService";
import { useState } from "react";
import { Button, Loading, Error } from "../../components/common";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (!username || !password) setError("Veuillez remplir tous les champs");
    try {
      const loginData = {
        username,
        password,
        rememberMe: rememberMe,
      };
      setLoading(true);
      await authService.login(loginData);
      if (await authService.isAuthenticated()) {
        window.location.replace("/");
      }
      setLoading(false);
    } catch (error) {
      setError("Nom d'utilisateur ou mot de passe incorrect");
      setLoading(false);
    }
  };
  useState(() => {
    if (localStorage.getItem("auth") || sessionStorage.getItem("auth")) {
      window.location.replace("/");
    }
  });
  return (
    <div>
      <section className="bg-gray-50 ">
        <div className="b z-10 mx-auto flex  flex-col  items-center justify-center bg-gradient-to-bl  from-blue-900 via-blue-700  to-blue-400 px-6 py-8  md:h-screen lg:py-0">
          <div className="drop-shadow-x w-full rounded-lg bg-white  shadow hover:drop-shadow-xl sm:max-w-md md:mt-0 xl:p-0 ">
            <div className="space-y-4 p-6 sm:p-8  md:space-y-6">
              <a
                href="https://flowbite.com"
                className="flex items-center justify-center"
              >
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="mr-3 h-12 sm:h-9"
                  alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                  Flowbite
                </span>
              </a>

              <div className="mt-4">
                {loading && <Loading />}
                {error && (
                  <Error
                    error={{
                      error: error,
                    }}
                  />
                )}
              </div>
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Login into your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    Your Username
                  </label>
                  <input
                    type="text"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm "
                    placeholder="admin"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 "
                  >
                    Your Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="admin"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm "
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="focus:ring-3 focus:ring-primary-300 h-4 w-4 rounded border border-gray-300 bg-gray-50 "
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 ">
                        Remember me
                      </label>
                    </div>
                  </div>
                  {/* <a */}
                  {/*   href="#" */}
                  {/*   className="text-primary-600 text-sm font-medium hover:underline " */}
                  {/* > */}
                  {/*   Mot de passe oublié ? */}
                  {/* </a> */}
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    Text="Login"
                    onClick={handleSubmit}
                  ></Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
