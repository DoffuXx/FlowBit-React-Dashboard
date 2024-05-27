import { Outlet, Navigate } from "react-router-dom";
const PrivateRoutes = () => {
  const localStorageAuth = localStorage.getItem("auth");
  const sessionStorageAuth = sessionStorage.getItem("auth");
  const auth = localStorageAuth ? JSON.parse(localStorageAuth!) : false;
  const authSession = sessionStorageAuth
    ? JSON.parse(sessionStorageAuth!)
    : false;
  const isAuth = auth.isAuth || authSession.isAuth;
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
