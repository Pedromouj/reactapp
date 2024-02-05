import React from "react";
import UsersInfo from "../../Tools/UsersInfo";
import BodaccBlock from "./Bodacc/BodaccBlock";
import CompanyHouseHits from "./API/UK/CompanyHouseHits";
import { usePicod } from "../Home";
import ReportCheckbox from "../GenerateReport/ReportCheckbox";

const BlockAPIS = ({ keyword, Data, rangeValue }) => {
  return (
    Data.length > 0 &&
    UsersInfo.permissions
      ?.filter(
        (itm) =>
          itm?.toLowerCase()?.includes("api france") || itm?.toLowerCase()?.includes("api uk")
      )
      ?.map((itm, i) => (
        <div className="col-span-4   print:col-span-12 max-w-md  shadow-lg border  print:!h-full print:!max-w-full print:!mt-10   print:!flex print:!flex-col   print:!border-none  print:!shadow-none  print:!justify-center   rounded-lg md:p-0 sm:p-8  h-96 overflow-auto">
          {itm?.toLowerCase()?.includes("france") ? (
            <>
              <ReturnTab item={itm} libelle={"API france"} iso={"FR"} />
              <BodaccBlock libelle={keyword} rangeValue={rangeValue} />
            </>
          ) : (
            <>
              <ReturnTab item={itm} libelle={"API UK"} iso={"GB"} />
              <CompanyHouseHits key={itm} searchTerm={keyword} rangeValue={rangeValue} />
            </>
          )}
        </div>
      ))
  );
};

export default BlockAPIS;

const ReturnTab = ({ libelle, iso, item }) => {
  const { reportInfo, isGeneratingReport } = usePicod();

  return (
    <button
      type="button"
      className={`p-2 
       ${
         reportInfo[libelle + iso] && isGeneratingReport
           ? "border-2 border-blue-600  print:border-inherit "
           : "print:hidden"
       }
       rounded-t-md border  bg-blue-900 text-white flex items-center justify-between w-full font-bold`}
      key={item}
    >
      <div className="mb-8">
        <ReportCheckbox reportKey={libelle + iso} />
      </div>
      <div>{libelle}</div>
      <div>
        <img src={`https://flagsapi.com/${iso}/flat/32.png`} alt="france api" />
      </div>
    </button>
  );
};
