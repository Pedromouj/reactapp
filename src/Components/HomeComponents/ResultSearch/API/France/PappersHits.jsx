import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPlaceholder from "@/components/common/AMLCheck/CardPlaceholder";
import PappersHit from "./PappersHit";

export const PappersHits = ({ searchTerm }) => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fetchResults = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      // const { data } = await axios.get("/pappers.json");
      const { data } = await axios.get(
        `https://api.pappers.fr/v2/recherche?q=${searchTerm}&api_token=e12ce6995f924f0f37ddf4178d341c503a7e1368666e8ee9&page=1&par_page=20`
      );
      setResults(data);
    } catch (error) {
      setErrorMessage(error.response.data.error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {loading &&
          Array(8)
            .fill("*")
            .map((e, index) => (
              <div key={index} className="col-span-3">
                <CardPlaceholder />
              </div>
            ))}
        {results?.resultats?.length > 0
          ? results.resultats.map((hit) => (
              <div
                key={hit.siren}
                className="p-2.5 hover:border-blue-600 cursor-pointer border border-b-gray-300 hover:border hover:rounded"
                onClick={() => navigate(`/france/company/${hit.siren}`)}
              >
                <PappersHit hit={hit} />
              </div>
            ))
          : !loading && (
              <div className="col-span-12 rounded-lg border p-3 text-center bg-gray-200">
                There are no results at this moment!
              </div>
            )}
        {errorMessage && (
          <div className="col-span-12 rounded-lg border p-3 text-center bg-gray-200">
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default PappersHits;
