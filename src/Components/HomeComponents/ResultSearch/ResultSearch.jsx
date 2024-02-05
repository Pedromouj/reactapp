import React, { useEffect, useRef, useState } from "react";
import ColorByType from "../../Tools/ColorByType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Tools/Modals";
import Avatar from "/icons/avatar.png";
import http from "../../Tools/HttpAxios";
import InfoCard from "./InfoCards";
import ReportCheckbox from "../GenerateReport/ReportCheckbox";
import { usePicod } from "../Home";
import Token from "../../Tools/Token";
import axios from "axios";
import UsersInfo from "../../Tools/UsersInfo";
import EntityImage from "../../AMLCheck/EntityImage";
import DisplayCountries from "../../common/AMLCheck/DisplayCountries";
import BlockAPIS from "./BlockAPIS";
import ShowResultB2b from "./DataB2b/ShowResultB2b";
import { Link } from "react-router-dom";
import ReturnCardHeader from "./ReturnCardHeader";
import MessageToken from "../../Tools/MessageToken";

const ResultSearch = ({ Data, keyword, rangeValue, typeBlock }) => {
  const [Permissions, setPermissions] = useState([]);
  const { B2bDataEntite, B2bDataPerson, conclusion, isGeneratingReport } = usePicod();
  const FetchPermissions = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_USERS}/permission/list`, {
      headers: {
        Authorization: Token,
      },
    });
    setPermissions(data?.permission);
    console.log(data.permission);
  };

  useEffect(() => {
    FetchPermissions();
  }, []);

  return (
    <>
      {UsersInfo?.permissions?.length > 0 &&
        UsersInfo?.permissions
          ?.filter(
            (itm) =>
              !itm.startsWith("xplore") &&
              !itm.startsWith("API") &&
              !itm.toLowerCase().includes("global") &&
              !itm.toLowerCase().includes("infosplus") &&
              !itm.toLowerCase().includes("news")
          )
          ?.map((itm, index) => (
            <>
              <ReturnCardByType
                key={itm}
                type={itm}
                Data={Data}
                index={index}
                keyword={keyword}
                rangeValue={rangeValue}
                typeBlock={typeBlock}
              />
            </>
          ))}

      {UsersInfo?.permissions
        ?.filter((itm) => itm.includes("IndividuGlobal") || itm.includes("entitiesGlobal"))
        .map(
          (itm) =>
            (B2bDataPerson.length > 0 || B2bDataEntite.length > 0) && (
              <ShowResultB2b
                Person={B2bDataPerson}
                Entite={B2bDataEntite}
                title={itm}
                rangeValue={rangeValue}
                keyword={keyword}
              />
            )
        )}

      <BlockAPIS rangeValue={rangeValue} keyword={keyword} Data={Data} />

      {conclusion?.length > 11 && isGeneratingReport && (
        <div
          className="print:block sun-editor-editable border rounded shadow col-span-4"
          style={{ pageBreakBefore: "always", pageBreakAfter: "always" }}
        >
          <div dangerouslySetInnerHTML={{ __html: conclusion }}></div>
        </div>
      )}
    </>
  );
};

export default ResultSearch;

const ReturnCardByType = ({ type, Data, keyword, rangeValue, typeBlock, index }) => {
  const [ShowDetailPop, setShowDetailPop] = useState(false);
  const { reportInfo, isGeneratingReport } = usePicod();
  const [entity, setEntity] = useState([]);
  const [entityDetail, setEntityDetail] = useState([]);
  const ShowPopFunction = async (itm) => {
    const { data } = await http.get(
      `/${type === "pep" || type.includes("person") ? "personnes" : "entite"}/find?id=${
        itm?.obj?._id
      }`
    );
    setEntity(data.data);
    setShowDetailPop((prev) => !prev);
  };
  const FunctionWithoutPop = async (itm) => {
    const { data } = await http.get(
      `/${type === "pep" || type.includes("person") ? "personnes" : "entite"}/find?id=${
        itm?.obj?._id
      }`
    );
    // Check if the data is not already in entityDetail before adding it
    if (!entityDetail.some((existingItem) => existingItem.id === data.data.id)) {
      setEntityDetail((prevEntityDetail) => [...prevEntityDetail, data.data]);
    }
  };

  return (
    <>
      {keyword && (
        <div
          id={type}
          className={` ${
            isGeneratingReport
              ? "border-2 border-blue-600  print:border-inherit bg-blue-50 print:bg-inherit"
              : "print:hidden"
          }  col-span-4   w-full max-w-2xl mx-auto md:p-0  rounded-md bg-white shadow-lg border  print:!overflow-hidden  h-96 print:!h-full   print:!border-none  print:!shadow-none  print:!justify-center   border-gray-200  sm:p-8 `}
        >
          {/* <ReportHeader selectedRecord={entity} /> */}
          <ReturnCardHeader type={type?.toLowerCase()} />

          <div className="overflow-x-hidden h-[300px] overflow-y-auto">
            {Data.filter((itm) => itm?.obj?._source.type === type).length > 0 ? (
              Data.filter((itm) => itm?.obj?._source.type === type).map(
                (itm, i) =>
                  (rangeValue > 50 &&
                    itm?.obj?._source.libelle?.toLowerCase() === keyword?.toLowerCase() && (
                      <>
                        <div
                          className={`flow-root   ${
                            reportInfo[type + itm?.obj._id / itm?.obj._id + i] && isGeneratingReport
                              ? "print:border-t print:border-b bg-blue-50 print:bg-inherit"
                              : "print:hidden"
                          } w-[90%] mx-auto`}
                          key={itm?.obj._id}
                        >
                          <ul
                            role="list"
                            className="divide-y divide-gray-200  "
                            key={itm?.obj._id + i}
                          >
                            <li
                              className={`py-3 sm:py-4 border-t relative border-b print:!border-none md:w-full    
                              ${
                                reportInfo[type + itm?.obj._id / itm?.obj._id + i] &&
                                isGeneratingReport
                                  ? "border-2 border-blue-600  print:border-inherit bg-blue-50 print:bg-inherit print:!border-none"
                                  : "print:hidden"
                              }
                          `}
                              key={itm?.obj._id + i}
                            >
                              <div className="absolute -left-3 top-0  ">
                                <ReportCheckbox
                                  reportKey={type + itm?.obj._id / itm?.obj._id + i}
                                />
                              </div>

                              <div className="flex items-center space-x-4" key={itm?.obj._id + i}>
                                <div className="flex flex-col ">
                                  <EntityImage
                                    witFallback={false}
                                    type={itm?.obj?._source.type}
                                    image={
                                      itm?.obj?._source.img_perso_url ||
                                      itm?.obj?._source.logo ||
                                      itm?.obj?._source.logo_authority ||
                                      itm?.obj?._source.logo_source
                                    }
                                    width={50}
                                    heigth="auto"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <Link
                                    onClick={() => ShowPopFunction(itm)}
                                    className="text-sm font-bold text-gray-900 truncate dark:text-white"
                                  >
                                    <div className="flex gap-3 items-center">
                                      {itm?.obj._source?.libelle.length > 20
                                        ? itm?.obj._source?.libelle.substring(0, 16) + "..."
                                        : itm?.obj._source?.libelle}
                                      <div className="flex justify-end">
                                        <DisplayCountries entity={itm?.obj?._source} />
                                      </div>
                                    </div>
                                  </Link>

                                  {itm?.obj._source?.Address && (
                                    <p className="text-sm font-bold text-gray-900 truncate dark:text-white">
                                      {itm?.obj._source?.Address}
                                    </p>
                                  )}
                                  <div className="flex gap-3 mt-3 text-sm text-gray-500 ">
                                    {/* {itm?.obj._source.country_authority && (
                                      <>
                                        <b>Country authority </b>
                                        <img
                                          className="w-5 h-5"
                                          src={`https://flagsapi.com/${
                                            itm?.obj._source.country_authority
                                              ? itm?.obj._source.country_authority
                                              : itm?.obj._source.pays
                                          }/shiny/64.png`}
                                        />
                                        <address>
                                          {itm?.obj._source.country_authority
                                            ? itm.obj._source.country_authority
                                            : itm?.obj._source.pays}
                                        </address>
                                      </>
                                    )} */}
                                    <div
                                      onClick={(e) => {
                                        ShowPopFunction(itm);
                                        e.stopPropagation();
                                      }}
                                      className="flex justify-end  gap-2 items-center hover:opacity-60 duration-100 hover:underline hover:text-blue-600 transition-all cursor-pointer"
                                    >
                                      <FontAwesomeIcon
                                        icon={faEye}
                                        className="w-5 h-5 text-blue-600 "
                                      />
                                      <span className="text-xs font-bold">Detail</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 items-center justify-end mt-3">
                                {isGeneratingReport && (
                                  <b className="mb-1 text-bold text-xs">Detail of report</b>
                                )}
                                <ReportCheckbox
                                  onClick={() => FunctionWithoutPop(itm)}
                                  liblle={"detail"}
                                  reportKey={`${type}${itm?.obj._id}`}
                                />
                              </div>

                              {itm?.obj?.place_of_birth && (
                                <div className="flex gap-3 items-center justify-center mr-2">
                                  <b className="text-sm  text-gray-500 truncate ">
                                    place of birth :
                                  </b>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: itm?.obj?._source.place_of_birth,
                                    }}
                                  />
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: itm?.obj?._source.date_of_birth,
                                    }}
                                  />
                                </div>
                              )}

                              {itm?.obj?._source.entity_type && (
                                <div className="flex gap-3 items-center  ml-4">
                                  <b className="text-sm  text-gray-500 truncate ">entity type :</b>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: itm?.obj?._source.entity_type,
                                    }}
                                  />
                                </div>
                              )}
                              {itm?.obj?._source.information_complementaire && (
                                <>
                                  <div className="flex gap-3 items-center   justify-center">
                                    <p className="">
                                      {itm?.obj?._source.information_complementaire}
                                    </p>
                                  </div>
                                </>
                              )}
                            </li>
                          </ul>
                        </div>

                        {isGeneratingReport &&
                          entityDetail.map(
                            (ent, i) =>
                              ent.id === parseInt(itm?.obj._id) && (
                                <div
                                  className={`${
                                    reportInfo[`${type}${itm?.obj._id}`] && isGeneratingReport
                                      ? "border-2 border-blue-600 print:overflow-hidden  print:border-inherit bg-blue-50 print:bg-inherit print:!border-none "
                                      : "print:hidden hidden"
                                  }`}
                                >
                                  <InfoCard
                                    selectedRecord={ent}
                                    showBtn={true}
                                    key={ent?.id}
                                    showEntitySearchLinks={true}
                                    canRedirect={false}
                                  />
                                </div>
                              )
                          )}
                      </>
                    )) ||
                  (rangeValue <= 50 && (
                    <>
                      <div
                        className={`flow-root   ${
                          reportInfo[type + itm?.obj._id / itm?.obj._id + i] && isGeneratingReport
                            ? "print:border-t print:border-b bg-blue-50 print:bg-inherit"
                            : "print:hidden"
                        } w-[90%] mx-auto`}
                        key={itm?.obj._id}
                      >
                        <ul
                          role="list"
                          className="divide-y divide-gray-200  "
                          key={itm?.obj._id + i}
                        >
                          <li
                            className={`py-3 sm:py-4 border-t relative border-b print:!border-none md:w-full    
                              ${
                                reportInfo[type + itm?.obj._id / itm?.obj._id + i] &&
                                isGeneratingReport
                                  ? "border-2 border-blue-600  print:border-inherit bg-blue-50 print:bg-inherit print:!border-none"
                                  : "print:hidden"
                              }
                          `}
                            key={itm?.obj._id + i}
                          >
                            <div className="absolute -left-3 top-0  ">
                              <ReportCheckbox reportKey={type + itm?.obj._id / itm?.obj._id + i} />
                            </div>

                            <div className="flex items-center space-x-4" key={itm?.obj._id + i}>
                              <div className="flex flex-col ">
                                <EntityImage
                                  witFallback={false}
                                  type={itm?.obj?._source.type}
                                  image={
                                    itm?.obj?._source.img_perso_url ||
                                    itm?.obj?._source.logo ||
                                    itm?.obj?._source.logo_authority ||
                                    itm?.obj?._source.logo_source
                                  }
                                  width={50}
                                  heigth="auto"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <Link
                                  onClick={() => ShowPopFunction(itm)}
                                  className="text-sm font-bold text-gray-900 truncate dark:text-white"
                                >
                                  <div className="flex gap-3 items-center">
                                    {itm?.obj._source?.libelle.length > 20
                                      ? itm?.obj._source?.libelle.substring(0, 16) + "..."
                                      : itm?.obj._source?.libelle}
                                    <div className="flex justify-end">
                                      <DisplayCountries entity={itm?.obj?._source} />
                                    </div>
                                  </div>
                                </Link>

                                {itm?.obj._source?.Address && (
                                  <p className="text-sm font-bold text-gray-900 truncate dark:text-white">
                                    {itm?.obj._source?.Address}
                                  </p>
                                )}
                                <div className="flex gap-3 mt-3 text-sm text-gray-500 ">
                                  {/* {itm?.obj._source.country_authority && (
                                      <>
                                        <b>Country authority </b>
                                        <img
                                          className="w-5 h-5"
                                          src={`https://flagsapi.com/${
                                            itm?.obj._source.country_authority
                                              ? itm?.obj._source.country_authority
                                              : itm?.obj._source.pays
                                          }/shiny/64.png`}
                                        />
                                        <address>
                                          {itm?.obj._source.country_authority
                                            ? itm.obj._source.country_authority
                                            : itm?.obj._source.pays}
                                        </address>
                                      </>
                                    )} */}
                                  <div
                                    onClick={(e) => {
                                      ShowPopFunction(itm);
                                      e.stopPropagation();
                                    }}
                                    className="flex justify-end  gap-2 items-center hover:opacity-60 duration-100 hover:underline hover:text-blue-600 transition-all cursor-pointer"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="w-5 h-5 text-blue-600 "
                                    />
                                    <span className="text-xs font-bold">Detail</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 items-center justify-end mt-3">
                              {isGeneratingReport && (
                                <b className="mb-1 text-bold text-xs">Detail of report</b>
                              )}
                              <ReportCheckbox
                                onClick={() => FunctionWithoutPop(itm)}
                                liblle={"detail"}
                                reportKey={`${type}${itm?.obj._id}`}
                              />
                            </div>

                            {itm?.obj?.place_of_birth && (
                              <div className="flex gap-3 items-center justify-center mr-2">
                                <b className="text-sm  text-gray-500 truncate ">place of birth :</b>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: itm?.obj?._source.place_of_birth,
                                  }}
                                />
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: itm?.obj?._source.date_of_birth,
                                  }}
                                />
                              </div>
                            )}

                            {itm?.obj?._source.entity_type && (
                              <div className="flex gap-3 items-center  ml-4">
                                <b className="text-sm  text-gray-500 truncate ">entity type :</b>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: itm?.obj?._source.entity_type,
                                  }}
                                />
                              </div>
                            )}
                            {itm?.obj?._source.information_complementaire && (
                              <>
                                <div className="flex gap-3 items-center   justify-center">
                                  <p className="">{itm?.obj?._source.information_complementaire}</p>
                                </div>
                              </>
                            )}
                          </li>
                        </ul>
                      </div>

                      {isGeneratingReport &&
                        entityDetail.map(
                          (ent, i) =>
                            ent.id === parseInt(itm?.obj._id) && (
                              <div
                                className={`${
                                  reportInfo[`${type}${itm?.obj._id}`] && isGeneratingReport
                                    ? "border-2 border-blue-600 print:overflow-hidden  print:border-inherit bg-blue-50 print:bg-inherit print:!border-none "
                                    : "print:hidden hidden"
                                }`}
                              >
                                <InfoCard
                                  selectedRecord={ent}
                                  showBtn={true}
                                  key={ent?.id}
                                  showEntitySearchLinks={true}
                                  canRedirect={false}
                                />
                              </div>
                            )
                        )}
                    </>
                  ))
              )
            ) : (
              <b
                className={`text-center text-lg flex gap-5 justify-center ${
                  !isGeneratingReport && "mt-16"
                }  `}
              >
                {UsersInfo?.permissions
                  ?.filter((itm) => itm === type)
                  .map((itm, ind) =>
                    Data.map(
                      (itrm, index) => index === ind && (itrm.status ? <MessageToken /> : "NEANT")
                    )
                  )}
                {Data.length === 0 && "NEANT"}
                {isGeneratingReport && <span className={`text-lg font-medium`}>"{type}"</span>}
              </b>
            )}
          </div>
        </div>
      )}

      {ShowDetailPop && (
        <Modal setIsOpen={setShowDetailPop} isOpen={ShowDetailPop}>
          <InfoCard
            selectedRecord={entity}
            showBtn={true}
            key={entity?.id}
            showEntitySearchLinks={true}
            canRedirect={false}
          />
        </Modal>
      )}
    </>
  );
};
