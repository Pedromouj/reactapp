import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
// import franceLoc from "./france.png";
import OverlaySpinner from "../../../Spinner/OverlaySpinner";
import Modal from "../../../Tools/Modals";
import DetailBodacc from "./DetailBodacc";
import ReportCheckbox from "../../GenerateReport/ReportCheckbox";
import { usePicod } from "../../Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function BodaccBlock({ libelle, rangeValue }) {
  const [companyNumberRep, setCompanyNumberRep] = useState([]);
  const [Bodacc, setBodacc] = useState([]);
  const [ShowDetail, setShowDetail] = useState(false);
  const [companyNumber, setCompanyNumber] = useState([]);
  const { reportInfo, isGeneratingReport } = usePicod();
  const FetchBodaccInfo = async () => {
    const { data } = await axios.get(
      `https://bodacc-datadila.opendatasoft.com/api/records/1.0/search/?dataset=annonces-commerciales&q=${libelle}&facet=publicationavis&facet=publicationavis_facette&facet=typeavis&facet=typeavis_lib&facet=familleavis&facet=familleavis_lib&facet=numerodepartement&facet=departement_nom_officiel`
    );

    setBodacc(data?.records);
  };

  useEffect(() => {
    FetchBodaccInfo();
  }, [libelle]);

  const handleShowDetails = async (id) => {
    setShowDetail((prev) => !prev);
    setCompanyNumber(id);
  };

  const addObjectToObject = (itm) => {
    setCompanyNumberRep([...new Set([...companyNumberRep, itm])]);
    console.log("companyNumberRep", companyNumberRep);
  };
  return Bodacc?.length > 0 ? (
    <>
      {Bodacc?.filter((itm) =>
        rangeValue > 50
          ? itm?.fields?.commercant?.toLowerCase()?.trim() === libelle?.toLowerCase()?.trim()
          : itm
      ).map((itm) => (
        <>
          <div
            onClick={() => handleShowDetails(itm?.fields?.registre?.slice(-9)?.replace(/ /g, ""))}
            key={itm?.fields?.registre?.slice(-9)}
            className={`${
              reportInfo[
                itm.fields.tribunal + itm?.fields?.registre?.slice(-9).replace(/ /g, "")
              ] && isGeneratingReport
                ? "border-2 border-blue-600  print:border-inherit bg-blue-50 print:bg-inherit"
                : "print:hidden"
            } p-2 h-24  w-full  col-span-12 hover:border-blue-600  cursor-pointer border border-b-gray-300 hover:border hover:rounded `}
          >
            <ReportCheckbox
              onClick={(e) => {
                addObjectToObject(itm?.fields?.registre?.slice(-9)?.replace(/ /g, ""));
                e.stopPropagation();
              }}
              reportKey={itm.fields.tribunal + itm?.fields?.registre?.slice(-9).replace(/ /g, "")}
            />
            <div
              className={`   flex flex-col h-full cursor-pointer mb-2`}
              // onClick={() => handleShowDetails(itm?.fields?.registre?.slice(-9)?.replace(/ /g, ""))}
            >
              <div className="flex flex-col h-full mb-2">
                <div className="flex gap-5 items-start">
                  <div className="flex flex-col flex-grow">
                    <span className="text-sm flex justify-between">
                      <h6 className="font-semibold">{itm.fields.commercant}</h6>
                    </span>
                    <span className="text-sm text-gray-700 capitalize">
                      {itm.fields.dateparution}
                    </span>
                    <span className="text-sm text-gray-700">{itm.fields.tribunal}</span>
                  </div>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="w-5 h-5 text-blue-600 hover:opacity-60 duration-100 transition-all cursor-pointer"
                    onClick={() => {
                      e.stopPropagation();
                      handleShowDetails(itm?.fields?.registre?.slice(-9)?.replace(/ /g, ""));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {reportInfo[itm.fields.tribunal + itm?.fields?.registre?.slice(-9).replace(/ /g, "")] &&
            isGeneratingReport &&
            companyNumberRep
              ?.filter((item) => item === itm?.fields?.registre?.slice(-9)?.replace(/ /g, ""))
              ?.map((item, i) => (
                <div
                  className={` ${
                    reportInfo[
                      itm.fields.tribunal + itm?.fields?.registre?.slice(-9).replace(/ /g, "")
                    ] && isGeneratingReport
                      ? "border-2 border-blue-600  print:border-inherit print:mt-5  print:!h-full print!:overflow-hidden print:bg-inherit "
                      : "print:hidden"
                  }`}
                >
                  <DetailBodacc companyNumber={item} key={i} />
                </div>
              ))}
        </>
      ))}
      <Modal isOpen={ShowDetail} setIsOpen={setShowDetail}>
        <DetailBodacc companyNumber={companyNumber} />
      </Modal>
    </>
  ) : (
    <Data_Not_Found />
  );
}

const Data_Not_Found = () => {
  const [Show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 3000);
  }, []);
  if (Show) {
    return <div className="w-full  text-center col-span-12 mb-5">Data not found</div>;
  } else {
    return <OverlaySpinner />;
  }
};

export default BodaccBlock;
