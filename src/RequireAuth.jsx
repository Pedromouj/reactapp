import { isExpired } from "react-jwt";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Token from "./Components/Tools/Token";

const RequireAuth = () => {
  const location = useLocation();

  // prettier-ignore
  return Token
        ? <Outlet />
        : <Navigate to={`/login?redirect=${location.pathname}`} state={{ from: location }} replace />;
};

export default RequireAuth;
