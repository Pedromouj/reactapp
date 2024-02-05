import React, { lazy, useState } from "react";
import { isImg, isImgUrl, isPdf, parseJson, skippedFields } from "../../util/data";
const CountryImage = lazy(() => import("../../AMLCheck/CountryImage"));
const ImgModal = lazy(() => import("../../common/ImgModal"));
const DisplayCountries = lazy(() => import("../../common/AMLCheck/DisplayCountries"));

const EntityInfoTable = ({ selectedRecord }) => {
  const [imgUrl, setImgUrl] = useState("");

  return (
    <>
      <table className="w-full text-bold text-leftd aml-table h-full print:mt-10 ">
        <tbody className="text-xs font-bold">
          <ShowOthersInformations selectedRecord={selectedRecord} />
          {Object.keys(selectedRecord).map(
            (key) =>
              !!selectedRecord[key] &&
              typeof selectedRecord[key] !== "object" &&
              skippedFields.indexOf(key) === -1 &&
              (["countries", "country", "pays"].includes(key) ? (
                <tr key={key}>
                  <td style={{ minWidth: "100px" }} className="py-1 capitalize text-start">
                    <div className="flex flex-start">{key}</div>
                  </td>
                  <td className="flex gap-2">
                    <DisplayCountries entity={selectedRecord} />
                  </td>
                </tr>
              ) : key === "secteur" ? (
                <tr key={key}>
                  <td style={{ minWidth: "100px" }} className="py-1 capitalize">
                    <div className="flex flex-start">{key.replace("_", " ")}</div>
                  </td>
                  <td
                    className="font-[500] text-justify"
                    dangerouslySetInnerHTML={{ __html: parseJson(selectedRecord[key]) }}
                  ></td>
                </tr>
              ) : key === "image_source" ? (
                <tr key={key}>
                  <td style={{ minWidth: "100px" }} className="py-1 capitalize">
                    <div className="flex flex-start">{key.replace("_", " ")}</div>
                  </td>
                  <td className="font-[500] text-justify">
                    <img
                      src={selectedRecord.image_source}
                      className="rounded object-contain inline cursor-zoom-in"
                      onClick={() => setImgUrl(selectedRecord.image_source)}
                      width={80}
                      heigth="auto"
                      alt=""
                    />
                  </td>
                </tr>
              ) : key === "entite" ? (
                <tr key={key}>
                  <td style={{ minWidth: "100px" }} className="py-1 capitalize">
                    <div className="flex flex-start">{key.replace("_", " ")}</div>
                  </td>
                  <td>
                    {selectedRecord[key]}{" "}
                    <CountryImage
                      countryCode={selectedRecord.entity_counties}
                      showCode={true}
                      size={24}
                    />
                  </td>
                </tr>
              ) : isPdf(selectedRecord[key]) && selectedRecord[key].includes("http") ? (
                <tr key={key}>
                  <td style={{ minWidth: "100px" }} className="py-1 capitalize">
                    <div className="flex flex-start">{key.replace("_", " ")}</div>
                  </td>
                  <td className="font-[500] text-justify">
                    <a
                      href={selectedRecord[key]}
                      className="underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedRecord[key]}
                    </a>
                  </td>
                </tr>
              ) : isPdf(selectedRecord[key]) ? (
                <tr key={key}>
                  <td style={{ minWidth: "100px" }} className="py-1 capitalize">
                    <div className="flex flex-start">{key.replace("_", " ")}</div>
                  </td>
                  <td className="font-[500] text-justify">
                    <a
                      href={`${import.meta.env.VITE_IMG_BASE_URL}/files/${selectedRecord[key]}`}
                      className="underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedRecord[key]}
                    </a>
                  </td>
                </tr>
              ) : (
                <tr key={key}>
                  <td style={{ minWidth: "100px" }} className="py-1 capitalize">
                    <div className="flex flex-start">{key.replace("_", " ")}</div>
                  </td>
                  <td className="font-[500] text-justify">
                    <DisplayValue value={selectedRecord[key]} setImgUrl={setImgUrl} />
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
      <ImgModal url={imgUrl} setUrl={setImgUrl} />
    </>
  );
};

const removeTimeFromDateString = (input) => {
  if (typeof input === "string") {
    // Check if the string matches the date format
    const dateRegex = /^(\d{4}-\d{2}-\d{2}).*/;
    const match = input.match(dateRegex);
    return match ? match[1] : input;
  } else if (typeof input === "object") {
    // Recursively process each property of the object
    for (const prop in input) {
      if (input.hasOwnProperty(prop)) {
        input[prop] = removeTimeFromDateString(input[prop]);
      }
    }
    return input;
  } else {
    return input; // Return unchanged for other types
  }
};

const DisplayValue = ({ value, setImgUrl }) => {
  if (isImgUrl(value)) {
    return (
      <img
        src={value}
        className="rounded object-contain inline cursor-zoom-in"
        onClick={() => setImgUrl(value)}
        width={80}
        heigth="auto"
        alt=""
      />
    );
  } else if (removeTimeFromDateString(value)) {
    return <span dangerouslySetInnerHTML={{ __html: removeTimeFromDateString(value) }}></span>;
  } else if (isImg(value)) {
    return (
      <img
        src={`${import.meta.env.VITE_AML_IMG_BASE_URL}/logos/${value}`}
        className="rounded object-contain inline cursor-zoom-in"
        onClick={() => setImgUrl(`${import.meta.env.VITE_AML_IMG_BASE_URL}/logos/${value}`)}
        width={80}
        heigth="auto"
        alt=""
      />
    );
  } else return <span dangerouslySetInnerHTML={{ __html: value }}></span>;
};

const ShowOthersInformations = ({ selectedRecord }) => {
  return (
    <>
      {selectedRecord?.props?.pageProps?.description && (
        <tr>
          <td>
            <div className="flex flex-start">desciption</div>
          </td>
          <td className="font-[500] text-justify">
            {selectedRecord?.props?.pageProps?.description}
          </td>
        </tr>
      )}

      {selectedRecord?.statuses?.length > 0 && (
        <tr>
          <td>
            <div className="flex flex-start">Status</div>
          </td>
          <td className={`font-bold text-justify `}>
            {selectedRecord &&
              selectedRecord.statuses.map((itm, i) =>
                itm?.translation?.fr === "Actif" ? (
                  <div className="text-green-600">{itm?.translation?.fr}</div>
                ) : (
                  itm?.translation?.fr
                )
              )}
          </td>
        </tr>
      )}

      {selectedRecord?.categories?.length > 0 && (
        <tr>
          <td>
            <div className="flex flex-start">Categories</div>
          </td>
          <td className="font-[500] text-justify ">
            {selectedRecord && selectedRecord.categories.map((itm, i) => itm?.name)}
          </td>
        </tr>
      )}

      {selectedRecord?.country && (
        <tr>
          <td>
            <div className="flex flex-start">Coutry</div>
          </td>
          <td className="font-[500] text-justify ">
            {selectedRecord?.country && (
              <div className="flex items-center gap-4">
                <div className="uppercase">{selectedRecord?.country?.name}</div>

                {selectedRecord?.country?.code?.length > 2 ? (
                  selectedRecord?.country?.code
                    .split("-")
                    .map((itm) => <CountryImage countryCode={itm} showCode={true} size={24} />)
                ) : (
                  <CountryImage
                    countryCode={selectedRecord?.country?.code}
                    showCode={true}
                    size={24}
                  />
                )}
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
};

export default EntityInfoTable;
