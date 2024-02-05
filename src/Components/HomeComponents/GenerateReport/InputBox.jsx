import { usePicod } from "../Home";

const InputBox = ({ reportKey, ...props }) => {
  const { isGeneratingReport, reportInfo, setReportInfo } = usePicod();

  console.log("reportInfo", reportInfo, reportKey);
  return (
    isGeneratingReport && (
      <div className="print:hidden relative right-0">
        <input
          onChange={() =>
            setReportInfo((prev) => ({
              ...prev,
              [reportKey]: !prev[reportKey],
            }))
          }
          defaultChecked={reportInfo[reportKey]}
          type="checkbox"
          className="rounded-checkbox absolute"
          id="check-click"
          style={{
            clipPath: "circle(50% at 50% 50%)",
          }}
          {...props}
        />
      </div>
    )
  );
};
export default InputBox;
