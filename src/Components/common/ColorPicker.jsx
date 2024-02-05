import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import useHttpPrivate from "../../hooks/useHttpPrivate";
import OverlaySpinner from "./OverlaySpinner";

const ColorPicker = ({ model, ...props }) => {
  const http = useHttpPrivate();
  const [colors, setColors] = useState([]);
  const [modelObj, setModelObj] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchColors = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await http.put("partypes", { contexte: "codecouleur" });
      setColors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [http]);

  useEffect(() => {
    setModelObj(model);
    fetchColors();
  }, [fetchColors, model]);
  return (
    <>
      {loading && <OverlaySpinner />}
      <label htmlFor="couleur" className="block mb-5 text-sm font-medium text-gray-900 ">
        Color {props.required && <span className="text-red-900">*</span>}
      </label>
      <ul className="flex w-full gap-6">
        {colors.map((color) => (
          <li key={color.libelle}>
            <input
              type="radio"
              id={color.libelle}
              name="couleur"
              value={`${color.libelle},${color.id}`}
              className="hidden peer"
              defaultChecked={modelObj?.idcouleur === color.id}
            />
            <label
              htmlFor={color.libelle}
              className="inline-flex items-center justify-between w-full p-5 text-gray-500 outline outline-1 outline-gray-900 border-4 border-white peer-checked:outline peer-checked:outline-4 peer-checked:outline-blue-800 rounded-full cursor-pointer peer-checked:shadow-xl peer-checked:-translate-y-2 hover:bg-gray-100"
              style={{ backgroundColor: color.libelle }}
            ></label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ColorPicker;
