import { useContext } from "react";
import AppContext from "../context/appProvider";
const useApp = () => useContext(AppContext);

export default useApp;
