import { Route, Routes,  useNavigate } from "react-router-dom";
import "./App.css";
import { lazy, useEffect } from "react";
import Token from "./Components/Tools/Token";
import { isExpired } from "react-jwt";
import RequireAuth from "./RequireAuth";
import PrincipaleEmployes from "./Components/Employes/PrincipaleEmployes";
import Absences from "./Components/Calendrier/Absences";
import Pointages from "./Pointages/Pointages";

const Login = lazy(() => import("./Components/Login"));
const Dashboard = lazy(() => import("./Components/Dashboard/Dashboard"));
const Layout = lazy(() => import("./Components/Layout"));
const DashboardPage = lazy(() => import("./Components/Dashboard/DashboardPage"));

function App() {
  const history = useNavigate();
  useEffect(() => {
    const checkTokenExpiration = () => {
      if (isExpired(Token)) {
        history("/login");
      } else {
        history("/");
      }
    };
    checkTokenExpiration();

    // Set up a setInterval to check token expiration every 10 minutes
    const intervalId = setInterval(checkTokenExpiration, 10 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [Token]);

  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      {/* <Route element={<PersistLogin />}></Route> */}
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<DashboardPage />} />
            <Route path="employe" element={<PrincipaleEmployes />} />
            <Route path="Calendrier" element={<Absences />} />
            <Route path="pointages" element={<Pointages />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
