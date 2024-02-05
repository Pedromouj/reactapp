import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { countryIsoCodeToName } from "../../../../util/data";
const CompanyHouseHit = ({ hit, OpenDetailPopup }) => {
  return (
    <div className={`  flex flex-col h-full`} onClick={() => OpenDetailPopup(hit)}>
      <div className="flex flex-col">
        <div className="flex gap-5 items-start">
          <div className="flex flex-col flex-grow">
            <span className="text-sm flex justify-between">
              <h6 className="font-semibold">{hit.title}</h6>
            </span>
            <span className="text-sm text-gray-700 capitalize">{hit.date_of_creation}</span>
            <span className="text-sm text-gray-700">{hit.address_snippet}</span>
          </div>

          <FontAwesomeIcon
            icon={faEye}
            className="flex justify-end w-5 h-5 text-blue-600 hover:opacity-60 duration-100 transition-all cursor-pointer  "
            onClick={(e) => {
              e.stopPropagation();
              OpenDetailPopup(hit);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyHouseHit;
