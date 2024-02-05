import { useCallback } from "react";
import { useEffect, useState } from "react";
import OverlaySpinner from "../OverlaySpinner";
import AMLRowCard from "./AMLRowCard";
import SelectedRowModal from "./SelectedRowModal";

const AMLCheck = ({ type, atome, atomeAttributes }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const search = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_AML_API_BASE_URL}/${type}/find?name=${atome.libelle}`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [type, atome]);

  useEffect(() => {
    search();
  }, [search]);

  if (loading) return <OverlaySpinner />;

  return (
    <div className="grid grid-cols-12 mt-5 gap-5 overflow-auto p-2">
      {data.map((e) => (
        <div
          key={e._id}
          className="col-span-6 border border-gray-100 rounded-lg shadow p-3 cursor-pointer hover:border-blue-600"
          onClick={() => setSelectedRecord(e)}
        >
          <AMLRowCard className="cols-span-6" entity={e} />
        </div>
      ))}
      {!data.length && (
        <div className="col-span-12 p-2 border border-gray-400 rounded-lg bg-gray-300 text-center">
          There are no results at this moments!
        </div>
      )}
      {selectedRecord && (
        <SelectedRowModal
          atome={atome}
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
          atomeAttributes={atomeAttributes}
        />
      )}
    </div>
  );
};

export default AMLCheck;
