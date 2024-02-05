import React, { useEffect, useState } from "react";
import ResultSearch from "./ResultSearch";
import axios from "axios";

function DueNew({
  keyword,
  setData,
  categorie,
  loading,
  setCountGlobal,
  Count,
  CountGlobal,
  Data,
  setCount,
}) {
  return (
    <ResultSearch
      setData={setData}
      Data={Data}
      loading={loading}
      keyword={keyword}
      Count={Count}
      setCount={setCount}
      CountGlobal={CountGlobal}
      setCountGlobal={setCountGlobal}
    />
  );
}

export default DueNew;
