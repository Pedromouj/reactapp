import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const GlobalAPIHit = ({ hit }) => {
  const countryKeys = ["Country", "Countries"];
  const countries = Array.from(
    new Set(
      hit.doc?.fields
        ?.filter((el) => countryKeys.includes(el.name) && el.value)
        .map((el) => el.value)
    )
  ).join(", ");
  const [showMoreTypes, setShowMoreTypes] = useState(false);

  const types = {
    pep: {
      title: "PEP",
      color: "text-blue-600",
      border: "border-blue-300",
    },
    sanction: {
      title: "Sanction",
      color: "text-red-600",
      border: "border-red-300",
    },
    warning: {
      title: "warning",
      color: "text-orange-600",
      border: "border-orange-300",
    },
    wanted_person: {
      title: "Wanted",
      color: "text-orange-500",
      border: "border-orange-400",
    },
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-2">
        <div className="flex gap-5 items-start">
          <img
            src={`/img/${
              hit.doc.entity_type === "person" ? "fallback_avatar.png" : "fallback_company.png"
            }`}
            className="opacity-50 rounded"
            width={45}
            alt=""
          />
          <div className="flex flex-col flex-grow">
            <span className="text-sm flex flex-col justify-between">
              <span>{hit.doc.name}</span>
              <span className="capitalize text-gray-500">{hit.doc.entity_type}</span>
            </span>
          </div>
        </div>
        <div className="relative">
          <div
            className={`flex gap-1 flex-wrap ${
              !showMoreTypes
                ? "overflow-hidden max-h-8"
                : "bg-white rounded-lg shadow-lg absolute z-50 min-h-full pb-2"
            }`}
          >
            {hit.doc.types.map((type) => (
              <div
                title={type}
                className={`text-sm py-0.5 px-3 max-w-[12ch] w-fit text-ellipsis whitespace-nowrap overflow-hidden rounded border capitalize ${
                  types[type]?.border
                } font-bold ${types[type]?.color || "border-gray-500 text-gray-600"}`}
                key={type}
              >
                {type}
              </div>
            ))}
          </div>
          {hit.doc.types.length > 2 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMoreTypes((prev) => !prev);
              }}
              className="absolute -top-1 -right-1 z-50 hover:bg-gray-300 rounded-full"
            >
              <ChevronDownIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="flex flex-col mt-1">
          <div className="mt-2 flex gap-1 flex-wrap">
            <div className="flex items-center gap-1">{countries}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalAPIHit;
