// import { countryIsoCodeToName } from "../../../../util/data";
const PappersHit = ({ hit }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col">
        <div className="flex gap-5 items-start">
          {/* <img src="/img/fallback_company.png" className="opacity-50" width={45} alt="" /> */}
          <div className="flex flex-col flex-grow">
            <span className="text-sm flex justify-between">
              <h6 className="font-semibold">{hit.nom_entreprise}</h6>
            </span>
            <span className="text-sm text-gray-700 capitalize">{hit.date_creation}</span>
            <span className="text-sm text-gray-700">{hit.domaine_activite}</span>
          </div>
        </div>
        {/* <div className="flex flex-col mt-1">
          <div className="flex w-full">
            <div className="w-2/5 mt-2">Countries</div>
            <div className="w-3/5 mt-2 flex gap-1 flex-wrap">
              <div className="flex items-center gap-1">
                <img
                  width="auto"
                  height="auto"
                  src={`${import.meta.env.VITE_COUNTRIES_IMG_BASE_URL}/FR.png`}
                  className="inline"
                  alt=""
                />
                <span>{countryIsoCodeToName("FR")}</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PappersHit;
