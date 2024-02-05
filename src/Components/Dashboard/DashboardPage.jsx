import { CChart } from "@coreui/react-chartjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Token from "../Tools/Token";
import ColorByType from "../Tools/ColorByType";
import UsersInfo from "../Tools/UsersInfo";
import picod_banner from "/banners/banner_picod.png";
import { useTranslation } from "react-i18next";
const DashboardPage = () => {
  const [Permissions, setPermissions] = useState([]);
  const [UserCredit, setUserCredit] = useState();
  const [TotaleRequests, setTotaleRequests] = useState();
  const { t } = useTranslation();

  const FetchPermissions = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_USERS}/permission/list`, {
      headers: {
        Authorization: Token,
      },
    });

    setPermissions(data?.permission);
    console.log(data.permission);
  };

  const UserCredits = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_USERS}/user/list`, {
      headers: {
        Authorization: Token,
      },
    });
    const UserCredits = data?.user
      ?.filter((itm) => itm.username === UsersInfo.username)
      ?.map((itm) => {
        return itm;
      });

    if (UserCredits?.length > 0) {
      setUserCredit(UserCredits[0].credits);
      setTotaleRequests(UserCredits[0].total_credit);
    }
  };

  useEffect(() => {
    FetchPermissions();
    UserCredits();
  }, []);

  return (
    <>
      <img src={picod_banner} className="w-full mt-3  " draggable={false} />
      <div className="container w-full mx-auto mt-12 cursor-default">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto h-72 sm:w-full lg:w-auto sm:mr-0 lg:mr-10">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 text-black mx-auto bg-white p-4 shadow-md w-96 lg:w-full border rounded items-center ">
            <div className="font-bold text-xl mb-7 text-center bg-[#011b44] rounded-md p-2  md:w-auto mx-auto text-white  uppercase">
              {t("categories")}
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-3   lg:grid-cols-6 items-center w-fit mx-auto  gap-5   h-40   overflow-y-auto">
              {UsersInfo?.permissions?.map((itm) => (
                <div
                  key={itm.id}
                  title={itm}
                  className="col-span-3 truncate rounded sm:col-span-2 bg-white  md:w-auto"
                >
                  <span
                    style={ColorByType(itm)}
                    className={`p-1 rounded md:w-auto  cursor-pointer  font-medium text-sm shadow-lg `}
                  >
                    {itm}
                  </span>
                </div>
              ))}
            </div>
            <div className="border border-blue-900 text-blue-900 cursor-pointer  font-medium p-0.5 md:w-auto sm:w-80 mt-14 mx-auto text-center rounded bg-white shadow text-xl hover:opacity-60 transition-all duration-100">
              {t("read_more")}
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 text-black mx-auto bg-white p-4 shadow-md w-96 lg:w-full border rounded gap-3 items-center">
            <div className="font-bold text-xl bg-[#011b44]  rounded-md p-2 md:w-auto mx-auto text-white text-center uppercase">
              {t("number_of_requests")}
            </div>
            <div className="text-8xl text-center mt-10 font-medium  h-36  mb-10">
              {TotaleRequests !== null ? TotaleRequests : 0}
            </div>
            <div className="border border-blue-900 text-blue-900 cursor-pointer  font-medium p-0.5 md:w-auto sm:w-80 mt-14 mx-auto text-center rounded bg-white shadow text-xl hover:opacity-60 transition-all duration-100">
              {t("read_more")}
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 text-black mx-auto bg-white p-4 shadow-md w-96 lg:w-full border rounded">
            <div className="font-bold text-xl bg-[#011b44] rounded-md p-2 md:w-auto mx-auto text-white text-center uppercase">
              {t("remaining_credits")}
            </div>
            <div className="text-8xl text-center mt-10 font-medium   h-36  mb-10">{UserCredit}</div>
            <div className="border border-blue-900 text-blue-900 cursor-pointer  font-medium p-0.5 md:w-auto sm:w-80 mt-14 mx-auto text-center rounded bg-white shadow text-xl hover:opacity-60 transition-all duration-100">
              {t("read_more")}
            </div>
          </div>
          <div className="lg:col-span-3 sm:col-span-2  mt-14 md:w-[60%] mx-auto">
            <CChart
              className="md:w-auto"
              type="bar"
              data={{
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                  {
                    label: "Trafic",
                    backgroundColor: "#1f263e",
                    borderColor: "rgba(151, 187, 205, 1)",
                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                    pointBorderColor: "#fff",
                    data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "",
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
