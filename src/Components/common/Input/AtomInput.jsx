import { useState } from "react";
import AutoCompleteSelect from "../AutoCompleteSelect";

const AtomInput = ({ atomeData }) => {
  // const [note, setNote] = useState(0);
  const [dataValue, setDataValue] = useState("");
  const [dataValueId, setDataValueId] = useState("");

  const handleOnChange = (val) => {
    const atom = JSON.parse(val?.value);
    setDataValue(atom?.libelle);
    setDataValueId(atom?.id);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="atom" style={{ textTransform: "capitalize" }}>
        {atomeData.libelle}
      </label>
      <AutoCompleteSelect
        onChange={handleOnChange}
        url="/atomes"
        idatomemodele={atomeData.masque}
      />
      <input type="hidden" name="datavaleur" value={dataValue} />
      <input type="hidden" name="idatomevaleur" value={dataValueId} />
    </div>
  );
};

export default AtomInput;
