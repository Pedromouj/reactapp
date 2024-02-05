import React, { useState } from "react";
import Modal from "../Tools/Modals";
import ReportCheckbox from "../HomeComponents/GenerateReport/ReportCheckbox";
import { usePicod } from "../HomeComponents/Home";

const Test = () => {
  const [Show, setShow] = useState(false);
  const { pdfContent } = usePicod();
  return (
    <div>
      <button onClick={() => setShow((prev) => !prev)}>Show</button>

      <Modal isOpen={Show} setIsOpen={setShow}>
        <ReportCheckbox reportKey={"dddf"} />
        <div ref={pdfContent}>Test</div>
      </Modal>
    </div>
  );
};

export default Test;
