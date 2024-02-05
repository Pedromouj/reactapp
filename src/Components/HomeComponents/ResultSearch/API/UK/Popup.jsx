import { XCircleIcon } from "@heroicons/react/20/solid";
import React from "react";

const Popup = (props) => {
  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-opacity-50  bg-black z-10">
      <div className="relative m-auto w-9/12 h-screen p-1  bg-white rounded   border border-gray-400 overflow-auto ">
        <XCircleIcon
          className="
          fixed
          cursor-pointer  
          top-0
          left-0
          text-red-700
          bg-white
          w-8 h-8 rounded-full leading-none
          hover:opacity-50
           transition-all
           duration-100"
          onClick={props.handleClose}
        />

        {props.content}
      </div>
    </div>
  );
};

export default Popup;
