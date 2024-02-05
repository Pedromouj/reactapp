import { faEdit, faKey, faPlus, faTrash, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../Tools/Modals";
import ColorByType from "../Tools/ColorByType";
import Token from "../Tools/Token";
import UsersInfo from "../Tools/UsersInfo";
import { useTranslation } from "react-i18next";
const TableUser = () => {
  const [Users, setUsers] = useState([]);
  const [USerItem, setUserItem] = useState();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [AddPopUp, setAddPopUp] = useState(false);
  const [Role, setRole] = useState([]);
  const [Permissions, setPermissions] = useState([]);
  const [onChangeRole, setOnchangeRole] = useState("0");
  const [RolePopUp, setRolePopUp] = useState(false);
  const [PermissionsPopUp, setPermissionsPopUp] = useState(false);
  const [selectedTab, setselectedTab] = useState("user");
  const [ShowPermissionChoice, setShowPermissionChoice] = useState(false);
  const [checkboxItems, setCheckboxItems] = useState([]);
  const [idRole, setIdRole] = useState();
  const [checkedItems, setCheckedItems] = useState({});
  const [checkBoxChecked, setCheckBoxchecked] = useState([]);
  const [EditUserPop, setEditUserPop] = useState(false);
  const [PasswordShowPop, setPasswordShowPop] = useState(false);
  const { t } = useTranslation();
  const FetchAllUsersData = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_USERS}/user/list`, {
      headers: {
        Authorization: Token,
      },
    });
    setUsers(data.user);
    console.log(data);
  };

  const FetchRoles = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_USERS}/role/list`, {
      headers: {
        Authorization: Token,
      },
    });
    setRole(data.user);
  };

  const FetchPermissions = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_USERS}/permission/list`, {
      headers: {
        Authorization: Token,
      },
    });
    setPermissions(data?.permission);
  };

  const AddPermissions = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL_USERS}/permission/add`,
      {
        name: Name,
        description: Description,
      },
      {
        headers: {
          Authorization: Token,
        },
      }
    );
    FetchPermissions();
  };

  useEffect(() => {
    FetchPermissions();
    FetchAllUsersData();
    FetchRoles();
  }, []);

  const ShowPermission = async (id) => {
    setIdRole(id);
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL_USERS}/permission/listByRole/${id}`,
      {
        headers: {
          Authorization: Token,
        },
      }
    );
    console.log(data);
    setShowPermissionChoice((prev) => !prev);
    setCheckBoxchecked(data);
    // setCheckboxItems([]);
  };

  const handleUpdate = (index, itm) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    const updatedCheckboxItems = [...checkboxItems];

    if (checkboxes[index].checked) {
      updatedCheckboxItems.push(checkboxes[index].value);
    } else {
      const valueToRemove = checkboxes[index].value;
      const indexToRemove = updatedCheckboxItems.indexOf(valueToRemove);
      if (indexToRemove !== -1) {
        updatedCheckboxItems.splice(indexToRemove, 1);
      }

      DeletePermissiontRoles(itm.id);
    }

    // Remove undefined values from the array
    const filteredCheckboxItems = updatedCheckboxItems.filter((item) => item !== undefined);

    setCheckboxItems(filteredCheckboxItems);

    console.log(filteredCheckboxItems);
  };
  const AddUser = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL_USERS}/user/add`,
      {
        username: Username,
        password: Password,
        role_id: onChangeRole,
      },
      {
        headers: {
          Authorization: Token,
        },
      }
    );

    FetchAllUsersData();
    setAddPopUp(false);
  };

  const AddRoles = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL_USERS}/role/add`,
      {
        name: Name,
        description: Description,
      },
      {
        headers: {
          Authorization: Token,
        },
      }
    );
    FetchRoles();
    setRolePopUp(false);
  };

  const AddSelectedPermissiontRoles = async () => {
    checkboxItems.map(async (itm) => {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_USERS}/role/permissions/assign`,
        {
          role_id: idRole,
          permission_id: parseInt(itm),
        },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
    });
  };

  const DeletePermissiontRoles = async (id) => {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL_USERS}/role/permissions/deleteAssign`,
      {
        role_id: idRole,
        permission_id: id,
      },
      {
        headers: {
          Authorization: Token,
        },
      }
    );

    FetchPermissions();
  };
  useEffect(() => {
    // Initialize the checkedItems state based on UsersInfo.Permissions
    const initialCheckedItems = {};
    Permissions?.forEach((itm) => {
      initialCheckedItems[itm.id] = UsersInfo?.permissions?.includes(itm.name) || false;
    });
    setCheckedItems(initialCheckedItems);
  }, [Permissions, UsersInfo]);

  const handleCheckboxChange = (itm) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itm.id]: !prevCheckedItems[itm.id],
    }));

    console.log(checkedItems);
  };

  const checkStatment = (itm) => {
    return checkBoxChecked?.permission?.some((second) => second.permission_id === itm.id);
  };

  const getObject = (itm) => {
    console.log(itm, "object");
    setUserItem(itm);
    setEditUserPop((prev) => !prev);
    console.log("role_select", document?.querySelector("#role_select"));
  };

  const UpdateUser = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL_USERS}/user/update`,
      {
        user_id: USerItem.id,
        username: document?.getElementById("Username")?.value,
        password: USerItem.password,
        role_id: parseInt(onChangeRole) ? parseInt(onChangeRole) : USerItem.role_id,
      },
      {
        headers: {
          Authorization: Token,
        },
      }
    );

    FetchAllUsersData();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL_USERS}/user/delete/${id}`, {
      headers: {
        Authorization: Token,
      },
    });
    FetchAllUsersData();
  };

  return (
    <>
      {/* <span onClick={() => console.log(Token)}>getToken</span> */}
      <div className="flex gap-1  items-center">
        <button
          className={`${
            selectedTab === "user"
              ? "bg-blue-600 text-white font-medium   hover:bg-white hover:text-blue-600 hover:border hover:border-blue-600"
              : "bg-white border border-blue-600  text-blue-600 font-medium shadow-md   hover:opacity-60"
          }   hover:shadow-md transition-all duration-100 rounded p-1 md:w-32 justify-center mb-1 flex gap-1 items-center`}
          onClick={() => setselectedTab("user")}
        >
          {t("user")}s
        </button>

        <button
          className={`${
            selectedTab === "roles"
              ? "bg-green-700 text-white font-medium  hover:bg-white hover:text-green-700 hover:border hover:border-green-700"
              : "bg-white border border-green-600  shadow-md text-green-600 font-medium   hover:opacity-60"
          } md:w-32 justify-center  hover:shadow-md transition-all duration-100 rounded p-1  mb-1 flex gap-1 items-center`}
          onClick={() => setselectedTab("roles")}
        >
          Packs
        </button>
        <button
          className={`${
            selectedTab === "permission"
              ? "bg-yellow-500 text-white font-medium  hover:bg-white hover:text-yellow-700 hover:border hover:border-yellow-700 "
              : "bg-white border border-yellow-600  shadow-md text-yellow-600 font-medium   hover:opacity-60"
          }  md:w-32 justify-center  hover:shadow-md transition-all duration-100 rounded p-1  mb-1 flex gap-1 items-center`}
          onClick={() => setselectedTab("permission")}
        >
          APIs
        </button>
      </div>

      <Modal setIsOpen={setEditUserPop} isOpen={EditUserPop}>
        <h5 className="text-center text-lg font-bold">
          {t("update")} {t("user")}
        </h5>
        <div className="container w-10/12 mx-auto p-3">
          <div className="mb-6">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">
              {t("username")}
            </label>
            <input
              type="text"
              id="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Smith. Wolf"
              defaultValue={USerItem?.username}
              required
            />
          </div>

          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              API
            </label>
            <select
              onChange={(e) => setOnchangeRole(e.target.value)}
              id="role_select"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 mb-2"
              defaultValue={USerItem?.role_id} // Set the value of the select element based on USerItem?.role_id
            >
              {Role?.map((itm) => (
                <option key={itm.id} value={itm.id}>
                  {itm.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={UpdateUser}
            className="text-white flex gap-3 items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {t("update")}
          </button>
        </div>
      </Modal>

      {selectedTab === "user" && (
        <div className="relative    shadow-md rounded-md overflow-auto ">
          <table className="w-full text-sm text-left text-gray-500 h-96 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  {t("username")}
                </th>
                <th scope="col" className="px-6 py-3">
                  Date insertion
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("Controls")}
                </th>
                <th>
                  <button
                    className="bg-blue-600 text-white font-medium  hover:bg-white hover:text-blue-600 hover:border hover:border-blue-600  hover:shadow-md transition-all duration-100 rounded p-1 md:w-auto mb-1 flex gap-1 items-center"
                    onClick={() => setAddPopUp((prev) => !prev)}
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                    {t("add")} {t("user")}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {Users.length > 0 ? (
                Users?.map((itm) => (
                  <tr key={itm.id} className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {itm.id}
                    </th>
                    <td className="px-6 py-4"> {itm.username}</td>
                    <td className="px-6 py-4"> {itm.insertdata ? itm.insertdata : "---"}</td>

                    <td className=" px-6 py-4">
                      <div className="flex gap-4">
                        <button
                          onClick={() => getObject(itm)}
                          className="bg-green-600 rounded w-10 p-1"
                        >
                          <FontAwesomeIcon icon={faEdit} className="w-4 h-4 text-white" />
                        </button>

                        <button
                          onClick={() => setPasswordShowPop((prev) => !prev)}
                          className="bg-inherit"
                        >
                          <FontAwesomeIcon icon={faKey} className="w-5 h-5 text-yellow-400 " />
                        </button>
                        <button className="bg-inherit" onClick={() => deleteUser(itm.id)}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="w-5 h-5 text-red-600 rounded"
                          />
                        </button>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <span className="flex justify-center w-full ml-10 mt-5 mb-5 text-lg  ">
                      {t("No_data_found")}
                    </span>
                  </td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {selectedTab === "roles" && (
        <div className="relative overflow-auto h-96 shadow-md rounded-md">
          <table className="w-full text-sm text-left text-gray-500  ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  {t("nom")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("description")}
                </th>
                <th>
                  <button
                    className="bg-green-700 text-white font-medium  hover:bg-white hover:text-green-700 hover:border hover:border-green-700 md:w-auto  hover:shadow-md transition-all duration-100 rounded p-1  mb-1 flex gap-1 items-center"
                    onClick={() => setRolePopUp((prev) => !prev)}
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                    {t("add")} Pack
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {Role?.length > 0 ? (
                Role?.map((itm) => (
                  <tr key={itm.id} className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {itm.id}
                    </th>
                    <td className="px-6 py-4"> {itm.name}</td>
                    <td className="px-6 py-4"> {itm.description ? itm.description : "---"}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => ShowPermission(itm.id)}
                        className="bg-white border border-yellow-600 rounded mx-auto text-yellow-600 font-bold hover:opacity-60 p-1"
                      >
                        {t("assign_to_api")}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <span className="flex justify-center w-full ml-10 mt-5 mb-5 text-lg  ">
                      {t("No_data_found")}
                    </span>
                  </td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedTab === "permission" && (
        <>
          <div className="relative overflow-auto h-96 shadow-md rounded-md">
            <table className="w-full text-sm text-left text-gray-500  ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 cursor-pointer">
                    {t("nom")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("description")}
                  </th>
                  <th>
                    <button
                      className="bg-yellow-500 text-white font-medium mx-auto hover:bg-white hover:text-yellow-700 hover:border hover:border-yellow-700 md:w-auto  hover:shadow-md transition-all duration-100 rounded p-1  mb-1 flex gap-1 items-center"
                      onClick={() => setPermissionsPopUp((prev) => !prev)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                      {t("add")} APIs
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Permissions?.length > 0 ? (
                  Permissions?.map((itm) => (
                    <tr key={itm.id} className="bg-white border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {itm.id}
                      </th>
                      <td className="px-6 py-4"> {itm.name}</td>
                      <td className="px-6 py-4"> {itm.description ? itm.description : "---"}</td>
                      <td></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="flex justify-center w-full ml-10 mt-5 mb-5 text-lg  ">
                        {t("No_data_found")}
                      </span>
                    </td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Modal isOpen={PasswordShowPop} setIsOpen={setPasswordShowPop}>
        <h5 className="text-center text-lg font-bold">
          {t("update")} {t("password")}
        </h5>
        <div className="container w-10/12 mx-auto p-3">
          <div className="mb-6">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">
              {t("New_password")}
            </label>
            <input
              type="text"
              id="passowrd1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="*********"
              required
            />
          </div>
          <div className="mb-6">
            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">
              {t("Confirmez_pass")}
            </label>

            <input
              type="password"
              id="passowrd1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="*********"
              required
            />
          </div>

          <button
            type="button"
            // onClick={AddRoles}
            className="text-white flex gap-3 items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {t("update_password")}
          </button>
        </div>
      </Modal>

      <Modal setIsOpen={setAddPopUp} isOpen={AddPopUp}>
        <h5 className="text-center text-lg font-bold">Add new user</h5>
        <div className="container w-10/12 mx-auto p-3">
          <div className="mb-6">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">
              Username
            </label>
            <input
              type="text"
              id="Username"
              onChange={(e) => setUsername(e.target.value)}
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
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              API
            </label>
            <select
              onChange={(e) => setOnchangeRole(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 mb-2"
            >
              <option value={"-1"} disabled selected>
                select API
              </option>
              {Role?.map((itm) => (
                <option key={itm.id} value={itm.id}>
                  {itm.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={AddUser}
            className="text-white flex gap-3 items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Add user
          </button>
        </div>
      </Modal>

      <Modal setIsOpen={setRolePopUp} isOpen={RolePopUp}>
        <h5 className="text-center text-lg font-bold">Add new API</h5>
        <div className="container w-10/12 mx-auto p-3">
          <div className="mb-6">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">
              {t("titre")}
            </label>
            <input
              type="text"
              id="email"
              onChange={(e) => setName(e.target.value)}
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
            onClick={AddRoles}
            className="text-white flex gap-3 items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {t("add")} pack
          </button>
        </div>
      </Modal>

      <Modal setIsOpen={setPermissionsPopUp} isOpen={PermissionsPopUp}>
        <h5 className="text-center text-lg font-bold">Add new permission</h5>
        <div className="container w-10/12 mx-auto p-3">
          <div className="mb-6">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">
              Name
            </label>
            <input
              type="text"
              id="email"
              onChange={(e) => setName(e.target.value)}
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
              description
            </label>

            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-50 border h-24 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="description"
            ></textarea>
          </div>

          <button
            type="button"
            onClick={AddPermissions}
            className="text-white flex gap-3 items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Add permission
          </button>
        </div>
      </Modal>

      <Modal setIsOpen={setShowPermissionChoice} isOpen={ShowPermissionChoice}>
        <div className="container w-full mx-auto  gap-2  items-center ">
          <h3 className="mb-4 font-semibold text-xl text-gray-900 text-center">Les API</h3>
          <ul className="grid grid-cols-12 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg  p-3">
            {Permissions?.map((itm, index) => (
              <li className="col-span-6 w-full border-b border-gray-200  p-2">
                <div key={itm.id} className="flex gap-3 items-center pl-3">
                  <input
                    type="checkbox"
                    id={`checkbox${itm.id}`}
                    onClick={() => handleUpdate(index, itm)}
                    // defaultChecked={checkedItems[itm.id] || false}
                    defaultChecked={checkStatment(itm)}
                    onChange={() => handleCheckboxChange(itm)}
                    defaultValue={itm.id}
                  />
                  <label htmlFor="sd">{itm.name}</label>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-5">
            <button
              onClick={AddSelectedPermissiontRoles}
              className="bg-white border w-52 border-blue-600 rounded mx-auto text-blue-600 font-bold hover:opacity-60 p-1 "
            >
              Add
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TableUser;
