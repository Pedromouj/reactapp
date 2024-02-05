import React from "react";
import { usePicod } from "../Home";
import ReportCheckbox from "../GenerateReport/ReportCheckbox";
import news from "/block_icons/news_icon_picod.svg";
import pep from "/block_icons/pep_icon_picod.svg";
import sanctionmanda from "/block_icons/sanction_mandatory_icon_picod.svg";
import sanctionsob from "/block_icons/sanctionsob.svg";
import xplore from "/block_icons/xplore.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import InfoPlus from "/block_icons/info_plus_icon_picod.svg";
import InfoInternationale from "/block_icons/sanction_international_icon_picod.svg";
import { faGlobe, faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function ReturnCardHeader({ type }) {
  const { reportInfo, isGeneratingReport } = usePicod();
  switch (type) {
    case "pep":
      return (
        <>
          <ReportCheckbox reportKey={type} />
          <div
            className={`${
              reportInfo[type] && isGeneratingReport
                ? "border-2 border-blue-600  print:border-inherit print:!mt-5 bg-blue-50  print:bg-inherit"
                : "print:hidden"
            }  flex items-center sticky  top-0 z-30   bg-[#d9f6ff] p-1  max-w-2xl `}
          >
            <span
              className={` text-xl text-left font-bold flex gap-3 items-center mt-3  w-full mb-3 ml-3 p-1 uppercase  print:!max-h-full print:overflow-visible`}
            >
              {type}
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="w-5 h-5 cursor-pointer hover:opacity-60 text-[#1f263e]"
                title={type}
              />
            </span>
            <img src={pep} className="w-16 h-14" />
            {/* <FontAwesomeIcon icon={faUser} className="w-16 h-10" /> */}
          </div>
        </>
      );
    case "sanctions obligatoire":
      return <div>sanctions obligatoire (icon)</div>;
    case "news":
      return (
        <>
          <ReportCheckbox reportKey={type} />
          <div
            className={`${
              reportInfo[type] && isGeneratingReport
                ? "border-2 border-blue-600   print:border-inherit print:!mt-5 bg-blue-50 print:bg-inherit"
                : "print:hidden"
            }  flex items-center sticky  top-0 z-30  bg-[#f3f4f6] p-1  w-full  `}
          >
            <span
              className={` text-xl text-left font-bold mt-3 flex gap-3 items-center w-full mb-3 ml-3 p-1 uppercase  print:!max-h-full print:overflow-visible`}
            >
              {type}
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="w-5 h-5 cursor-pointer hover:opacity-60 text-[#1f263e]"
                title={type}
              />
            </span>
            <img src={news} className="w-16 h-10" />
          </div>
        </>
      );
    case "mandatory sanction":
      return (
        <>
          <ReportCheckbox reportKey={type} />
          <div
            className={`${
              reportInfo[type] && isGeneratingReport
                ? "border-2 border-blue-600  print:border-inherit print:!mt-5 bg-blue-50 print:bg-inherit"
                : "print:hidden"
            }  flex items-center sticky  top-0 z-30  bg-[#ffbcba] p-1  max-w-2xl  `}
          >
            <span
              className={` text-xl text-left font-bold mt-3 flex gap-3 items-center  w-full mb-3 ml-3 p-1 uppercase  print:!max-h-full print:overflow-visible`}
            >
              {type}
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="w-5 h-5 cursor-pointer hover:opacity-60 text-[#1f263e]"
                title={type}
              />
            </span>
            <img src={sanctionmanda} className="w-16 h-10" />
          </div>
        </>
      );
    case "xplore":
      return <div>xplore (icon)</div>;
    case "international sanction":
      return (
        <>
          <ReportCheckbox reportKey={type} />
          <div
            className={`${
              reportInfo[type] && isGeneratingReport
                ? "border-2 border-blue-600  print:border-inherit print:!mt-5 bg-blue-50 print:bg-inherit"
                : "print:hidden"
            }  flex items-center sticky  top-0 z-30  bg-[#eef6ff] p-1  max-w-2xl  `}
          >
            <span
              className={` text-xl text-left font-bold mt-3  flex gap-3 items-center w-full mb-3 ml-3 p-1 uppercase  print:!max-h-full print:overflow-visible`}
            >
              {type}
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="w-5 h-5 cursor-pointer hover:opacity-60 text-[#1f263e]"
                title={type}
              />
            </span>
            {/* <FontAwesomeIcon className="w-16 h-10" icon={faGlobe} /> */}
            <img src={InfoInternationale} className="w-16 h-10" />
          </div>
        </>
      );
    case "xplore investigation":
      return <div>xplore investigation (icon)</div>;

    case "infosplus":
      return (
        <>
          <div className={`flex items-center sticky  top-0 z-30  bg-[#baffbd] p-1  max-w-2xl  `}>
            <span
              className={` text-xl text-left font-bold mt-3  flex gap-3 items-center w-full mb-3 ml-3 p-1 uppercase  print:!max-h-full print:overflow-visible`}
            >
              {type}
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="w-5 h-5 cursor-pointer hover:opacity-60 text-[#1f263e]"
                title={type}
              />
            </span>
            <img src={InfoPlus} className="w-16 h-16" />
          </div>
        </>
      );
  }
}

export default ReturnCardHeader;
