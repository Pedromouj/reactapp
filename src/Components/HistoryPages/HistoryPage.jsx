import axios from "axios";
import React, { useEffect, useState } from "react";
import Token from "../Tools/Token";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Tools/Pagination";
import convertDate from "../Tools/convertDate";
import { useTranslation } from "react-i18next";

const HistoryPage = () => {
  const [History, setHistory] = useState([]);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalePerPage = 10;
  const startIndex = (currentPage - 1) * totalePerPage;
  const endIndex = startIndex + totalePerPage;
  const visibleData = History.slice(startIndex, endIndex);
  const totalePage = Math.ceil(History.length / totalePerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const fetchHistory = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_USERS}/history/list`, {
      headers: {
        Authorization: Token,
      },
    });
    setHistory(data?.history);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <img src="/banners/banner_history.png" className="w-full" />
      <div className="container mx-auto mt-2 relative overflow-x-auto shadow-xl">
        {/* <div className="bg-[#fffffff3] p-4 shadow w-full flex ">
          <div className=" text-lg font-medium">Orders</div>

        </div> */}
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase  bg-[#edf2f9]">
            <tr className="border-b border-gray-20">
              <th scope="col" className="px-6 py-3  ">
                <div className="flex gap-3 items-center">
                  <div>{t("SEARCHED_KEYWORDS")}</div>
                  <FontAwesomeIcon icon={faClockRotateLeft} className="w-4 h-4" />
                </div>
              </th>

              <th scope="col" className="px-4 py-3  ">
                Dates
              </th>
              <th scope="col" className="px-4 py-3  ">
                Ship to
              </th>
              <th scope="col" className="px-4 py-3  ">
                {t("Results")}
              </th>
              <th scope="col" className="px-4 py-3  ">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((itm) => (
              <tr key={itm.id} className="border-b border-gray-200 ">
                <td className="px-6 py-4">
                  <div className="flex gap-5 items-center ">
                    <span className="text-lg cursor-pointer hover:underline hover:text-blue-600 transition-all duration-100">
                      {itm.keyword}
                    </span>
                  </div>
                </td>

                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap relative  "
                >
                  {convertDate(itm.insert_date).formattedDate}
                </td>
                <td scope="row" className="px-6 py-4 ">
                  ---
                </td>

                <td scope="row" className="px-6 py-4 ">
                  100
                </td>

                <td>
                  <div className="flex gap-3">
                    <button className="bg-[#c9e7ff] capitalize text-[#03365f] border-[#03365f] hover:opacity-60 duration-75 transition-all border p-0.5 font-bold rounded-full text-xs w-24">
                      access
                    </button>
                    <button className="bg-[#f6c4c3] capitalize text-[#d70e0e] border-[#fe211d] hover:opacity-60 duration-75 transition-all border p-0.5 font-bold rounded-full text-xs w-24">
                      delete
                    </button>
                  </div>
                  {/* <FontAwesomeIcon
                    icon={faTrash}
                    className="w-5 h-5 text-red-500 cursor-pointer absolute right-5 transition-all duration-100  hover:opacity-60"
                  /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalePage={totalePage}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default HistoryPage;
