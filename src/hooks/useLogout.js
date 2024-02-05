import useApp from "./useApp";
import useAuth from "./useAuth";
import useOrganism from "./useOrganism";

const useLogout = () => {
  const { setAuthState } = useAuth();
  const { setOrganisms, setSelectedOrganism, setModules } = useOrganism();
  const { setAmlSearchInformation } = useApp();

  const logout = async () => {
    setAuthState({});
    setOrganisms([]);
    setSelectedOrganism({});
    setModules([]);
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("organisms");
    // localStorage.removeItem("selectedOrganism");
    // localStorage.removeItem("iduser");
    localStorage.clear();
    setAmlSearchInformation(null);
  };

  return logout;
};

export default useLogout;
