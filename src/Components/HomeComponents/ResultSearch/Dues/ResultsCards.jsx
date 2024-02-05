import React, { useEffect, useState } from "react";
import axios from "axios";
import { faSearch, faGlobe, faList, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FetchResult from "./FetchResult";
import ProgressFuction from "./ProgressFuction";
import Spinner from "../../../Spinner/Spinner";
function ResultsCards({
  Categorie,
  subCat,
  setSubCat,
  keyword,
  Data,
  index = -1,
  setData,
  setCount,
  CountGlobal,
  setCountGlobal,
}) {
  const [GlobalCount2, setGloubalCount2] = useState(20);
  const [Count2, setCount2] = useState(0);
  const [Count3, setCount3] = useState(0);
  const [Result, setResult] = useState([]);
  const [List, setList] = useState([]);
  const [Table, setTable] = useState("keywords");
  const [Index, setIndex] = useState(-1);
  const [OneLoading, setOneLoading] = useState(false);
  const [Pagination1, setPagination1] = useState(2);
  const [Pagination2, setPagination2] = useState(2);
  const [Pagination3, setPagination3] = useState(2);
  const progressWith = document.getElementById("width-" + Categorie);
  const fetchData = async (table, Pagination, setPagination, category) => {
    try {
      var organicData = [];
      let currentPage = Pagination;
      let currentProgress = GlobalCount2;
      var Porcentages = 0;
      while (organicData.length === 0) {
        setOneLoading(true);
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_AML_API_BASE_EXPLORE_URL
          }/getlast/${table}/${Categorie}?keyword=${keyword}&page=${currentPage}`
        );
        organicData = data?.googleRes?.organic || [];
        const categoryData = { categorie: Categorie, Data: data };
        const progressWith = document.getElementById("width-" + category);

        Porcentages = (currentProgress * 100) / progressWith?.getAttribute("data-tooltip-content");

        if (Math.floor(Porcentages) > 100 || data?.websitesQuery === "") {
          break;
        }
        const progressElement = document.getElementById(category);

        if (progressElement?.textContent === "100%") {
          break;
        }
        if (organicData.length > 0) {
          setPagination((prev) => prev + 1);
          ProgressFuction(setGloubalCount2, Categorie, currentProgress);

          if (table === "list") {
            setList((prev) => [...prev, ...organicData]);
          } else if (table === "websites") {
            setResult((prev) => [...prev, ...organicData]);

            // setGloubalCount((prev) => prev + 10);
          } else {
            setOneLoading(false);
          }
        } else {
          currentPage++;
          currentProgress += 10;
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOneLoading(false);
    }
  };

  const fetchDataByCategorie = async (table, setCount) => {
    setIndex(index);
    setTable(table);
  };

  const fetchAllPagination = async (table, category) => {
    let currentPage = Pagination3;
    let currentProgress = GlobalCount2;
    let organicData = [];
    if (table === "keywords") {
      while (organicData.length === 0) {
        setOneLoading(true);
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_AML_API_BASE_EXPLORE_URL
          }/getlast/keywords/${Categorie}?keyword=${keyword}&page=${currentPage}`
        );

        organicData = data?.googleRes?.organic || [];

        if (currentPage > 5 && data?.websitesQuery === "") {
          break;
        }
        // const progressWith = document.getElementById("width-" + category);
        // const Porcentages = (currentProgress * 100) / progressWith.getAttribute("data-tooltip-content");

        if (organicData.length > 0) {
          setData((prevData) => {
            return prevData.map((category) => {
              if (category.categorie === Categorie) {
                return {
                  ...category,
                  Data: {
                    ...category.Data,
                    googleRes: {
                      ...category.Data.googleRes,
                      organic: category.Data.googleRes.organic.concat(organicData),
                    },
                  },
                };
              }
              return category;
            });
          });
          setPagination3((prev) => prev + 1);
          ProgressFuction(setGloubalCount2, category, currentProgress);

          // setCountGlobal((prev) => prev + 10);
        } else {
          currentPage++;
          currentProgress += 10;
        }

        setOneLoading(false);
      }
    }
  };

  return (
    <div className="col-span-4   print:hidden  bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-100  h-96 ">
      <span class="bg-green-50 flex justify-center w-auto mx-auto text-green-800 text-sm border border-green-500 shadow-md mb-4 mt-4 font-medium mr-2 px-2.5 py-0.5 rounded">
        {Categorie}
        {/* {progressWith?.getAttribute("data-tooltip-content")} */}
      </span>
      {/* -- Count : {CountGlobal} */}
      <div className="flex  flex-col md:flex-row justify-center mt-4 space-y-2 md:space-y-0 ">
        <button
          key={`google-keyword-button`}
          onClick={() => {
            fetchDataByCategorie("keywords", setCount2);
            setSubCat(Categorie);
          }}
          className={`flex gap-2 w-auto  text-sm font-medium items-center space-x-3 p-2  ${
            Table === "keywords"
              ? "bg-blue-600 text-white shadow-md hover:opacity-60 transition-opacity duration-100"
              : "bg-white border hover:bg-blue-600 hover:text-white hover:border-white   border-blue-600 text-blue-600"
          } h-10 w-full md:w-1/3`}
        >
          <FontAwesomeIcon icon={faKeyboard} className="w-5 h-5 cursor-pointer" />
          Keyword
        </button>
        <button
          key={`google-results-button`}
          onClick={() => {
            fetchDataByCategorie("websites", setCount);
            setSubCat(Categorie);
          }}
          className={`flex gap-2 w-auto items-center text-sm space-x-3 p-2 ${
            Table === "websites"
              ? "bg-blue-600 text-white shadow-md hover:opacity-60 transition-opacity duration-100"
              : "bg-white border hover:bg-blue-600 hover:text-white hover:border-white   border-blue-600 text-blue-600"
          } h-10 w-full md:w-1/3`}
        >
          <FontAwesomeIcon icon={faGlobe} className="w-5 h-5 cursor-pointer" />
          Source
        </button>
        <button
          key={`google-list-button`}
          onClick={() => {
            fetchDataByCategorie("list", setCount3);
            setSubCat(Categorie);
          }}
          className={`flex gap-2 w-auto items-center space-x-3 text-sm p-2 ${
            Table === "list"
              ? "bg-blue-600 text-white shadow-md hover:opacity-60 transition-opacity duration-100"
              : "bg-white border hover:bg-blue-600 hover:text-white hover:border-white border-blue-600 text-blue-600"
          } h-10 w-full md:w-1/3`}
        >
          <FontAwesomeIcon icon={faList} className="w-5 h-5 cursor-pointer" />
          List
        </button>
      </div>

      <div
        onMouseEnter={() => {
          setSubCat(Categorie);
        }}
        className="col-span-1 max-h-96 overflow-y-auto rounded-b-lg border border-gray-300 p-4  h-64 "
      >
        {(Table === "websites" && (
          <>
            <h4 className="text-base   font-semibold mb-2  text-white bg-gray-700 shadow-lg p-0.2 rounded-lg flex gap-2 items-center justify-between">
              <span className="ml-2">
                Search Results of <span className="underline font-bold ml-2"> "{keyword}"</span>
              </span>
              <DetectIconFromTable table={Table} />
            </h4>
            {Result.length > 0 && (
              <FetchResult
                Result={Result}
                option={Table}
                category={Categorie}
                CountGlobal={CountGlobal}
                word={keyword}
              />
            )}
            {OneLoading && <Spinner classes={"flex justify-center cursor-pointer"} />}
            {progressWith?.getAttribute("data-tooltip-content") !== "0" ? (
              <ul className="flex gap-3 justify-center  mt-3 mr-3">
                <li
                  className={`bg-green-500 p-1 text-white shadow text-sm font-bold hover:opacity-60 transition-all duration-100 py-2 rounded-md cursor-pointer`}
                  onClick={() => fetchData(Table, Pagination1, setPagination1, Categorie)}
                >
                  Voir plus
                </li>
              </ul>
            ) : (
              <span className="flex justify-center mt-2">There's no category</span>
            )}
          </>
        )) ||
          (Table === "list" && (
            <>
              <h4 className="text-base  font-semibold mb-2 shadow-lg text-white bg-gray-700  p-0.2 rounded-lg flex gap-2 items-center justify-between">
                <span className="ml-2">
                  Search Results of <span className="underline font-bold ml-2"> "{keyword}"</span>
                </span>
                <DetectIconFromTable table={Table} />
              </h4>

              {List.length > 0 && (
                <FetchResult
                  Result={List}
                  option={Table}
                  category={Categorie}
                  CountGlobal={CountGlobal}
                  word={keyword}
                />
              )}

              {OneLoading && <Spinner classes={"flex justify-center cursor-pointer"} />}
              {progressWith?.getAttribute("data-tooltip-content") !== "0" ? (
                <ul className="flex gap-3 justify-center  mt-3 mr-3">
                  <li
                    className={`bg-green-500 p-1 text-white text-sm shadow font-bold hover:opacity-60 transition-all duration-100 py-2 rounded-md cursor-pointer`}
                    onClick={() => fetchData(Table, Pagination2, setPagination2, Categorie)}
                  >
                    Voir plus
                  </li>
                </ul>
              ) : (
                <span className="flex justify-center mt-2">There's no category</span>
              )}
            </>
          ))}
        {Table === "keywords" && (
          <>
            <h4 className="text-base  font-semibold  shadow-lg text-white bg-gray-700 p-0.2 rounded-lg flex gap-2 items-center justify-between">
              <span className="ml-2">
                Search Results of <span className="underline font-bold ml-2"> "{keyword}"</span>
              </span>
              <DetectIconFromTable table={"keywords"} />
            </h4>
            <FetchResult
              Result={Data}
              OneLoading={OneLoading}
              Categorie={Categorie}
              Paginations={Pagination3}
              subCat={subCat}
              setPaginations={setPagination3}
              CountGlobal={CountGlobal}
              option={Table}
              word={keyword}
              category={Categorie}
            />
            {OneLoading && <Spinner classes={"flex justify-center cursor-pointer"} />}
            {progressWith?.getAttribute("data-tooltip-content") !== "0" ? (
              <ul className="flex gap-3 justify-center  mt-3 mr-3">
                <li
                  className={`bg-green-500 p-1 text-white shadow text-sm font-bold hover:opacity-60 transition-all duration-100 py-2 rounded-md cursor-pointer`}
                  onClick={() => fetchAllPagination(Table, Categorie)}
                >
                  Voir plus
                </li>
              </ul>
            ) : (
              <span className="flex justify-center mt-2">There's no category</span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ResultsCards;

const DetectIconFromTable = ({ table }) => {
  switch (table) {
    case "keywords":
      return <FontAwesomeIcon icon={faKeyboard} className="w-5 h-5 cursor-default mr-2" />;
    case "list":
      return <FontAwesomeIcon icon={faList} className="w-5 h-5 cursor-default mr-2" />;
    case "websites":
      return <FontAwesomeIcon icon={faGlobe} className="w-5 h-5 cursor-default mr-2" />;
  }
};
