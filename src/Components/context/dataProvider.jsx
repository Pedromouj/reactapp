import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [texte, setTexte] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [stats, setStats] = useState(null);
  const [scrapedData, setScrapedData] = useState(null);

  // State for pagination
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(100);

  return (
    <DataContext.Provider
      value={{
        texte,
        setTexte,
        searchResult,
        setSearchResult,
        scrapedData,
        setScrapedData,
        stats,
        setStats,
        n1,
        setN1,
        n2,
        setN2,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
