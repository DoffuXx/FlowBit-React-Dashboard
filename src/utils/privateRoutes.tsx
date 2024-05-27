import { Outlet, Navigate } from "react-router-dom";
const PrivateRoutes = () => {
  const localStorageAuth = localStorage.getItem("auth");
  const auth = localStorageAuth ? JSON.parse(localStorageAuth!) : false;
  if (!auth.isAuth) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
