import { useState, lazy } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
// import Wysiwyg from "@/components/common/Wysiwyg";
// import Modal from "@/components/common/Modal";
// import Spinner from "@/components/common/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Tools/Modals";
import Spinner from "../../Spinner/Spinner";
import { usePicod } from "../Home";
import Wysiwyg from "../../Tools/Wysiwyg";

const OverlaySpinner = lazy(() => import("../../Spinner/OverlaySpinner"));

export default function PrinterButton({ keyword }) {
  const {
    pdfContent,
    isGeneratingReport,
    setIsGeneratingReport,
    // , setReportInfo
  } = usePicod();

  const { name } = useParams();
  const [loading, setLoading] = useState(false);
  const [isOpenTextEditor, setIsOpenTextEditor] = useState(false);

  const handlePrint = () => {
    setLoading(true);
    setTimeout(() => {
      printContent();
    }, [200]);
  };

  const showWysiwyg = () => {
    setIsOpenTextEditor(true);
  };

  const handleCancelClick = () => {
    setIsGeneratingReport(false);
    // setReportInfo({});
  };

  const printContent = useReactToPrint({
    content: () => pdfContent.current,
    documentTitle: keyword || "Report",
    onBeforePrint: () => {
      setLoading(true);
    },
    onAfterPrint: () => {
      setLoading(false);
      handleCancelClick();
    },
  });

  return (
    <div className="fixed z-30 right-6 bottom-16">
      {loading && <OverlaySpinner />}
      {isGeneratingReport ? (
        <div className="flex items-center gap-4">
          <button
            onClick={showWysiwyg}
            className="bg-blue-500 px-3 py-1 rounded text-white flex gap-2 print:hidden shadow-lg"
          >
            continue
          </button>
          <button
            className="bg-zinc-500 px-3 py-1 rounded text-white flex gap-2 print:hidden shadow-lg"
            onClick={handleCancelClick}
          >
            cancel
          </button>
        </div>
      ) : (
        <button
          id="printer-button"
          className="bg-blue-500 p-3 rounded-full text-white flex gap-2 print:hidden shadow-lg"
          onClick={() => setIsGeneratingReport(true)}
          title={"print_your_report"}
        >
          <FontAwesomeIcon icon={faPrint} className="w-5 h-5 shadow-lg" />
        </button>
      )}

      <ConclusionForm
        handlePrint={handlePrint}
        isOpen={isOpenTextEditor}
        setIsOpen={setIsOpenTextEditor}
        loading={loading}
      />
    </div>
  );
}

const ConclusionForm = ({ handlePrint, isOpen, setIsOpen, loading }) => {
  const { conclusion, setConclusion } = usePicod();
  const handleSubmit = (e) => {
    e.preventDefault();
    handlePrint();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="conclusion" className="font-semibold capitalize text-lg">
          conclusion
        </label>
        <Wysiwyg defaultValue={conclusion} onChange={(e) => setConclusion(e)} />
        <div className="flex justify-end items-center">
          <button
            disabled={loading}
            className="px-4 py-2 bg-blue-700 rounded text-white disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-10">
                <Spinner />
              </div>
            ) : (
              "confirm"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
