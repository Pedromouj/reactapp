import React, { useState } from "react";
import ResultsCards from "./ResultsCards";
import Spinner from "../../../Spinner/Spinner";

function ResultSearch({
  Data,
  loading,
  keyword,
  setData,
  Count,
  setCount,
  CountGlobal,
  setCountGlobal,
}) {
  const [subCat, setSubCat] = useState("");
  const [currentpage, setCurrentPge] = useState(1);

  return (
    <>
      {Data?.map((itm, index) => (
        <ResultsCards
          Categorie={itm?.categorie}
          keyword={keyword}
          setCurrentPge={setCurrentPge}
          currentpage={currentpage}
          Data={itm?.Data?.googleRes?.organic}
          setData={setData}
          loading={loading}
          Count={Count}
          index={index}
          setCount={setCount}
          setSubCat={setSubCat}
          subCat={subCat}
          CountGlobal={CountGlobal}
          setCountGlobal={setCountGlobal}
        />
      ))}
      {loading && <Spinner />}
    </>
  );
}

export default ResultSearch;
