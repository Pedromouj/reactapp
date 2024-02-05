import { faBars, faChevronDown, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useState } from "react";
import useApp from "../hooks/useApp";
import UsersInfo from "../Tools/UsersInfo";
import { Menu, Transition } from "@headlessui/react";
import i18n from "../../i18n";
import getRandomColorName from "../Tools/ProfilesColor";

function Navbar() {
  const [dynamicDate, setDynamicDate] = useState(new Date());
  const [firstLetter, setFirstLetter] = useState("");
  const [secondLetter, setSecondLetter] = useState("");
  const { isOpenSidebar, setIsOpenSidebar } = useApp();
  const openCloseSideBar = () => {
    localStorage.setItem("isMiniSideBar", isOpenSidebar);
    setIsOpenSidebar((prev) => !prev);
    console.log(isOpenSidebar);
  };

  useEffect(() => {
    const match = UsersInfo?.nom_complet;

    if (match) {
      setFirstLetter(match[0]);
      setSecondLetter(match[1]);
    } else {
      setFirstLetter("");
      setSecondLetter("");
    }

    const interval = setInterval(() => {
      const now = new Date(); // Get the current date and time
      const secondsToAdd = 10; // Adjust the number of seconds to add
      now.setSeconds(now.getSeconds() + secondsToAdd);

      // You can also adjust hours and minutes if needed
      // now.setHours(now.getHours() + 1); // Add 1 hour
      // now.setMinutes(now.getMinutes() + 30); // Add 30 minutes

      setDynamicDate(now);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800  h-16  flex items-center  shadow">
      <div className="flex  items-center  space-x-3   ml-5 mb-5">
        <FontAwesomeIcon
          onClick={openCloseSideBar}
          icon={faBars}
          className="h-6 w-6 sm:w-auto text-gray-500 cursor-pointer mt-4 hover:opacity-60  transition-all active:rotate-12 ease-out duration-75"
        />
      </div>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto ">
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col items-center justify-center  font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-72 md:mt-0 md:border-0 md:bg-transparent ">
            {/* <li className="flex gap-3 mr-3 items-center select-none   md:w-auto sm:w-auto">
              <b>{dynamicDate.toLocaleString()}</b>
              <FontAwesomeIcon icon={faClock} className="w-5 h-5 shadow rounded-full" />
            </li> */}
            <li>
              <LangMenu />
            </li>

            <li className="flex gap-6 items-center">
              <div className="flex items-center gap-1">
                {/* <b>{t("user")}</b> */}

                <div className=" h-10 w-10 shadow hover:opacity-60  duration-100 transition-all border-2  p-1  rounded-full text-white font-semibold flex items-center justify-center  cursor-pointer select-none">
                  <div
                    style={{ backgroundColor: getRandomColorName(firstLetter, secondLetter) }}
                    className="    duration-100 transition-all border-2 border-white p-1  rounded-full text-white font-semibold flex items-center justify-center  cursor-pointer select-none"
                    draggable={false}
                  >
                    {firstLetter && firstLetter.toUpperCase()}
                    {secondLetter && secondLetter.toUpperCase()}
                  </div>
                </div>
                <a
                  href="#"
                  title="User"
                  className="flex ml-1 items-center gap-1 py-2 pl-3 pr-4  bg-blue-700 rounded md:bg-transparent text-black md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  {UsersInfo?.nom_complet}
                </a>
              </div>
              <div
                className=" py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                aria-current="page"
              >
                <FontAwesomeIcon
                  onClick={logout}
                  icon={faRightFromBracket}
                  className="w-4 h-4 hover:text-red-500 cursor-pointer"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
const LangMenu = () => {
  const { authState, setAuthState } = useApp();
  const LANGS = {
    fr: "Français",
    en: "English",
  };
  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    setAuthState((prev) => ({ ...prev, lang }));
    console.log("authState", authState);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex gap-1 items-center w-full justify-center focus:border-blue-500 focus:border rounded-md px-4 py-2 text-sm font-medium">
        <img src={"/icons/Language.svg"} className="w-5 h-5" />
        <span className="hidden md:inline">
          {LANGS[authState?.lang ? authState?.lang : "English"]}
        </span>{" "}
        <span className="flex md:hidden uppercase">
          {authState?.lang ? authState?.lang : "English"}
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4 mb-0" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-36 z-50 origin-top-right rounded-md shadow-lg bg-white border">
          <div className="px-1 py-1">
            {Object.entries(LANGS).map((lang) => (
              <Menu.Item key={lang[0]}>
                {({ active }) => (
                  <button
                    disabled={lang[0] === authState?.lang}
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:text-gray-400`}
                    onClick={() => {
                      changeLang(lang[0]);
                    }}
                  >
                    {lang[1]}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
