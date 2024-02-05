import { countryIsoCodeToName } from "../../Components/util/data";
const DisplayCountries = ({ entity, size = 32, showCountryName = true }) => {
  let template = "";

  const removeDuplicatesFromArray = (arr) => {
    const set = new Set(arr);
    return Array.from(set);
  };

  const splitAndMap = (countries) => {
    return removeDuplicatesFromArray(countries.split(countries.includes(",") ? "," : ";")).map(
      (country) => (
        <Country size={size} country={country} key={country} showCountryName={showCountryName} />
      )
    );
  };

  if (entity.countries) {
    template = splitAndMap(entity.countries);
  } else if (entity.country) {
    template = splitAndMap(entity.country);
  } else if (entity.pays) {
    template = splitAndMap(entity.pays);
  } else if (entity.Pays) {
    template = splitAndMap(entity.Pays);
  } else if (entity.country_authority) {
    template = splitAndMap(entity.country_authority);
  } else if (entity.pays_emetteur) {
    template = splitAndMap(entity.pays_emetteur);
  } else if (entity.list_country) {
    template = splitAndMap(entity.list_country);
  }

  return <div className="flex gap-2">{template}</div>;
};

const Country = ({ country, showCountryName, size }) => {
  return (
    <div className="flex items-center gap-1" key={country}>
      <img
        width="auto"
        height="auto"
        src={`https://flagsapi.com/${country.toUpperCase()}/flat/${size}.png`}
        className="inline"
        alt=""
        title={countryIsoCodeToName(country)}
      />
      {
        showCountryName && <div>{country}</div>
        // <span className="text-xs font-bold">{countryIsoCodeToName(country)}</span>
      }
    </div>
  );
};

export default DisplayCountries;
