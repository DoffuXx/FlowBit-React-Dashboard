import { Button } from "../../components/common";

const Login = () => {
  return (
    <div>
      <section className="bg-gray-50 ">
        <div className="b z-10 mx-auto flex  flex-col  items-center justify-center bg-gradient-to-bl  from-blue-900 via-blue-700  to-blue-400 px-6 py-8  md:h-screen lg:py-0">
          <div className="drop-shadow-x w-full rounded-lg bg-white  shadow hover:drop-shadow-xl sm:max-w-md md:mt-0 xl:p-0 ">
            <div className="space-y-4 p-6 sm:p-8  md:space-y-6">
              <a href="/" className="flex justify-center ">
                <img
                  src="https://ccpmfiguig.ma/assets/A-PRIM-qdR7wAJ4.png"
                  alt="PRIM"
                />
              </a>
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Se Connecter
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900 "
                  >
                    votre email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm "
                    placeholder="exemple@domain.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 "
                  >
                    votre mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm "
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
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 ">
                        souviens-toi de moi
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-primary-600 text-sm font-medium hover:underline "
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <div className="text-center">
                  <Button type="submit" Text="se Connecter"></Button>
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
