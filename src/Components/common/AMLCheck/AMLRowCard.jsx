import { countryIsoCodeToName } from "../../../util/data";
import EntityImage from "./EntityImage";

const AMLRowCard = ({ entity, rest }) => {
  // eslint-disable-next-line
  const types = {
    person: {
      title: "PEP",
      color: "text-blue-600",
      border: "border-blue-300",
    },
    person_pep: {
      title: "PEP",
      color: "text-blue-600",
      border: "border-blue-300",
    },
    sanction: {
      title: "Sanction",
      color: "text-red-600",
      border: "border-red-300",
    },
    watchlist: {
      title: "Watchlist",
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
    <div {...rest}>
      <div className="flex flex-col">
        <div className="flex gap-5">
          <EntityImage entity={entity} />
          <div className="flex flex-col flex-grow">
            <span className="text-sm">{entity._source.name}</span>
            <span className="text-xs text-gray-700 capitalize">{entity._source.category}</span>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-2">
          <div className="col-span-4">Matched</div>
          <div className="col-span-8">
            <span
              className={`text-sm py-1 px-3 rounded border ${
                types[entity._source.datatype]?.border
              } font-bold ${types[entity._source.datatype]?.color}`}
            >
              {types[entity._source.datatype]?.title}
            </span>
          </div>
          {entity._source.countries?.length ? (
            <div className="col-span-12 mt-2 flex gap-4 flex-wrap">
              {entity._source.countries.map((country) => (
                <div className="flex items-center gap-1" key={country}>
                  <img
                    width="auto"
                    height="auto"
                    src={`${import.meta.env.VITE_COUNTRIES_IMG_BASE_URL}/${country}.png`}
                    alt=""
                    className="inline"
                  />
                  <span>{countryIsoCodeToName(country)}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

AMLRowCard.defaultProps = {
  showDatatype: true,
};

export default AMLRowCard;
