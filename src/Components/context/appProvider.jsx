import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Token from "../Tools/Token";
import UsersInfo from "../Tools/UsersInfo";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    username: UsersInfo?.username,
    userid: UsersInfo?.userid,
  });

  const [isOpenSidebar, setIsOpenSidebar] = useState(
    localStorage.getItem("isMiniSideBar") !== "true"
  );

  const [amlSearchInformation, setAmlSearchInformation] = useState(null);
  const [userChat, setUserChat] = useState([]);
  const [notification, setNotification] = useState([]);

  const fetchUsersChat = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL_USERS}/chattickets/list`,
      {
        headers: {
          Authorization: Token,
        },
      }
    );

    setUserChat(data?.tickets);

    console.log(data);
    const promises = [];

    data?.tickets?.forEach((itm) => {
      const promise = axios.get(
        `${import.meta.env.VITE_API_BASE_URL_USERS}/chattickets/check_notification/${
          itm.id_ticket
        }`,
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      promises.push(promise);
    });

    const results = await Promise.all(promises);

    setNotification(results);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUsersChat();
    }, 180000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <AppContext.Provider
      value={{
        notification,
        setNotification,
        isOpenSidebar,
        setIsOpenSidebar,
        amlSearchInformation,
        setAmlSearchInformation,
        authState,
        setAuthState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
