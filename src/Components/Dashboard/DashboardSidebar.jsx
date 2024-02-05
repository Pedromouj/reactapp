import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApp from "../hooks/useApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUsers } from "@fortawesome/free-solid-svg-icons";
import picod_logo from "/svg/logo-no-background.svg";
import picod_logo_seule from "/svg/maccess-seule-white.svg";
import Dashboard from "/icons/Dashboard_picod.svg";
import history_icon from "/icons/history-PICOD.svg";
import Faq from "/icons/faq_PICOD.svg";
import UsersInfo from "../Tools/UsersInfo";
const DashboardSidebar = () => {
  const { isOpenSidebar, setIsOpenSidebar } = useApp();
const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [Active, setActive] = useState("Dashboard");
  // const toggleDropdown = () => {
  //   setDropdownOpen(!isDropdownOpen);
  // };

  useEffect(() => {
    // Function to update innerWidth
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
  
    // Attach the event listener when the component mounts
    window.addEventListener('resize', handleResize);
  
    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount
  
  
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <>
      {!isOpenSidebar && (
        <div
          onClick={() => setIsOpenSidebar(true)}
          className="fixed top-0 left-0  w-full h-screen lg:hidden z-40"
        ></div>
      )}

      <div
        className={`fixed lg:relative top-0 left-0 z-50 flex flex-col gap-4 items-center text-md  font-bold ${
          !isOpenSidebar ? "w-fit lg:w-72" : "w-0 lg:w-16"
        } h-screen overflow-hidden text-white  bg-[#000000d1] shadow-md `}
      >
        <Link to={"/"} onClick={() => setActive("Dashboard")}>
          <div className="flex items-center text-white  justify-center  w-full px-3 mt-9  cursor-pointer font-bold">
            {!isOpenSidebar ? (
              <img src={picod_logo} alt="" className="w-52  h-16" />
            ) : (
              <img src={picod_logo_seule} alt="" className="w-20 h-auto " />
            )}
            <button
              className="rounded p-1  text-white lg:hidden"
              onClick={() => setIsOpenSidebar((prev) => !prev)}
            >
              {/* <XMarkIcon className="w-5 h-5" /> */}
            </button>
          </div>
        </Link>
        <div
          className={`${
            !isOpenSidebar ? "w-full px-2" : "py-3"
          } space-y-2 font-medium overflow-auto`}
        >
          <div className="flex flex-col gap-1 items-center w-full mt-3 mb-5  select-none">
            {/* authState.identifiant.startsWith("harry") &&  */}
          </div>
          <ul className="mb-5  text-lg font-thin">
            <Link to={"/"}>
              <li
                onClick={() => setActive("Dashboard")}
                className={` text-white transition-all ${
                  Active === "Dashboard" &&
                  "bg-[#303750] font-bold   border-l-4 rounded-none border-[#0fd1fe] w-auto"
                } hover:bg-[#303750] duration-100 cursor-pointer   list-none mt-2 flex items-center p-2 rounded-lg     group`}
              >
                {!isOpenSidebar ? (
                  <span className=" flex gap-5 items-center text-lg ">
                    <img src={Dashboard} className="w-7 h-7  " />
                    Dashboard
                  </span>
                ) : (
                  <img src={Dashboard} className="w-8 h-8 mr-1 " />
                )}
              </li>
            </Link>

          {UsersInfo?.status !== 0 && <>

            <li
              onClick={() => setActive("History")}
              className={` ${
                Active === "History" &&
                "bg-[#303750] font-bold  border-l-4 rounded-none border-[#0fd1fe] w-auto"
              }  transition-all duration-100 cursor-pointer  list-none hover:bg-[#303750]  `}
            >
              {!isOpenSidebar ? (
                <Link to={"/calendrier"}>
                  <button
                    type="button"
                    className={` flex gap-5   items-center w-full p-2 text-base text-white rounded-lg group  hover:text-blue-600 transition-all duration-100`}
                  >
                    <img src={history_icon} className="w-7 h-7 " />
                    calendrier
                  </button>
                </Link>
              ) : (
                <>
                  <Link
                    to={"/calendrier"}
                    href="#"
                    className="items-center w-full   transition duration-75 rounded-lg  group  "
                  >
                    <img
                      src={history_icon}
                      className="w-8 h-8  ml-2 cursor-pointer mt-5 duration-100 transition-all"
                    />
                  </Link>
                </>
              )}
            </li>
            
            <Link to={"/employe"}>
              <li
                onClick={() => setActive("Search")}
                className={` 
                ${isOpenSidebar ? "mt-3" : "mt-1"}
                ${                   
                  Active === "Search" &&
                  "bg-[#303750] font-bold  border-l-4  rounded-none border-[#0fd1fe] w-auto"
                } hover:bg-[#303750] text-white transition-all duration-100 cursor-pointer  list-none  flex items-center p-2 rounded-lg   group`}
              >
                {!isOpenSidebar ? (
                  <span className={`  flex gap-5 items-center text-lg  `}>
                   <FontAwesomeIcon icon={faUsers}  className="w-7 h-7 text-[#0fd1fe]" />

                    employes
                  </span>
                ) : (
                   <FontAwesomeIcon icon={faUsers}  className="w-7 h-7 text-[#0fd1fe]" />
                )}
              </li>

          
            </Link>
          </>
}
            
      
         
      

            <li
              onClick={() => setActive("FAQ")}
              className={`${
                Active === "FAQ" &&
                "bg-[#303750] font-bold  border-l-4 rounded-none border-[#0fd1fe] w-auto"
              } transition-all duration-100 cursor-pointer  list-none   mt-2 hover:bg-[#303750]  `}
            >
              {!isOpenSidebar ? (
                <Link to={"/faq"}>
                  <button
                    type="button"
                    className={` flex gap-5  items-center w-full  p-2 text-base text-white rounded-lg group  transition-all duration-100`}
                  >
                    <img src={Faq} className="w-7 h-7 hover:opacity-[0]" />
                    FAQ
                  </button>
                </Link>
              ) : (
                <Link
                  to={"/faq"}
                  className="items-center w-full   relative transition duration-75 rounded "
                >
                  <img
                    src={Faq}
                    className="w-7 h-7   hover:text-blue-600  ml-2 cursor-pointer duration-100 transition-all mt-5"
                  />
                </Link>
              )}
            </li>

            {innerWidth < 768 &&  <li
            onClick={logout}
             className={`
             
               transition-all flex items-center gap-3 duration-100 cursor-pointer  list-none   mt-5 ml-2  `}
            >
              <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="w-7 h-7 text-[#0fd1fe]  hover:text-red-500 cursor-pointer"
                />
                Log out 
              </li>}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
