import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Modal from "../../../../Tools/Modals";

function FilingHistory({ companyNumber }) {
  const [History, setHistory] = useState();
  const [popup, setPopup] = useState(false);
  const [Link, setLink] = useState("");
  const ref = useRef();
  const fetchData = async () => {
    await axios
      .get(`${import.meta.env.VITE_AML_API_BASE_CORPO_URL}/api/filing-history/${companyNumber}`)
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (itm) => {
    const newLink =
      "https://find-and-update.company-information.service.gov.uk" +
      itm.links.self +
      "/document?format=pdf&amp;download=0";

    setLink(newLink);
    setPopup((prev) => !prev);
  };

  const obfuscateLink = (link) => {
    let obfuscatedLink = "";
    for (let i = 0; i < link.length; i++) {
      obfuscatedLink += "%" + link.charCodeAt(i).toString(16);
    }
    return obfuscatedLink;
  };

  return (
    <div>
      <div className=""></div>
      <div class="relative overflow-x-auto border shadow mt-2">
        <table class="w-full m-auto text-sm text-left text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              <th scope="col" class="px-6 py-3">
                View/Download
              </th>
            </tr>
          </thead>
          <tbody>
            {History &&
              History.items?.map((itm) => (
                <tr class="bg-white border-b">
                  <td class="px-6 py-4 w-32">{itm.date}</td>
                  <td class="px-6 py-4">{itm.description}</td>
                  <td class="px-6 py-4">
                    <button
                      onClick={() => handleClick(itm)}
                      className="underline text-blue-500 bg-inherit "
                    >
                      View Pdf
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={popup} setIsOpen={setPopup}>
        <div className="w-full h-full">
          <object data={Link} className="w-full h-screen" />
        </div>
      </Modal>
    </div>
  );
}

export default FilingHistory;
