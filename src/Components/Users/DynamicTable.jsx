import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const DynamicTable = ({ Reslult, setPopUp }) => {
  return (
    <div className="relative overflow-x-auto  shadow-md rounded-md">
      <button
        className="bg-green-700 text-white font-medium  hover:bg-white hover:text-green-700 hover:border hover:border-green-700 md:w-auto  hover:shadow-md transition-all duration-100 rounded p-1  mb-1 flex gap-1 items-center"
        onClick={() => setPopUp((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
        Add roles
      </button>
      <table className="w-full text-sm text-left text-gray-500  ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {Reslult.length > 0 ? (
            Reslult?.map((itm) => (
              <tr key={itm.id} className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {itm.id}
                </th>
                <td className="px-6 py-4"> {itm.name}</td>
                <td className="px-6 py-4"> {itm.description ? itm.description : "---"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td>
                <span className="flex justify-center w-full ml-10 mt-5 mb-5 text-lg  ">
                  There's no Permissions found
                </span>
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
