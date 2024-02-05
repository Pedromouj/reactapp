import { useEffect, useState } from "react";
import CompanyHouseHit from "./CompanyHouseHit";
import axios from "axios";
import Modal from "../../../../Tools/Modals";
import CompanyHouse from "./CompanyHouse";
import CardPlaceholder from "../../../../common/AMLCheck/CardPlaceholder";
import { usePicod } from "../../../Home";
import ReportCheckbox from "../../../GenerateReport/ReportCheckbox";
import DetailRaportUk from "./DetailRaportUk";

export const CompanyHouseHits = ({ searchTerm, rangeValue }) => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [ShowDetail, setShowDetail] = useState(false);
  const [companyNumber, setCompanyNumber] = useState();
  const [companyNumberRep, setCompanyNumberRep] = useState([]);
  const { reportInfo, isGeneratingReport } = usePicod();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!searchTerm) {
          return;
        }
        setLoading(true);
        const url = `${import.meta.env.VITE_AML_API_BASE_CORPO_URL}/api/companies/${searchTerm}`;
        const response = await axios.get(url);
        setResults(response.data);
        // await axios.post(`${import.meta.env.VITE_AML_API_BASE_CORPO_URL}/api/alertes`, {
        //   contexte: "search",
        //   libelle: searchTerm,
        //   alerteswords: JSON.stringify({ url, provider: "uk_api" }),
        //   frequencemn: 1,
        // });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchTerm]);

  const OpenDetailPopup = (item) => {
    setCompanyNumber(item.company_number);
    setShowDetail((prev) => !prev);
  };

  const addObjectToObject = (itm) => {
    setCompanyNumberRep([...new Set([...companyNumberRep, itm.company_number])]);
    console.log("companyNumberRep", companyNumberRep);
  };

  return (
    <>
      <div className="col-span-12">
        {loading &&
          Array(8)
            .fill("*")
            .map((e, index) => (
              <div key={index} className="col-span-3">
                <CardPlaceholder />
              </div>
            ))}
        {/* navigate(`/uk/${hit.company_number}`) */}
        {results?.items
          ?.filter((hit) =>
            rangeValue > 50
              ? hit?.title?.toLowerCase()?.trim() === searchTerm?.toLowerCase()?.trim()
              : hit?.title
          )
          .map((hit, i) => (
            <>
              <div
                className={` ${
                  reportInfo[hit.title + hit.company_number] && isGeneratingReport
                    ? "border-2 border-blue-600  print:border-inherit bg-blue-50 print:bg-inherit"
                    : "print:hidden"
                }`}
              >
                {/* {JSON.stringify(companyNumberRep)} */}
                <ReportCheckbox
                  onClick={() => addObjectToObject(hit)}
                  reportKey={hit.title + hit.company_number}
                />
                <div
                  key={hit.company_number}
                  className={` p-2.5 h-24 print:mt-5  print:border-none hover:border-blue-600 cursor-pointer border border-b-gray-300 hover:border hover:rounded `}
                >
                  <CompanyHouseHit hit={hit} OpenDetailPopup={OpenDetailPopup} />
                </div>
                {reportInfo[hit.title + hit.company_number] &&
                  isGeneratingReport &&
                  companyNumberRep
                    ?.filter((item) => item === hit.company_number)
                    ?.map((itm, i) => <DetailRaportUk companyNumber={itm} key={i} />)}
              </div>
            </>
          ))}
      </div>

      <Modal setIsOpen={setShowDetail} isOpen={ShowDetail}>
        <CompanyHouse companyNumber={companyNumber} />
      </Modal>
    </>
  );
};

export default CompanyHouseHits;
