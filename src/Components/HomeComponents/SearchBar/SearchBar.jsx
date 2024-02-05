import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect } from "react";
import UsersInfo from "../../Tools/UsersInfo";
import Token from "../../Tools/Token";
import picod_banner from "/banners/banner_picod.png";
import { usePicod } from "../Home";
import { useTranslation } from "react-i18next";

const SearchBar = ({
  setData,
  setSearch,
  Search,
  setRangeValue,
  rangeValue,
  fetchAll,
  setTypeBlock,
  setLibelle,
}) => {
  const { setB2bDataEntite, setB2bDataPerson } = usePicod();
  const { t } = useTranslation();
  const fetchDataAndSearchB2b = async () => {
    try {
      setLibelle(Search);
      console.log("Token", Token);

      const usersBaseUrl = import.meta.env.VITE_API_BASE_URL_USERS;

      const promises = UsersInfo?.permissions
        ?.filter(
          (itm) => !itm.startsWith("xplore") && !itm.includes("news") && !itm.includes("infosplus")
        )
        .map((itm) =>
          axios.get(`${usersBaseUrl}/search/${itm}/${Search}`, {
            headers: {
              Authorization: Token,
            },
          })
        );

      // Include the post request in the promises
      promises.push(
        axios.post(
          `${usersBaseUrl}/history/add`,
          {
            id_user: UsersInfo.userid,
            keyword: Search,
          },
          {
            headers: {
              Authorization: Token,
            },
          }
        )
      );

      const responses = await Promise.all(promises);

      const dataResponses = responses.slice(0, -1); // Exclude the last response (post request)
      // const postResponse = responses[responses.length - 1]; // Last response is the post request

      // Handle the data responses
      const data = dataResponses.map((response) => response.data);
      const mergedData = data.reduce((merged, current) => merged.concat(current), []);
      // const typeblock = data.reduce((merged, current) => merged.concat(current?.obj), []);
      setTypeBlock([]);
      setData(mergedData);
      console.log("mergedData", mergedData, data);

      // Handle the postResponse if needed
      // const postData = postResponse.data;
      // Process postData here

      // Call SearchB2b function
      var b2bRequest1, b2bRequest2;
      if (UsersInfo.permissions.includes("IndividuGlobal")) {
        b2bRequest1 = axios.get(
          `${import.meta.env.VITE_AML_API_BASE_CORPO_URL}/api/b2bSearchEntite/${Search}`
        );
      } else if (UsersInfo.permissions.includes("entitiesGlobal")) {
        b2bRequest2 = axios.get(
          `${import.meta.env.VITE_AML_API_BASE_CORPO_URL}/api/b2bSearchPerson/${Search}`
        );
      } else {
      }

      const [b2bResponse1, b2bResponse2] = await Promise.all([b2bRequest1, b2bRequest2]);

      console.log("B2B Response 1:", b2bResponse1.data);
      console.log("B2B Response 2:", b2bResponse2.data);

      setB2bDataEntite(b2bResponse1.data);
      setB2bDataPerson(b2bResponse2.data);

      // Call fetchAll function
      fetchAll();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log("Token", Token);
  }, []);

  const predefinedValues = [0, 50, 100];

  const handleRangeChange = (event) => {
    const newPosition = parseInt(event.target.value, 10); // Use base 10
    const newValue = predefinedValues[newPosition];
    setRangeValue(newValue);
  };

  const handleKeyDown = (event) => {
    // Check if the pressed key is 'Enter'
    if (event.key === "Enter") {
      // Perform the search with the current searchTerm
      fetchDataAndSearchB2b();
    }
  };

  return (
    <>
      <img src={picod_banner} className="w-full mt-3  " draggable={false} />

      <div className="container w-[80%] mx-auto mt-10">
        <div className="flex">
          <div className="relative w-full">
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50  border border-l-2 rounded-full  border-gray-300 focus:outline-none "
              placeholder={`${t("search")}... `}
              onKeyDown={handleKeyDown}
              required
            />
            <button
              onClick={fetchDataAndSearchB2b}
              type="button"
              className="absolute top-0 right-0 h-full p-2.5 rounded-r-full text-sm font-medium text-white bg-[#1f263e]  border border-[#1f263e] hover:bg-blue-800 focus:ring-4 focus:outline-none"
            >
              <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mx-auto">
          <input
            id="default-range"
            type="range"
            min={0}
            max={predefinedValues.length - 1} // Adjust the max value based on the array length
            step={1}
            value={predefinedValues.indexOf(rangeValue)}
            onChange={handleRangeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer  slider-thumb "
          />
          <div>
            <b>{t("exact_match")}</b> : {rangeValue}%
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
