import { useContext } from "react";
import OrganismContext from "../context/organismProvider";

const useOrganism = () => useContext(OrganismContext);

export default useOrganism;
