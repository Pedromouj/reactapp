import React, { useState } from "react";
import { Link } from "react-router-dom";
import EntityImage from "../../../AMLCheck/EntityImage";
import DisplayCountries from "../../../common/AMLCheck/DisplayCountries";
import { usePicod } from "../../Home";
import Modal from "../../../Tools/Modals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEye } from "@fortawesome/free-solid-svg-icons";
import InfoCard from "../InfoCards";
import axios from "axios";
import worldIcon from "/img/planete-terre.png";
import ReportCheckbox from "../../GenerateReport/ReportCheckbox";

function ShowResultB2b({ Person = [], Entite = [], icon, title, rangeValue, keyword }) {
  const { reportInfo, isGeneratingReport } = usePicod();
  const [ShowDetailB2bEntity, setShowDetailB2bEntity] = useState(false);
  const [ShowDetailB2bPerson, setShowDetailB2bPerson] = useState(false);
  const [entity, setEntity] = useState([]);
  const [ActiveTab, setActiveTab] = useState("entity");
  const [entityDetail, setEntityDetail] = useState([]);
  const [entityDetailPerson, setEntityDetailPerson] = useState([]);
  const mappedDataPerson = entity?.persons?.map((item, index) => ({
    id: item.person.id,
    personName: item.person.name,
    roleName: item.role.name,
    companies: item.companies,
  }));

  console.log(mappedDataPerson);
  const ShowPopFunction = async (params) => {
    if (title.startsWith("entitiesGlobal")) {
      const { data } = await axios.get(
        `${import.meta.env.VITE_AML_API_BASE_CORPO_URL}/api/b2bEntite/${params.countryCode}/${
          params.internationalNumber
        }`
      );
      setEntity({
        ...data.props.pageProps.company,
        libelle: data?.props?.pageProps?.company?.name,
        type: data?.props?.pageProps?.company?.type?.type
          ? data?.props?.pageProps?.company?.type?.type
          : "INC",
        net: 1,
        props: data.props,
      });
      setShowDetailB2bEntity((prev) => !prev);
      setActiveTab("entity");
      console.log("entityDetail", entity);
    } else if (title.startsWith("IndividuGlobal")) {
      const { data } = await axios.get(
        `${import.meta.env.VITE_AML_API_BASE_CORPO_URL}/api/b2bPerson/${params.id}`
      );
      setEntity({
        ...data.props.pageProps.person,
        libelle: data?.props?.pageProps?.person?.name,
        type: "Person",
        net: 1,
        companies_data: data.props.pageProps.person.companies.map((item) => ({
          id: item.id,
          name: item.name,
          internationalNumber: item.internationalNumber,
        })),
      });
      setShowDetailB2bPerson((prev) => !prev);
      setActiveTab("People");
    }
  };

  //   const ShowPopFunctionPersons = async (params) => {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_AML_API_BASE_CORPO_URL}/api/b2bPerson/${params.id}`
  //     );
  //     setEntity({
  //       ...data.props.pageProps.person,
  //       libelle: data?.props?.pageProps?.person?.name,
  //       type: "Person",
  //       net: 1,
  //     });

  //     setShowDetailB2bPerson((prev) => !prev);
  //     setActiveTab("People");
  //   };

  const FunctionWithoutPop = async (params) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_AML_API_BASE_CORPO_URL}/api/b2bEntite/${params.countryCode}/${
          params.internationalNumber
        }`
      );

      if (data?.props?.pageProps?.company?.internationalNumber === params.internationalNumber) {
        setEntityDetail((prevEntityDetail) => {
          // Filter out existing entities with the same internationalNumber
          const filteredEntities = prevEntityDetail.filter(
            (entity) => entity.internationalNumber !== params.internationalNumber
          );

          return [
            ...filteredEntities,
            {
              ...data.props.pageProps.company,
              libelle: data?.props?.pageProps?.company?.name,
              type: data?.props?.pageProps?.company?.type?.type
                ? data?.props?.pageProps?.company?.type?.type
                : "INC",
              presons_data: data.props.pageProps.company.persons.map((item, index) => ({
                id: item.person.id,
                personName: item.person.name,
                roleName: item.role.name,
                companies: item.companies,
              })),
              props: data.props,
            },
          ];
        });
      }

      console.log("entityDetail", entityDetail);
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    }
  };

  const FunctionWithoutPopPerson = async (params) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_AML_API_BASE_CORPO_URL}/api/b2bPerson/${params.id}`
      );

      if (data?.props?.pageProps?.person?.id === params.id) {
        setEntityDetailPerson((prevEntityDetail) => {
          // Filter out existing entities with the same internationalNumber
          const filteredEntities = prevEntityDetail.filter((entity) => entity.id !== params.id);
          // Add the new entity to the filtered list
          return [
            ...filteredEntities,
            {
              ...data.props.pageProps.person,
              libelle: data?.props?.pageProps?.person?.name,
              type: data?.props?.pageProps?.person?.type?.type
                ? data?.props?.pageProps?.person?.type?.type
                : "INC",
              companies_data: data.props.pageProps.person.companies.map((item) => ({
                id: item.id,
                name: item.name,
                internationalNumber: item.internationalNumber,
              })),
              props: data.props,
            },
          ];
        });
      }
      console.log("entityDetail", entityDetail);
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="col-span-4  print:col-span-12 w-full max-w-md p-4 bg-white shadow-lg   print:!h-full print:!max-w-full print:!mt-10  print:!overflow-hidden  print:!flex print:!flex-col   print:!border-none  print:!shadow-none  print:!justify-center   border-gray-200 rounded-lg md:p-0 overflow-x-hidden  sm:p-8  h-96 overflow-y-scroll">
      <ReportCheckbox reportKey={title} />
      <div
        className={`${
          reportInfo[title] && isGeneratingReport
            ? "border-2 border-blue-600  print:border-inherit bg-blue-50 print:bg-inherit"
            : "print:hidden"
        } text-lg text-left text-white font-bold   mb-3 mr-2 rounded-t-md print:!max-h-full print:overflow-visible  bg-[#1e3a8a] p-2 grid grid-cols-12 gap-3 items-center  w-full`}
      >
        <div className="col-span-10">{title === "IndividuGlobal" ? "person" : "entite"}</div>
        <div className="col-span-2  mx-auto">
          <img src={worldIcon} className="h-8 w-full  " />
        </div>
      </div>

      <ul className=" lg:flex-grow bg-white  font-medium rounded-lg  w-full h-fit">
        {title === "IndividuGlobal"
          ? Person?.filter((itm) =>
              rangeValue > 50
                ? itm?.name?.toLowerCase()?.trim() === keyword?.toLowerCase()?.trim()
                : itm
            ).map((record, i) => (
              <React.Fragment key={record.id}>
                <li
                  className={`flex items-start max-w-full gap-2 p-1 border-b last-of-type:border-b-0 ${
                    reportInfo[title + record.id] && isGeneratingReport
                      ? "border-2 border-blue-600  print:border-inherit bg-blue-50 print:bg-inherit print:!border-none"
                      : "print:hidden"
                  }`}
                >
                  <ReportCheckbox reportKey={title + record.id} />
                  <div className="pt-1">
                    <EntityImage
                      witFallback={false}
                      type={record.type}
                      image={record.logo || record.img_perso_url}
                      showModal
                    />
                  </div>
                  <Link
                    className="flex flex- justify-between w-full items-start overflow-hidden"
                    onClick={() => ShowPopFunction(record)}
                  >
                    <div className="justify-between items-center gap-4 overflow-hidden">
                      <div className="text-xl">{record.name}</div>
                      <div className="flex items-center text-gray-500 gap-1 uppercase">
                        <DisplayCountries
                          size={24}
                          entity={{ country: record?.countryCode?.substring(0, 2) }}
                        />
                      </div>
                    </div>
                  </Link>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="w-5 h-5 text-blue-600 hover:opacity-60 duration-100 transition-all cursor-pointer"
                    onClick={() => ShowPopFunction(record)}
                  />
                  <div className="flex gap-2 items-center">
                    <ReportCheckbox
                      onClick={() => FunctionWithoutPopPerson(record)}
                      liblle={"detail"}
                      reportKey={`${record.name}${record.id + "Person"}`}
                    />
                    {isGeneratingReport && <span className="text-xs">detail</span>}
                  </div>
                </li>
                <div>
                  {isGeneratingReport && (
                    <div>
                      {/* {JSON.stringify(entityDetail)} */}
                      {entityDetailPerson
                        ?.filter((ent) => ent?.id === record?.id)
                        ?.map((ent, i) => (
                          <div
                            className={`${
                              reportInfo[`${ent.name}${ent.id + "Person"}`] && isGeneratingReport
                                ? "border-2 border-blue-600  print:border-inherit bg-blue-50 print:bg-inherit print:!border-none "
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
                            {ent?.companies_data?.map((itm, i) => (
                              <Associate associate={itm} index={i} key={i} />
                            ))}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))
          : Entite?.filter((itm) =>
              rangeValue > 50
                ? itm?.name?.toLowerCase()?.trim() === keyword?.toLowerCase()?.trim()
                : itm
            ).map((record, i) => (
              <React.Fragment key={record.internationalNumber}>
                <li
                  className={`flex items-start max-w-full gap-2 p-2 border-b last-of-type:border-b-0  ${
                    reportInfo[title + record.internationalNumber] && isGeneratingReport
                      ? "border-2 border-blue-600  print:border-inherit bg-blue-50 print:bg-inherit print:!border-none"
                      : "print:hidden"
                  }`}
                >
                  <ReportCheckbox reportKey={title + record.internationalNumber} />
                  <div className="pt-1">
                    <EntityImage
                      witFallback={false}
                      type={record.type}
                      image={record.logo || record.img_perso_url}
                      showModal
                    />
                  </div>
                  <Link
                    className="flex flex- justify-between w-full items-start overflow-hidden"
                    onClick={() => ShowPopFunction(record)}
                  >
                    <div className="justify-between items-center gap-4 overflow-hidden">
                      <div className="text-xl">{record.name.substring(0, 20)}</div>
                      <div className="flex items-center text-gray-500 gap-1 uppercase">
                        <DisplayCountries
                          size={24}
                          entity={{ country: record?.countryCode?.substring(0, 2) }}
                        />
                      </div>
                    </div>
                  </Link>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="w-5 h-5 text-blue-600 hover:opacity-60 duration-100 transition-all cursor-pointer"
                    onClick={() => ShowPopFunction(record)}
                  />
                  <div className="flex gap-2 items-center">
                    <ReportCheckbox
                      onClick={() => FunctionWithoutPop(record)}
                      liblle={"detail"}
                      reportKey={`${record.name}${record.internationalNumber + "UI"}`}
                    />

                    {isGeneratingReport && <span className="text-xs">detail</span>}
                  </div>
                </li>
                <div>
                  {isGeneratingReport && (
                    <div>
                      {/* {JSON.stringify(entityDetail)} */}
                      {entityDetail
                        ?.filter((ent) => ent?.internationalNumber === record?.internationalNumber)
                        ?.map((ent, i) => (
                          <div
                            className={`${
                              reportInfo[`${ent.name}${ent.internationalNumber + "UI"}`] &&
                              isGeneratingReport
                                ? "border-2 border-blue-600   print:border-inherit bg-blue-50 print:bg-inherit print:!border-none "
                                : "print:hidden hidden"
                            }`}
                          >
                            <InfoCard
                              selectedRecord={ent}
                              showBtn={true}
                              key={Math.floor(ent?.internationalNumber)}
                              showEntitySearchLinks={true}
                              canRedirect={false}
                            />
                            {ent?.presons_data?.map((itm, i) => (
                              <B2bPerson associate={itm} index={i} key={i} />
                            ))}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
      </ul>

      <Modal isOpen={ShowDetailB2bEntity} setIsOpen={setShowDetailB2bEntity}>
        <div className="flex gap-[2px] mt-10 w-full ">
          <button
            onClick={() => setActiveTab("entity")}
            className={`${
              ActiveTab === "entity" ? "bg-slate-600 text-white" : "bg-slate-50 text-slate-600"
            }  p-1  border hover:opacity-50 border-black transition-all duration-100 text-lg font-bold`}
          >
            entity
          </button>

          <button
            onClick={() => setActiveTab("People")}
            className={` ${
              ActiveTab === "People" ? "bg-slate-600 text-white" : "bg-slate-50 text-slate-600"
            } p-1 border hover:opacity-50 border-black transition-all duration-100 text-lg font-bold`}
          >
            People
          </button>
        </div>
        {ActiveTab === "entity" ? (
          <InfoCard
            selectedRecord={entity}
            Typo={"entity"}
            showBtn={true}
            key={entity?.id}
            showEntitySearchLinks={true}
            canRedirect={false}
          />
        ) : mappedDataPerson?.length > 0 ? (
          mappedDataPerson?.map((itm, i) => <B2bPerson associate={itm} index={i} key={i} />)
        ) : (
          <span className="text-xl text-center flex justify-center">No people found</span>
        )}
      </Modal>

      <Modal isOpen={ShowDetailB2bPerson} setIsOpen={setShowDetailB2bPerson}>
        <div className="flex gap-[2px] mt-10 w-full ">
          <button
            onClick={() => setActiveTab("People")}
            className={`${
              ActiveTab === "People" ? "bg-slate-600 text-white" : "bg-slate-50 text-slate-600"
            }  p-1  border hover:opacity-50 border-black transition-all duration-100 text-lg font-bold`}
          >
            People
          </button>
          <button
            onClick={() => setActiveTab("entity")}
            className={` ${
              ActiveTab === "entity" ? "bg-slate-600 text-white" : "bg-slate-50 text-slate-600"
            } p-1 border hover:opacity-50 border-black transition-all duration-100 text-lg font-bold`}
          >
            entity
          </button>
        </div>

        {/* {JSON.stringify(entity?.companies_data)} */}
        {ActiveTab === "People" ? (
          <InfoCard
            selectedRecord={entity}
            Typo={"People"}
            showBtn={true}
            key={entity?.id}
            showEntitySearchLinks={true}
            canRedirect={false}
          />
        ) : (
          <div className="h-64 overflow-y-auto mt-5">
            {entity?.companies_data?.map((itm, i) => (
              <Associate associate={itm} index={i} key={i} />
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
export default ShowResultB2b;

const B2bPerson = ({ icon, associate, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [entity, setEntity] = useState([]);
  const queryString = window.location.search;
  // Parse the query string into key-value pairs
  const parameter = new URLSearchParams(queryString);
  // // Get the value of the "iso" parameter
  const isoValue = parameter.get("iso");
  const { reportInfo, isGeneratingReport } = usePicod();
  const getEntity = async (id) => {
    try {
      setIsOpen((prev) => !prev);
      const { data } = await axios.get(
        selectedTab !== "individus"
          ? `${import.meta.env.VITE_API_BASE_URL}/b2bEntite/${isoValue}/${id}`
          : `${import.meta.env.VITE_API_BASE_URL}/b2bPerson/${id}`
      );
      setEntity({
        ...data.props.pageProps.company,
        libelle: data?.props?.pageProps?.company?.name,
        type: data?.props?.pageProps?.company?.type?.type
          ? data?.props?.pageProps?.company?.type?.type
          : "INC",
        net: 1,
        props: data.props,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
    //   className={`relative ${
    //     reportInfo[index] && reportInfo.entityAssociates && isGeneratingReport
    //       ? "bg-blue-100 border border-blue-50 print:bg-transparent rounded"
    //       : "print:hidden"
    //   }`}
    >
      {/* getEntity(associate.internationalNumber) */}
      {/* {reportInfo?.entityAssociates && <ReportCheckbox reportKey={index} />} */}
      <div className="w-full border-b border-gray-200 py-2 mt-2">
        <div className="flex gap-4 items-start leading-5">
          <img src="/img/fallback_avatar.png" className="w-10 h-10 rounded-full border p-1" />
          <div className="max-w-full overflow-hidden ">
            <div className="w-full truncate hover:font-semibold cursor-pointer">
              <div className="flex items-center">
                <div className="truncate text-lg">
                  {associate.personName ? associate.personName : "Inconnu"}
                </div>
              </div>
              <span className="text-gray-500 text-sm">
                {associate.roleName ? associate.roleName : "Inconnu"}
              </span>
            </div>
            {/* <div className="text-sm text-gray-400 capitalize">{associate.roleName}</div> */}
          </div>
        </div>

        {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <InfoCard canRedirect={true} selectedRecord={entity} />
          </Modal> 
           onClick={() => getEntity(associate.internationalNumber)}
          */}
      </div>
    </div>
  );
};

const Associate = ({ icon, associate, selectedTab, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [entity, setEntity] = useState([]);
  const queryString = window.location.search;
  // Parse the query string into key-value pairs
  const parameter = new URLSearchParams(queryString);
  // // Get the value of the "iso" parameter
  const isoValue = parameter.get("iso");
  //   const {
  //     associatesIndirectly,
  //     molecules,
  //     isPerson,
  //     reportInfo,
  //     setReportInfo,
  //     isGeneratingReport,
  //   } = useAml();

  const getPerson = async (id) => {
    // `${import.meta.env.VITE_API_BASE_URL}/b2bPerson/${id}`
    try {
      setIsOpen((prev) => !prev);
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/b2bPerson/${id}`);
      setEntity({
        ...data.props.pageProps.person,
        libelle: data?.props?.pageProps?.person?.name,
        type: "Person",
        net: 1,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getEntity = async (id) => {
    try {
      setIsOpen((prev) => !prev);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/b2bEntite/${isoValue}/${id}`
      );
      setEntity({
        ...data.props.pageProps.company,
        libelle: data?.props?.pageProps?.company?.name,
        type: data?.props?.pageProps?.company?.type?.type
          ? data?.props?.pageProps?.company?.type?.type
          : "INC",
        net: 1,
        props: data.props,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div key={associate.id / 2}>
        {/* {reportInfo?.entityAssociates && <ReportCheckbox reportKey={i} />} */}
        <div className="w-full border-b border-gray-200 py-2 mt-2 ">
          <div className="flex gap-4 items-start leading-5">
            <img src="/img/fallback_entity.png" className="w-7 h-6 " />
            <div className="max-w-full overflow-hidden">
              <div className="w-full truncate hover:font-semibold cursor-pointer">
                <div className="flex">
                  <div
                    className="truncate"
                    // onClick={() => getEntity(associate.internationalNumber)}
                  >
                    {associate.name}
                  </div>
                  <FontAwesomeIcon icon={faArrowRight} size="xs" className="ml-5 text-green-500" />
                </div>
              </div>
              {/* <div className="text-sm text-gray-400 capitalize">{associate.roleName}</div> */}
            </div>
          </div>

          {/* 
                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                  <InfoCard canRedirect={true} selectedRecord={entity} />
                </Modal> 
            */}
        </div>
      </div>

      {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <InfoCard selectedRecord={entity} />
        </Modal> */}
    </>
  );
};
