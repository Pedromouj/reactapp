import React, { lazy, useMemo, useState } from "react";
import { usePicod } from "../Home";
import ReportCheckbox from "../GenerateReport/ReportCheckbox";
import UsersInfo from "../../Tools/UsersInfo";

const BodaccBlock = lazy(() => import("./Bodacc/BodaccBlock"));
const CompanyHouseHits = lazy(() => import("./API/UK/CompanyHouseHits"));
// const PappersHits = lazy(() => import("../API/France/PappersHits"));
// API UK
const CorpoInformation = ({ entity }) => {
  const { reportInfo, isGeneratingReport } = usePicod();
  const checkIfRightType = (type) => {
    return UsersInfo.permissions.some((itm) => itm === type);
  };
  const [activeTab, setActiveTab] = useState(checkIfRightType("API UK") ? "API UK" : "API france");
  const tabsApi = useMemo(() => [
    {
      label: "api_results",
      api: "UK",
      id: "API UK",
      icon: <img src="https://flagsapi.com/GB/flat/32.png" alt="UK api" />,
    },
    {
      label: "api_results",
      api: "France",
      id: "API france",
      icon: <img src="https://flagsapi.com/FR/flat/32.png" alt="france api" />,
    },
  ]);

  return (
    <div
      className={`relative border rounded w-full ${
        reportInfo?.corpoinformationreport && isGeneratingReport
          ? "border-2 border-blue-500 bg-blue-50 print:bg-inherit print:border print:border-transparent"
          : "border print:hidden"
      }`}
      style={{ pageBreakBefore: "always", pageBreakAfter: "always" }}
    >
      {reportInfo && <ReportCheckbox reportKey="corpoinformationreport" />}
      <div className="gap-2 py-2 px-3 bg-gray-100 ">
        <div className="flex justify-between items-center">
          <h5>global search</h5>
          <img src="/img/icons/corpo.png" width="40" height="40" alt="" />
        </div>
      </div>
      <div className="overflow-auto print:overflow-hidden bg-white mt-2 print:flex-col gap-2 p-2">
        <div className="py-1"></div>
        <hr />
        {/* <ApiTabs /> */}
      </div>
      {UsersInfo.permissions
        .filter((itm) => itm?.toLowerCase()?.includes("api france"))
        .map((itm, i) => (
          <div className="h-full overflow-auto grid grid-cols-12 gap-2 p-1 border rounded mt-2">
            <div className="items-center gap-4">
              <button
                type="button"
                className={`p-2 
                     rounded-md border bg-blue-900 text-white flex items-center justify-between w-full font-bold`}
                key={itm}
              >
                API france
                <img src="https://flagsapi.com/FR/flat/32.png" alt="france api" />,
              </button>
            </div>
            <BodaccBlock libelle={selectedRecord} />
          </div>
        ))}
    </div>
  );
};

const ApiTabs = ({ selectedRecord, activeTab, type }) => {
  if (selectedRecord)
    switch (activeTab) {
      case "API UK":
        return (
          <div className="h-full overflow-auto border rounded mt-2">
            <CompanyHouseHits key={selectedRecord.id} searchTerm={selectedRecord} />
          </div>
        );
      case "API france":
        return (
          <div className="h-full overflow-auto grid grid-cols-12 gap-2 p-1 border rounded mt-2">
            <BodaccBlock libelle={selectedRecord} />
          </div>
        );
      default:
        return null;
    }
};

export default CorpoInformation;
