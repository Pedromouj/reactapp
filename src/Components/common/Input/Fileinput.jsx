import React, { useState } from "react";
import useHttpPrivate from "../../../hooks/useHttpPrivate";

const Fileinput = (props) => {
  const http = useHttpPrivate();

  const [fileName, setFileName] = useState(null);

  const uploadFile = async (file) => {
    try {
      const fileName = file.name;
      const avatar = new File([file], fileName, { type: file.type });
      const data = new FormData();
      data.append("avatar", avatar);
      await http.post("/upload", data);
      setFileName(fileName);
    } catch (error) {
      console.error(error);
    }
  };

  const { atomeData, name, id, error, label, ...rest } = props;
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...rest}
        type="file"
        accept={atomeData.masque}
        onChange={(e) => uploadFile(e.target.files[0])}
      />
      {fileName && <input type="hidden" name={props.name} value={fileName} />}
      {error && <p>{error}</p>}
    </>
  );
};

export default Fileinput;
