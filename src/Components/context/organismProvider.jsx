import { createContext, useState, useEffect } from "react";

const OrganismContext = createContext({});

export const OrganismProvider = ({ children }) => {
  const [organisms, setOrganisms] = useState([]);
  const [selectedOrganism, setSelectedOrganism] = useState({});
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState({});

  useEffect(() => {
    const localOrganisms = localStorage.getItem("organisms");
    const localSelectedOrganism = localStorage.getItem("selectedOrganism");
    const localModules = localStorage.getItem("modules");
    const localSelectedModules = localStorage.getItem("selectedModule")

    // if no organisms in localstorage
    // TODO: handle

    setOrganisms(JSON.parse(localOrganisms));
    setSelectedOrganism(JSON.parse(localSelectedOrganism));
    setModules(JSON.parse(localModules));
    setSelectedModule(JSON.parse(localSelectedModules))
  }, []);

  return (
    <OrganismContext.Provider
      value={{
        organisms,
        setOrganisms,
        selectedOrganism,
        setSelectedOrganism,
        modules,
        setModules,
        selectedModule,
        setSelectedModule,
      }}
    >
      {children}
    </OrganismContext.Provider>
  );
};

export default OrganismContext;
