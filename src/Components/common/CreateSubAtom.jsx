import { useState } from "react";
import useHttpPrivate from "../../hooks/useHttpPrivate";
import useToast from "../../hooks/useToast";
import { mysqlDateTimeFormat } from "../../util/date";

const CreateSubAtom = ({ atom, onComplete }) => {
  const http = useHttpPrivate();
  const toast = useToast();
  const [label, setLabel] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subAtome = {
      ...atom,
      atomemere: atom.libelle,
      idatomemere: atom.id,
      dupdate: mysqlDateTimeFormat(atom.dupdate),
      dadd: mysqlDateTimeFormat(atom.dadd),
      niveau: atom.niveau + "-",
      idatomeroot: atom.idatomeroot === "0" ? atom.id : atom.idatomeroot,
      libelle: label,
    };
    await createSubEntity(subAtome);
    typeof onComplete === "function" && onComplete();
  };

  const createSubEntity = async (subAtome) => {
    try {
      await http.post("/atomes", subAtome);
      toast("success", "Created successfully!");
    } catch (error) {
      console.error(error);
      toast("error", "Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full items-start">
      <div className="flex flex-col">
        <label htmlFor="libelle">Label</label>
        <input
          type="text"
          name="libelle"
          id="libelle"
          onChange={(e) => {
            setLabel(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
          placeholder="Label"
          required
        />
      </div>
      <div className="mt-4 text-end">
        <button
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-2 ml-2 disabled:bg-gray-400"
          disabled={!label}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateSubAtom;
