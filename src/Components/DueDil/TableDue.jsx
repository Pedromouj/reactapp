import axios from "axios";
import React, { useEffect, useState } from "react";
import Token from "../Tools/Token";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEye,
  faFileExport,
  faFileImport,
  faFilePdf,
  faPlus,
  faTicket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../Tools/Modals";
import UsersInfo from "../Tools/UsersInfo";
import banner_due from "/banners/banner_due_dil_picod.png";
import convertDate from "../Tools/convertDate";
import { useTranslation } from "react-i18next";
const TableDue = () => {
  const { t } = useTranslation();
  const [DueTab, setDueTab] = useState([]);
  const [Files, setFiles] = useState([]);
  const [Libelle, setLibelle] = useState("");
  const [Description, setDescription] = useState("");
  const [ShowTicket, setShowTicket] = useState(false);
  const [ShowEye, setShowEye] = useState(false);
  const [DetailDue, setDetailDue] = useState([]);
  const [IdTicket, setIdTicket] = useState(0);
  const [ShowUploadFiles, setShowUploadFiles] = useState(false);
  const [ShowFilePop, setShowFilePop] = useState(false);
  const [ArraysDiv, setArraysDivs] = useState([1]);
  const [Count, setCount] = useState(0);
  const [Title, setTitle] = useState("");
  const [RequiredTitle, setRequiredTitle] = useState(false);

  const [Url, setUrl] = useState(null);

  const fetchDueTable = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_USERS}/dueDil/list`, {
      headers: {
        Authorization: Token,
      },
    });
    setDueTab(data.duedil);
  };

  useEffect(() => {
    fetchDueTable();
  }, []);

  const colorByStatus = (status) => {
    switch (status) {
      case "in progress":
        return "bg-blue-100 text-orange-800";
      case "New":
        return "bg-red-100 text-red-800";
      case "close":
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  };

  const AppenDivs = () => {
    setCount((prev) => prev + 1);
    setArraysDivs((prev) => [...prev, Count]);

    console.log(ArraysDiv);
  };

  const AddTicket = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL_USERS}/dueDil/newTicket`,
      {
        id_user: UsersInfo?.userid,
        libelle: Libelle,
        description: Description,
      },
      {
        headers: {
          Authorization: Token,
        },
      }
    );

    fetchDueTable();
  };

  const ShowPopUpEye = async (id) => {
    setIdTicket(id);
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL_USERS}/dueDil/ticket/list/${id}`,
      {
        headers: {
          Authorization: Token,
        },
      }
    );
    setDetailDue(data.duedil);
    setShowEye((prev) => !prev);
  };

  const handleClose = () => {
    setShowUploadFiles((prev) => !prev);
    setArraysDivs([1]);
    setFiles([]);
    setRequiredTitle(false);
  };

  const UploadFile = (e) => {
    Files.push(e.target.files[0]);
    console.log(Files);
  };

  const ShowFile = async (Libelle) => {
    setUrl(`${import.meta.env.VITE_API_BASE_URL_USERS}/documents/files/${Libelle}`);
    setShowFilePop((prev) => !prev);
  };

  const handleUploadFile = () => {
    if (Title !== "") {
      const uploadPromises = Files.map(async (itm) => {
        try {
          const formData = new FormData();
          formData.append("file", itm);

          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL_USERS}/duedil/upload`,
            formData
          );

          return response; // Return the response for each iteration
        } catch (error) {
          throw error; // Rethrow the error to handle it outside the map
        }
      });

      // Use Promise.all to wait for all uploads to complete
      return Promise.all(uploadPromises)
        .then((responses) => {
          // Handle responses here (an array of responses from each upload)
          console.log(responses);
          return responses; // You can return the responses if needed
        })
        .catch((error) => {
          // Handle errors if any of the uploads fail
          console.error("An error occurred during the uploads:", error);
          throw error; // Rethrow the error to handle it outside this function
        });
    } else {
      setRequiredTitle(true);
    }
  };

  const deleteLineupload = (index) => {
    const updatedArray = ArraysDiv.filter((_, i) => i !== index);
    setArraysDivs(updatedArray);
  };
  return (
    <>
      <div className="mt-4">
        <img src={banner_due} className="w-full" draggable={false} />
      </div>
      <div className="w-full container mx-auto">
        <div className=" w-full flex justify-end">
          <button
            onClick={() => setShowTicket((prev) => !prev)}
            className="bg-blue-600 text-white p-1 w-auto rounded flex items-center "
          >
            <FontAwesomeIcon icon={faPlus} className="w-5 h-5 mr-2" />
            {t("add_ticket")}
          </button>
        </div>
        <div className="relative overflow-x-auto  mx-auto ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase border-b">
              <tr>
                <th scope="col" className="px-4 sm:px-6 py-3">
                  # ID {t("ticket")}
                </th>
                <th scope="col" className="px-4 sm:px-6 py-3">
                  {t("title")}
                </th>
                <th scope="col" className="px-4 sm:px-6 py-3">
                  {t("description")}
                </th>
                <th scope="col" className="px-4 sm:px-6 py-3">
                  {t("status")}
                </th>
                <th className="hidden sm:table-cell">{t("chart")}</th>
                <th className="hidden sm:table-cell">{t("Progress")}</th>
                <th scope="col" className="px-4 sm:px-6 py-3">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody>
              {DueTab?.map((itm, i) => (
                <tr key={itm.id} className="bg-white border-b">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex gap-3">
                      <FontAwesomeIcon icon={faTicket} className="w-5 h-5 text-yellow-500" />
                      {itm.id_ticket}
                    </div>
                  </td>

                  <th
                    scope="row"
                    className="px-4 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {itm.libelle}
                  </th>
                  <td className="px-4 sm:px-6 py-4">{itm.description}</td>
                  <td className="px-4 sm:px-6 py-4">
                    <span
                      class={`${colorByStatus(
                        itm.status
                      )} text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}
                    >
                      {itm.status}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell">---</td>

                  <td className="hidden sm:table-cell">
                    <div class="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        class="bg-[#1f263e] h-1.5 rounded-full"
                        style={{ width: `${Math.floor(Math.random() * (100 - 20 + 1) + 20)}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 relative">
                      <div className="text-center sm:text-left mb-2 sm:mb-0">
                        {convertDate(itm.insert_date).formattedDate}
                      </div>

                      <div className="flex gap-2">
                        <button
                          className={`bg-inherit  ${
                            !convertDate(itm.insert_date).isGreaterThan
                              ? "text-red-600 cursor-pointer "
                              : "text-gray-400 cursor-no-drop"
                          }`}
                          disabled={convertDate(itm.insert_date).isGreaterThan ? false : true}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className={`w-4 h-4 hover:opacity-60 duration-100 transition-all `}
                          />
                        </button>

                        <button
                          className="bg-inherit"
                          disabled={itm.status === "close" ? false : true}
                        >
                          <FontAwesomeIcon
                            icon={faDownload}
                            className={`w-5 h-5 hover:opacity-60 duration-100 transition-all ${
                              itm.status === "close"
                                ? "text-blue-600 cursor-pointer"
                                : "cursor-not-allowed text-gray-400"
                            } `}
                          />
                        </button>
                        <div className="bg-inherit">
                          <FontAwesomeIcon
                            icon={faEye}
                            onClick={() => ShowPopUpEye(itm.id_ticket)}
                            className="w-5 h-5 cursor-pointer hover:opacity-60 duration-100 transition-all text-blue-600"
                          />
                        </div>
                        <button
                          onClick={() => setShowUploadFiles((prev) => !prev)}
                          disabled={!convertDate(itm.insert_date).isGreaterThan ? false : true}
                          className="bg-inherit"
                        >
                          <FontAwesomeIcon
                            icon={faFileImport}
                            className={`w-5 h-5 ml-14 ${
                              !convertDate(itm.insert_date).isGreaterThan
                                ? "cursor-pointer hover:opacity-60 duration-100 transition-all text-green-600"
                                : "hover:opacity-60 duration-100  text-gray-400 cursor-not-allowed"
                            } `}
                          />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal setIsOpen={setShowTicket} isOpen={ShowTicket}>
          <h5 className="text-center text-lg font-bold">{t("add_new_ticket")}</h5>
          <div className="container w-10/12 mx-auto p-3">
            <div className="mb-6">
              <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                {t("title")}
              </label>
              <input
                type="text"
                id="email"
                onChange={(e) => setLibelle(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Smith. Wolf"
                required
              />
            </div>
            <div className="mb-6">
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("description")}
              </label>

              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-50 border h-24 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id="description"
              ></textarea>
            </div>

            <button
              type="button"
              onClick={AddTicket}
              className="text-white flex gap-3 items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              {t("validate")}
            </button>
          </div>
        </Modal>
        <Modal setIsOpen={setShowEye} isOpen={ShowEye}>
          <div className="flow-root">
            <h3 className="">
              <b>{t("ticket")}</b> : {IdTicket}
            </h3>
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 ">
              {DetailDue.length > 0 ? (
                DetailDue?.map((itm) => (
                  <li className="py-3 sm:py-4  border-t mt-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <div
                          onClick={() => ShowFile(itm.file)}
                          className="text-lg  flex gap-3 font-medium text-gray-900 items-center truncate  cursor-pointer underline  hover:opacity-60 duration-100 transition-all"
                        >
                          <FontAwesomeIcon icon={faFilePdf} className="w-5 h-5 text-red-500 " />
                          {itm.file}
                        </div>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {itm.description}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <div className="flex gap-3 items-center">
                          <span className="">{itm.insert_date}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-center">{t("No_data_found")}</li>
              )}
            </ul>
            {ShowFilePop && (
              <Modal setIsOpen={setShowFilePop} isOpen={ShowFilePop}>
                <embed src={Url} className="w-full h-screen" />
              </Modal>
            )}
          </div>
        </Modal>
        <Modal setIsOpen={handleClose} isOpen={ShowUploadFiles}>
          <div className="container mx-auto ">
            <div
              onClick={AppenDivs}
              className="flex gap-3  text-white font-bold rounded shadow  p-1 mx-auto bg-blue-600 items-center mb-2 hover:opacity-60 duration-100 transition-all cursor-pointer w-52"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
              {t("ajouter_un_autre_zone")}
            </div>

            <div className="h-52 overflow-auto w-full">
              <div className="grid grid-cols-12 gap-3 mt-5 border p-1.5  shadow rounded-t">
                {ArraysDiv?.map((_, i) => (
                  <>
                    {i > 0 && <div className="col-span-12 border-b w-full"></div>}
                    <div className="col-span-8 flex gap-2 items-center ">
                      <FontAwesomeIcon
                        onClick={() => deleteLineupload(i)}
                        className="w-4 h-4 text-red-600 hover:opacity-60 duration-100 cursor-pointer "
                        icon={faTrash}
                      />
                      <input
                        onChange={UploadFile}
                        type="file"
                        className="w-auto shadow col-span-8 h-9 cursor-pointer m-0 min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 hover:opacity-60 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="titre "
                      onChange={(e) => setTitle(e.target.value)}
                      className={`col-span-4 ${
                        RequiredTitle && "border-red-500"
                      }  w-auto shadow border rounded p-1 `}
                      required={true}
                    />
                  </>
                ))}
              </div>
            </div>
            <button
              className="mt-10 bg-blue-600 shadow-xl flex items-center justify-center gap-5 text-white font-medium rounded p-1 w-96 mx-auto hover:bg-blue-500 transition-all duration-100  mb-3"
              onClick={handleUploadFile}
            >
              <FontAwesomeIcon icon={faFileExport} className="w-5 h-5" />
              Upload
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default TableDue;
