import React from "react";
import ReturnCardHeader from "../ReturnCardHeader";
import MediaBlocs from "../../Media/MediaBlocs";

function NewsBlock({ keyword }) {
  return (
    <div className="col-span-8  rounded  w-full  mx-auto md:p-0  bg-white shadow-lg border  print:!overflow-hidden  print:!h-full   print:!border-none  print:!shadow-none  print:!justify-center   border-gray-200  sm:p-8   overflow-x-hidden">
      <ReturnCardHeader type={"news"} />
      <MediaBlocs keyword={keyword} />
    </div>
  );
}

export default NewsBlock;
