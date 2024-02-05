import axios from "axios";
import React, { useEffect, useState } from "react";
import ReturnCardHeader from "../ReturnCardHeader";
import Highlighter from "react-highlight-words";
import Token from "../../../Tools/Token";
import MessageToken from "../../../Tools/MessageToken";
import _ from "lodash";
function ResultInfoPlus({ keyword }) {
  const [InfoPlus, setInfoPlus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const FechDataInfosPlus = async () => {
    setCurrentPage((prev) => prev + 1);
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL_USERS}/explore/infosplus/${keyword}?page=${currentPage}`,
      {
        headers: {
          Authorization: Token,
        },
      }
    );
    const organicData = data?.googleRes?.organic || [];
    // setInfoPlus(organicData);
    setInfoPlus((prev) => [...prev, ...organicData]);
  };

  // Debounce the fetchData function with lodash
  const debouncedFetchData = _.debounce(FechDataInfosPlus, 300);

  useEffect(() => {
    debouncedFetchData();
    return () => debouncedFetchData.cancel();
  }, [keyword]);
  //   console.log("InfoPlus", InfoPlus);

  return (
    <div className="col-span-4  rounded  w-full max-w-2xl mx-auto md:p-0  bg-white shadow-lg border  print:!overflow-hidden  print:!h-full   print:!border-none  print:!shadow-none  print:!justify-center   border-gray-200  sm:p-8  overflow-x-hidden">
      <ReturnCardHeader type={"infosplus"} />
      {InfoPlus?.length > 0 ? (
        <div className=" h-80 overflow-y-auto">
          <ul className=" w-[95%] mx-auto mt-5">
            {InfoPlus?.map((item, idx) => (
              <li key={idx} className="mb-2   w-full border p-1 rounded">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold hover:underline text-sm"
                >
                  <Highlighter
                    highlightClassName="bg-yellow-500 rounded-full p-0.5 text-white"
                    searchWords={[keyword]}
                    autoEscape={true}
                    textToHighlight={item.title}
                  />
                </a>
                <p className="text-gray-700 text-sm">
                  <Highlighter
                    highlightClassName="bg-yellow-500 font-semibold rounded-full p-0.5 text-white"
                    searchWords={[keyword]}
                    autoEscape={true}
                    textToHighlight={item.snippet}
                  />
                </p>
              </li>
            ))}
            <ul className="flex gap-3 mb-3 justify-center  mt-3 mr-3">
              <li
                onClick={FechDataInfosPlus}
                className={`bg-[#1f263e]  p-1 text-white shadow text-sm font-bold hover:opacity-60 transition-all duration-100 py-2 rounded-md cursor-pointer`}
              >
                Voir plus
              </li>
            </ul>
          </ul>
        </div>
      ) : (
        <div className="text-center text-lg flex gap-5 justify-center mt-16">
          {InfoPlus?.map((item, idx) => item.status && <MessageToken />)}

          {InfoPlus.length === 0 && "NEANT"}
        </div>
      )}
    </div>
  );
}

export default ResultInfoPlus;
