const CardPlaceholder = ({ searchTerm, type, typeColor = "darkblue" }) => {
  return (
    <div
      role="status"
      className={`p-4 space-y-4 border border-gray-200 shadow animate-pulse rounded-lg h-full`}
    >
      <div className="flex items-end justify-between">
        <svg
          className="w-10 h-10 mr-2 text-gray-200"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          ></path>
        </svg>
        {searchTerm ? (
          <div className="rounded-full w-4/5 mb-2.5 font-bold uppercase">{searchTerm}</div>
        ) : (
          <div className="h-2.5 bg-gray-300 rounded-full w-4/5 mb-2.5"></div>
        )}
      </div>

      {searchTerm ? (
        <>
          <div className="h-2.5 w-full bg-gray-300 rounded-full"></div>
          <div className="w-full flex justify-center items-center">
            <span
              className={`font-extrabold text-xl uppercase ${
                typeColor.includes("bg-") && typeColor
              }`}
              style={{ color: typeColor }}
            >
              {type}
            </span>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full"></div>
        </>
      ) : (
        <>
          <div className="h-2.5 w-full bg-gray-300 rounded-full"></div>
          <div className="h-2.5 w-full bg-gray-300 rounded-full"></div>
        </>
      )}
    </div>
  );
};

export default CardPlaceholder;
