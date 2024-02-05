import { useState } from "react";
import EntityImage from "./EntityImage";
import OverlaySpinner from "../OverlaySpinner";
import useHttpPrivate from "../../../hooks/useHttpPrivate";
import useToast from "../../../hooks/useToast";

const SelectedRowModal = ({ selectedRecord, setSelectedRecord, atome, atomeAttributes }) => {
  const http = useHttpPrivate();
  const toast = useToast();
  const skipedFields = [
    "affectations",
    "relationships_in",
    "relationships_out",
    "datatype",
    "category_id",
    "data_list_id",
    "image",
    "authority_logo",
    "logo_authority",
    "pep",
  ];
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }
    const payload = JSON.parse(data.attribut);
    addAttribute(payload);
  };

  const addAttribute = async (payload) => {
    try {
      setLoading(true);
      await http.post("/atomeattributs", payload);
      toast("success", "Attribute added successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const alphabeticCharToOrderNumber = (alpha) => {
    const id = alpha.slice(1);
    return alpha.charAt(0) === "p" ? `16${id}` : `5${id}`;
  };

  if (loading) return <OverlaySpinner />;

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="h-full max-h-screen w-full min-w-[800px] bg-black/60 fixed top-0 left-0 right-0 z-50 p-4 overflow-hidden md:inset-0 justify-center items-center flex from-opacity-0 to-opacity-1 transform transition duration-500"
    >
      <div className="bg-white min-w-[50rem] relative max-w-6xl rounded-lg border border-gray-400 max-h-full">
        <button
          onClick={() => {
            setSelectedRecord(null);
          }}
          type="button"
          className="absolute -top-1 -right-1 text-gray-400 bg-transparent p-1.5 ml-auto inline-flex items-center"
          data-modal-toggle="popup-modal"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="rounded-lg shadow max-h-full overflow-auto">
          <div className="p-4 max-h-[85vh] overflow-auto">
            <div className="flex justify-between items-start">
              <div className="py-2 w-52 text-black flex-grow">
                <span className="text-xl">{selectedRecord._source.name}</span>
              </div>
              <div className="w-16 h-6 text-end">
                <EntityImage entity={selectedRecord} width={150} heigth="auto" />
              </div>
            </div>
            <table className="aml-table w-full text-bold text-left text-gray-500 mb-[80px]">
              <tbody className="text-xs capitalize font-bold">
                {Object.keys(selectedRecord._source).map(
                  (key) =>
                    skipedFields.indexOf(key) === -1 && (
                      <tr key={key}>
                        <td style={{ minWidth: "100px" }}>{key.replaceAll("_", " ")}</td>
                        <td dangerouslySetInnerHTML={{ __html: selectedRecord._source[key] }}></td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-5 absolute bottom-0 left-0 w-full bg-gray-200 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <select
              name="attribut"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-5/6 p-2.5"
            >
              {atomeAttributes.map((attr) => (
                <option
                  key={attr.id}
                  value={JSON.stringify({
                    idatomeattribut: attr.id,
                    atomeattribut: attr.libelle,
                    idautorite: alphabeticCharToOrderNumber(selectedRecord._id),
                    autorite: selectedRecord._source.name,
                    atome: atome.libelle,
                    idatome: atome.id,
                  })}
                >
                  {attr.libelle}
                </option>
              ))}
            </select>
            <button className="bg-blue-600 border border-blue-700 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-1/6 p-2.5">
              Add attribute
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectedRowModal;
