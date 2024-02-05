import { useEffect, useCallback, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import useHttpPrivate from "../../hooks/useHttpPrivate";

export default function Globe() {
  const http = useHttpPrivate();
  const [continentForm, setContinentForm] = useState({
    continent: "",
    icone: "test.png",
  });
  const [paysForm, setPaysForm] = useState({
    libelle: "",
  });
  const [continents, setContinents] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState({});
  const [isContinentFormOpen, setIsContinentFormOpen] = useState(false);
  const [isPaysFormOpen, setIsPaysFormOpen] = useState(false);
  const fetchContinents = useCallback(async () => {
    const { data } = await http.put("/continents");
    setContinents(data);
  }, [http]);
  async function handleContinentSubmit(e) {
    e.preventDefault();
    await http.post("/continents", continentForm);
    await fetchContinents();
  }
  async function handlePaysSubmit(e) {
    e.preventDefault();
    await http.post('/pays', {...paysForm, idcontinent: selectedContinent.id})
  }
  const uploadFile = async (file) => {
    try {
      const fileName = `${file.name}`;
      const avatar = new File([file], fileName, { type: file.type });
      const data = new FormData();
      data.append("avatar", avatar);
      await http.post("/upload", data);
      setContinentForm((prev) => ({ ...prev, icone: fileName }));
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPays = useCallback(async () => {
    console.log("selected", selectedContinent); // TODO: LEFT HERE
    const { data } = await http.put("/pays", { idcontinent: selectedContinent.id });
  }, [selectedContinent]);
  useEffect(() => {
    fetchContinents();
  }, [fetchContinents]);
  useEffect(() => {
    fetchPays();
  }, [selectedContinent]);
  return (
    <section className="bg-white p-5 border h-full grid grid-cols-3 gap-5">
      <div className="pr-5 border-r border-gray-500">
        <div className="flex justify-between items-center">
          <h1>Continents</h1>
          <button
            onClick={() => setIsContinentFormOpen(!isContinentFormOpen)}
            className="bg-blue-500 rounded-md text-white p-1"
          >
            {isContinentFormOpen ? <MinusIcon className="h-6" /> : <PlusIcon className="h-6" />}
          </button>
        </div>
        {isContinentFormOpen && (
          <div>
            <form onSubmit={handleContinentSubmit} className="flex gap-5">
              <div>
                <label htmlFor="continent" className="text-sm font-bold w-full block">
                  Continent
                </label>
                <input
                  value={continentForm.continent}
                  onChange={(e) =>
                    setContinentForm((prev) => ({ ...prev, continent: e.target.value }))
                  }
                  type="text"
                  name="continent"
                  id="continent"
                  className="w-full p-1.5 bg-white rounded-md border"
                />
              </div>
              <div>
                <label htmlFor="icone" className="text-sm font-bold w-full block">
                  Continent
                </label>
                <input
                  onChange={(e) => uploadFile(e.target.files[0])}
                  type="file"
                  name="icone"
                  id="icone"
                  className="w-full p-1.5 bg-white rounded-md border"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 rounded-md px-5 py-0.5 self-end text-white font-bold"
              >
                Add
              </button>
            </form>
          </div>
        )}
        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-300">
                <th className="px-3 py-1 border border-gray-600 text-start">Continent</th>
              </tr>
            </thead>
            <tbody>
              {continents.map((c) => (
                <tr
                  onClick={() => setSelectedContinent(c)}
                  className={
                    selectedContinent.id === c.id
                      ? "bg-blue-300"
                      : "hover:bg-gray-100 cursor-pointer"
                  }
                >
                  <td className="px-3 py-1 border border-gray-600 text-start">
                    <div className="flex items-center gap-2">
                      <img
                        className="h-7 w-7 rounded-full object-cover"
                        src={`${import.meta.env.VITE_IMG_BASE_URL}/uploadFiles/${c.icone}`}
                        alt=""
                      />
                      <div> {c.continent}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pr-5 border-r border-gray-500">
        <div className="flex justify-between items-center">
          <h1>Pays</h1>
          <button
            onClick={() => setIsPaysFormOpen(!isPaysFormOpen)}
            className="bg-blue-500 rounded-md text-white p-1"
          >
            {isPaysFormOpen ? <MinusIcon className="h-6" /> : <PlusIcon className="h-6" />}
          </button>
        </div>
        {isPaysFormOpen && (
          <div>
            <form onSubmit={handlePaysSubmit} className="flex gap-5">
              <div>
                <label htmlFor="libelle" className="text-sm font-bold w-full block">
                  Libelle
                </label>
                <input
                  value={paysForm.libelle}
                  onChange={(e) =>
                    setPaysForm((prev) => ({ ...prev, libelle: e.target.value }))
                  }
                  type="text"
                  name="libelle"
                  id="libelle"
                  className="w-full p-1.5 bg-white rounded-md border"
                />
              </div>
              {/* <div>
                <label htmlFor="icone" className="text-sm font-bold w-full block">
                  Continent
                </label>
                <input
                  onChange={(e) => uploadFile(e.target.files[0])}
                  type="file"
                  name="icone"
                  id="icone"
                  className="w-full p-1.5 bg-white rounded-md border"
                />
              </div> */}
              <button
                type="submit"
                className="bg-blue-500 rounded-md px-5 py-0.5 self-end text-white font-bold"
              >
                Add
              </button>
            </form>
          </div>
        )}
        {/* <div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-300">
                <th className="px-3 py-1 border border-gray-600 text-start">Pays</th>
              </tr>
            </thead>
            <tbody>
              {continents.map((c) => (
                <tr>
                  <td className="px-3 py-1 border border-gray-600 text-start">
                    <div className="flex items-center gap-2">
                      <img
                        className="h-7 w-7 rounded-full object-cover"
                        src={`${import.meta.env.VITE_IMG_BASE_URL}/uploadFiles/${c.icone}`}
                        alt=""
                      />
                      <div> {c.continent}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
      <div className="red"></div>
    </section>
  );
}
