import React, { useCallback, useEffect, useState } from "react";
import useHttpPrivate from "../../hooks/useHttpPrivate";
import SelectedAtomeModal from "../../pages/Atomes/SelectedAtomeModal";

const SearchEntities = ({ atome, searchTerm, atomeDataId }) => {
  const http = useHttpPrivate();
  const [data, setData] = useState([]);
  const [selectedAtome, setSelectedAtome] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const doSearch = useCallback(async () => {
    try {
      setData([]);
      const { data } = await http.put("atomesdatasearch", {
        idatome: atome.id,
        texte: searchTerm,
        idatomedata: atomeDataId,
      });
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }, [http, searchTerm, atome, atomeDataId]);

  const fetchSetSelectedAtome = async (id) => {
    try {
      const { data } = await http.put("/atomes", { id });
      setSelectedAtome(data[0]);
    } catch (error) {
      console.error(error);
    }
  };
  const closeModal = () => {
    setSelectedAtome(null);
  };
  useEffect(() => {
    doSearch();
  }, [doSearch]);

  return (
    <>
      <h5 className="text-red-400">Doublons</h5>
      <table className="w-full text-bold text-left text-gray-500 overflow-hidden rounded">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="py-3 px-6">
              Icon
            </th>
            <th scope="col" className="py-3 px-6">
              Label
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((entity) => (
            <tr key={entity.id} className="bg-red-100">
              <th scope="col" className="py-3 px-6">
                <img
                  src={`${import.meta.env.VITE_IMG_BASE_URL}/uploadFiles/${entity.icone}`}
                  width="30"
                  className="rounded-lg"
                  alt=""
                />
              </th>
              <th scope="col" className="py-3 px-6">
                <button
                  onClick={() => {
                    setIsOpen(true);
                    fetchSetSelectedAtome(entity.id);
                  }}
                >
                  {entity.libelle}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedAtome ? (
        <SelectedAtomeModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          atome={selectedAtome}
          close={closeModal}
        />
      ) : null}
    </>
  );
};

export default SearchEntities;
