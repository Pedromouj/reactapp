import React, { useEffect, useState } from "react";
import axios from "axios";
function ProgressBarByCount({ category, option, Count }) {
  const [Porcentages, setPorcentages] = useState(0);
  const [CountCategory, setCountCategory] = useState(0);
  const progressWith = document.getElementById("width-" + category);
  const ReturnReelOption = (options) => {
    switch (options) {
      case "keywords":
        return "keyword";
      case "websites":
        return "link";
      case "list":
        return "list";
      default:
        break;
    }
  };

  const FetchCountCategories = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_AML_API_BASE_EXPLORE_URL}/getCount/${category}/${ReturnReelOption(
        option
      )}`
    );

    setPorcentages((Count * 100) / data);
    setCountCategory(data);
  };

  // useEffect(() => {
  //   console.log("Porcentages", Porcentages, Count);
  // }, [Porcentages , ]);

  useEffect(() => {
    FetchCountCategories();
  }, [category, option]);
  // {/*!! important this comment  */}
  //       {/* {Count} / {CountCategory} */}
  //       {Math.floor(Porcentages) ? Math.floor(Porcentages) : 0}%
  return (
    Count > 0 && (
      <div
        className={`mt-3 md:mt-3 w-full flex  sticky top-0 bg-white  p-1 items-center gap-2 flex-col justify-center`}
      >
        <div className={`w-full  flex bg-gray-200 rounded-full h-2`}>
          <div
            className="bg-green-600 h-2 rounded-full"
            id={"width-" + category}
            data-tooltip-content={CountCategory}
            style={{ width: `${Math.floor(Porcentages) > 100 ? 100 : Math.floor(Porcentages)}%` }}
          ></div>
        </div>
        <div
          className={`flex text-xs items-center md:text-sm text-green-700 font-bold mt-1 mb-1`}
          id={category}
        >
          {Math.floor(Porcentages) > 100 ? 100 : Math.floor(Porcentages)}%
        </div>
        {/* {Count}/{CountCategory} */}
      </div>
    )
  );
}

export default ProgressBarByCount;
