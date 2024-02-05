import { useState } from "react";
import Modal from "../../components/common/Modal";
import useHttpPrivate from "../../hooks/useHttpPrivate";
import useToast from "../../hooks/useToast";

const InstanciateAtomFromModelId = ({
  atomeModelId,
  setRightSelectedAtome = () => {},
  linkRightSelectedAtomeToAtomeData = () => {},
}) => {
  const http = useHttpPrivate();
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState("");
  const toast = useToast();

  const fetchAtomModel = async () => {
    try {
      const { data } = await http.put("atomemodeles", { id: atomeModelId });
      return data[0];
    } catch (error) {
      console.error(error);
    }
  };

  const instanciateAtome = async (e) => {
    try {
      e.preventDefault();
      const selectedAtomeModel = await fetchAtomModel();
      let atomeModel = { ...selectedAtomeModel };
      atomeModel.idatomemodele = atomeModel.id;
      atomeModel.idtype2 = atomeModel.id;
      atomeModel.type2 = atomeModel.libelle;
      delete atomeModel.id;
      const respData = await http.post("atomes", { ...atomeModel, libelle: label });
      const newAtome = await findAtomeByCode(respData.data?.msg);
      await createAtomeDataFromAtomeModel(newAtome.id);
      toast("success", "Success");
      setIsOpen(false);
      setLabel("");
      setRightSelectedAtome(newAtome);
      linkRightSelectedAtomeToAtomeData(newAtome);
    } catch (error) {
      console.error(error);
    }
  };

  const findAtomeByCode = async (id) => {
    try {
      const { data } = await http.put("atomes", { id });
      return data[0];
    } catch (error) {
      console.error(error);
    }
  };

  const createAtomeDataFromAtomeModel = async (idatome) => {
    try {
      await http.post("atomesdata", {
        id: idatome,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="font-mono font-bold w-full h-full"
        title="Instanciate entity"
      >
        I
      </button>
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <form onSubmit={instanciateAtome} className="w-full">
            <div>
              <label htmlFor="libelle" className="text-sm font-bold w-full block">
                Label
              </label>
              <input
                type="text"
                name="libelle"
                id="libelle"
                placeholder="Label"
                className="p-1.5 bg-white rounded-md border w-full"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end mt-2">
              <button type="submit" className="p-2 bg-green-700 rounded-lg text-white">
                Instanciate
              </button>
            </div>
          </form>
        </Modal>
      )}
      {/* {atomes.length === 1 ? (
        <button
          onClick={() => {
            setAtomePayload({});
            setSelectedAtome(null);
          }}
          type="button"
          className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 mr-2"
        >
          Reset
        </button>
      ) : null} */}
    </>
  );
};

export default InstanciateAtomFromModelId;
