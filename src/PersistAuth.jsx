import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Token from "./Components/Tools/Token";
// import UsersInfo from "./Components/Tools/UsersInfo";
import OverlaySpinner from "./Components/Spinner/OverlaySpinner";

const PersistLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!Token) {
      navigate(`/login?redirect=${location.pathname}`);
    } else {
      navigate("/");
      setLoading(false);
    }
  }, [navigate, Token, location]);

  if (loading) return <OverlaySpinner />;

  return <Outlet />;
};

export default PersistLogin;
