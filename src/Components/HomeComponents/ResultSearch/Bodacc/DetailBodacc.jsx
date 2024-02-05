import axios from "axios";
import React, { useEffect, useState } from "react";
import franceLoc from "/img/france.png";
import OverlaySpinner from "../../../Spinner/OverlaySpinner";
import Spinner from "../../../Spinner/Spinner";

function DetailBodacc({ companyNumber }) {
  const [BodaccDetails, setBodaccdetails] = useState([]);
  const handleShowDetails = async () => {
    const url = `https://bodacc-datadila.opendatasoft.com/api/records/1.0/search/?disjunctive.typeavis=true&disjunctive.familleavis=true&disjunctive.publicationavis=true&disjunctive.region_min=true&disjunctive.nom_dep_min=true&disjunctive.numerodepartement=true&sort=dateparution&rows=10&dataset=annonces-commerciales&q=registre:${companyNumber}&timezone=Africa%2FLagos&lang=fr`;
    const { data } = await axios.get(url);

    // await axios.post(`${import.meta.env.VITE_AML_API_BASE_CORPO_URL}/api/alertes`, {
    //   contexte: "search",
    //   libelle: companyNumber,
    //   alerteswords: JSON.stringify({ url, provider: "bodacc" }),
    //   frequencemn: 1,
    // });
    setBodaccdetails(data?.records);
    console.log(data?.records);
  };

  const ParseToObject = (str) => {
    const arr = [];
    for (const [key, value] of Object.entries(JSON.parse(str).personne)) {
      const cleanedFieldName = key.replace(/[^\w\s]/g, "").replace(/_/g, " ");

      const capitalizedFieldName =
        cleanedFieldName.charAt(0).toUpperCase() + cleanedFieldName.slice(1);

      arr.push({ key: `${capitalizedFieldName}`, value: `${value}` });
    }

    return arr;
  };

  useEffect(() => {
    handleShowDetails();
  }, []);

  return BodaccDetails.length > 0 ? (
    <ul className="w-full  text-lg font-medium mt-5 items-center text-gray-900 bg-white border border-gray-200 rounded-lg  print:!max-h-full print:!overflow-hidden  shadow-lg  print:!w-full">
      {BodaccDetails?.map((itm, i) => (
        <div key={i}>
          <li className="bg-blue-100 text-blue-800 text-lg w-full text-center font-medium border-b border-gray-200 rounded-t-lg ">
            {itm.fields.commercant}
          </li>
          <li className="flex w-full items-center px-4 py-2 border-b border-gray-200 rounded-t-lg ">
            <div className="w-60 font-bold text-gray-700">Famille avis: </div>
            <div className="w-full">{itm.fields.familleavis_lib}</div>
          </li>
          <li className="flex w-full items-center px-4 py-2 border-b border-gray-200 rounded-t-lg ">
            <div className="w-60 font-bold text-gray-700">Parution: </div>
            <div className="w-full">{itm.fields.parution}</div>
          </li>

          <li className="flex w-full gap-3 items-center px-4 py-2 border-b border-gray-200 rounded-t-lg ">
            <div className="w-60 font-bold text-gray-700">Region de nom officiel: </div>
            <div className="w-full">{itm.fields.region_nom_officiel}</div>
          </li>
          <li className="flex w-full items-center px-4 py-2 border-b border-gray-200 rounded-t-lg ">
            <div className="w-60 font-bold text-gray-700">Tribunal: </div>
            <div className="w-full">{itm.fields.tribunal}</div>
          </li>
          <li className="flex w-full items-center px-4 py-2 border-b border-gray-200 rounded-t-lg ">
            <div className="w-60 font-bold text-gray-700">Type: </div>
            <div className="w-full">{itm.fields.typeavis_lib}</div>
          </li>
          {itm.fields.ville && (
            <li className="flex w-full items-center px-4 py-2 border-b border-gray-200 rounded-t-lg ">
              <img src={franceLoc} width={23} className="mr-2 mb-1" />
              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-700">
                {itm.fields.ville}
              </span>
            </li>
          )}
          {itm?.fields?.modificationsgenerales?.length > 0 && (
            <li className="flex w-full px-4 py-2 border-b border-gray-200 rounded-t-lg font-medium ">
              <div className="w-60 font-bold text-gray-700">Descriptif: </div>
              <div className="w-full">
                {JSON.parse(itm?.fields?.modificationsgenerales).descriptif}
              </div>
            </li>
          )}
          <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg font-medium  ">
            {itm.fields.dateparution}
          </li>
          <li className="flex w-full items-center px-4 py-2 border-b border-gray-200 rounded-t-lg ">
            <a
              href={`https://www.bodacc.fr/annonce/detail-annonce/${itm.fields.publicationavis}/${
                itm?.fields?.parution
              }/${itm?.fields?.id?.slice(-4)}`}
              className="text-blue-600 underline m-auto hover:opacity-60 transition-all duration-100"
              target="_blank"
            >
              Voir l'annonce
            </a>
          </li>
          <li className="flex gap-3   mr-3 justify-end">
            <img width={25} src="https://flagsapi.com/FR/flat/64.png" />
          </li>

          {ParseToObject(itm.fields.listepersonnes).length > 0 && (
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg ">
              <ul className="mb-5 space-y-1 text-gray-500 list-disc list-inside">
                {ParseToObject(itm.fields.listepersonnes).map(
                  (itm) =>
                    itm.value !== "[object Object]" && (
                      <li className="flex gap-4 w-full">
                        <div className="w-52 font-bold text-gray-700">{itm.key}:</div>
                        <div className="w-full">{itm.value}</div>
                      </li>
                    )
                )}
              </ul>
            </li>
          )}
        </div>
      ))}

      {BodaccDetails.length > 0 && (
        <div className="flex gap-3   mr-3 justify-center   text-white ">
          <a
            href={`/france/company/${companyNumber}`}
            target="_blank"
            rel="alternate"
            className="bg-[#0f2d6b] p-2 w-52 text-center rounded  hover:opacity-50 transition-all duration-100 cursor-pointer mb-4 mt-8"
          >
            voir plus
          </a>
        </div>
      )}
    </ul>
  ) : (
    <Data_Not_Found />
  );
}

const Data_Not_Found = () => {
  const [Show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 3000);
  }, []);
  if (Show) {
    return (
      <div className="w-full text-2xl font-medium mt-5 items-center text-gray-900 bg-white border border-gray-200 rounded-lg  shadow-lg text-center p-5">
        Data not found
      </div>
    );
  } else {
    return <Spinner classes={"mx-auto w-full flex justify-center mb-5"} />;
  }
};
export default DetailBodacc;
