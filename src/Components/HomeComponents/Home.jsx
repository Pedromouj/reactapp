import React, { createContext, useContext, useRef, useState } from "react";
import { lazy } from "react";
import ResultSearch from "./ResultSearch/ResultSearch";
import PrinterButton from "./GenerateReport/PrinterButton";
import DueNew from "./ResultSearch/Dues/DueNew";
import axios from "axios";
import UsersInfo from "../Tools/UsersInfo";
import ReportHeader from "./GenerateReport/ReportHeader";
import ResultInfoPlus from "./ResultSearch/InfoPlus/ResultInfoPlus";
import NewsBlock from "./ResultSearch/News_Block/NewsBlock";
const SearchBar = lazy(() => import("./SearchBar/SearchBar"));

const PicodContext = createContext({});

export const usePicod = () => useContext(PicodContext);
const Home = () => {
  const [rangeValue, setRangeValue] = useState(50);
  const [notification, setNotification] = useState();
  const [Libelle, setLibelle] = useState();
  const [Data, setData] = useState([]);
  const [Search, setSearch] = useState("");
  const [reportInfo, setReportInfo] = useState({});
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [conclusion, setConclusion] = useState("");
  const pdfContent = useRef(null);
  const [DataDil, setDataDil] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Count, setCount] = useState(0);
  const [currentPageSource, setCurrentPageSource] = useState(1);
  const [CountGlobal, setCountGlobal] = useState(0);
  const [typeBlock, setTypeBlock] = useState(null);
  const [B2bDataEntite, setB2bDataEntite] = useState([]);
  const [B2bDataPerson, setB2bDataPerson] = useState([]);
  const fetchAll = async () => {
    // setDataDil([]);
    setCount((prev) => prev + 1);
    try {
      // Temporary array to accumulate the newly fetched data
      // Fetch data for each category
      let currentPage = currentPageSource;
      let categoryData;
      let organicData = [];
      setLoading(true);
      UsersInfo?.permissions
        ?.filter((itm) => itm.startsWith("xplore"))
        ?.map(async (itm) => {
          while (organicData.length === 0 && currentPage < 2) {
            const { data } = await axios.get(
              `${import.meta.env.VITE_AML_API_BASE_EXPLORE_URL}/getlast/keywords/${itm.replace(
                "xplore ",
                ""
              )}?keyword=${Search}&page=${currentPage}`
            );

            organicData = data?.googleRes?.organic || [];
            // If the organic data is not empty, update the state and break the loop

            categoryData = { categorie: itm.replace("xplore ", ""), Data: data };
            setCountGlobal(10);
            setDataDil((prevData) => [...prevData, categoryData]);
            if (organicData.length > 0) {
              setCurrentPageSource((prev) => prev + 1);
            } else {
              currentPage++;
              // Move to the next page for the next iteration
            }
          }
        });
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const obj = {
    conclusion,
    setConclusion,
    pdfContent,
    reportInfo,
    setReportInfo,
    isGeneratingReport,
    setIsGeneratingReport,
    setB2bDataEntite,
    B2bDataEntite,
    setB2bDataPerson,
    B2bDataPerson,
    notification,
    setNotification,
  };

  return (
    <PicodContext.Provider value={obj}>
      <div className="w-full">
        <SearchBar
          setData={setData}
          setTypeBlock={setTypeBlock}
          Search={Search}
          setSearch={setSearch}
          setRangeValue={setRangeValue}
          rangeValue={rangeValue}
          setLibelle={setLibelle}
          fetchAll={fetchAll}
        />
        <div
          ref={pdfContent}
          className={` print-content  grid  sm:grid-cols-2 lg:grid-cols-12  print:overflow-visible print:!flex print:!flex-col print:px-2 gap-5 items-center mt-16  w-[95%] mx-auto  `}
        >
          <ReportHeader selectedRecord={Libelle} />
          <ResultSearch
            Data={Data}
            typeBlock={typeBlock}
            keyword={Libelle}
            pdfContent={pdfContent}
            rangeValue={rangeValue}
          />

          <DueNew
            setData={setDataDil}
            Data={DataDil}
            CountGlobal={CountGlobal}
            categorie={""}
            setCurrentPageSource={setCurrentPageSource}
            setLoading={setLoading}
            setCountGlobal={setCountGlobal}
            loading={loading}
            Count={Count}
            keyword={Libelle}
            setCount={setCount}
          />

          {UsersInfo?.permissions?.includes("infosplus") && Libelle && (
            <ResultInfoPlus keyword={Libelle} />
          )}

          {UsersInfo?.permissions?.includes("news") && Libelle && <NewsBlock keyword={Libelle} />}
        </div>
      </div>
      {Data.length > 0 && <PrinterButton keyword={Libelle} />}
    </PicodContext.Provider>
  );
};

export default Home;
