import { useContext } from "react";
import DataContext from "../context/dataProvider";

const useData = () => useContext(DataContext);

export default useData;
