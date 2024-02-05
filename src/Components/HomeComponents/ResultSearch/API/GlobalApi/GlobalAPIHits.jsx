import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import CardPlaceholder from "@/components/common/AMLCheck/CardPlaceholder";
import { aml } from "@/http";
import GlobalAPIHit from "./GlobalAPIHit";
import useHttpPrivate from "@/hooks/useHttpPrivate";

export const GlobalAPIHits = ({ searchTerm }) => {
  const http = useHttpPrivate();
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await aml.post("/ca/searches", { search_term: searchTerm });
        setResults(data);
        // http.post("alertes", {
        //   contexte: "search",
        //   libelle: searchTerm,
        //   alerteswords: JSON.stringify({ url: "/ca/searches", provider: "comply_adv" }),
        //   frequencemn: 1,
        // });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchTerm, http]);

  return (
    <div className="grid grid-cols-1 gap-4">
      {loading &&
        Array(8)
          .fill("*")
          .map((e, index) => (
            <div key={index} className="col-span-3">
              <CardPlaceholder />
            </div>
          ))}
      {!loading &&
        (results.content?.data.hits.length > 0 ? (
          results.content?.data.hits.map((hit) => (
            <div
              key={hit.company_number}
              className="p-2.5 hover:border-blue-600 border-b cursor-pointer"
              // onClick={() => navigate(`/global/${results.content.data.ref}/entity/${hit.doc.id}`)}
            >
              <GlobalAPIHit hit={hit} />
            </div>
          ))
        ) : (
          <div className="col-span-12 bg-gray-300 text-gray-800 text-center w-full rounded border p-2 text-md">
            There are no results at this moment!
          </div>
        ))}
    </div>
  );
};

export default GlobalAPIHits;
