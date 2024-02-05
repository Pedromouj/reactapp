import React, { useCallback, useEffect, useState } from "react";
import useHttpPrivate from "../../../hooks/useHttpPrivate";
import AMLCheck from "./AMLCheck";

const Verification = ({ atome }) => {
  const http = useHttpPrivate();
  const [activeTab, setActiveTab] = useState("pep");
  const [atomeAttributes, setAtomeAttributes] = useState([]);
  const tabs = [
    {
      name: "pep",
      title: "PEP",
    },
    {
      name: "sanction",
      title: "Sanction",
    },
    {
      name: "watchlist",
      title: "Watchlists",
    },
    {
      name: "wanted",
      title: "Wanted persons",
    },
  ];

  const fetchAtomeAttributes = useCallback(async () => {
    try {
      const { data } = await http.put("partypes", { contexte: "atomeattributs" });
      setAtomeAttributes(data);
    } catch (error) {
      console.error(error);
    }
  }, [http]);

  useEffect(() => {
    fetchAtomeAttributes();
  }, [fetchAtomeAttributes]);

  return (
    <>
      <div>
        <ul
          className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
          id="tabs-tab3"
          role="tablist"
        >
          {tabs.map((tab) => (
            <li className="nav-item" role="presentation" key={tab.name}>
              <button
                type="button"
                className={`nav-link w-full block font-bold text-xs leading-tight uppercase px-6 py-3 my-2 hover:bg-gray-100 border-blue-600 ${
                  activeTab === tab.name ? "border-b-2 text-blue-600" : ""
                }`}
                role="tab"
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
        <div className="tab-content" id="tabs-tabContent3">
          <AMLCheck atome={atome} type={activeTab} atomeAttributes={atomeAttributes} />
        </div>
      </div>
    </>
  );
};

export default Verification;
