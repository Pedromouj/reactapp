import { countryIsoCodeToName } from "../util/data";

const CountryImage = ({ countryCode, size = 32, showCode = false }) => {
  return (
    countryCode && (
      <>
        <img
          width="auto"
          height="auto"
          src={`https://flagsapi.com/${countryCode.toUpperCase()}/flat/${size}.png`}
          className="inline"
          alt=""
          title={countryIsoCodeToName(countryCode)}
        />
        {showCode && countryCode}
      </>
    )
  );
};

export default CountryImage;
