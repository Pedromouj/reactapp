import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Charges from "./Charges";
import FilingHistory from "./FilingHistory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import useHttpPrivate from "../../../../hooks/useHttpPrivate";
import CardPlaceholder from "../../../../common/AMLCheck/CardPlaceholder";
import axios from "axios";
function DetailRaportUk({ companyNumber }) {
  // const { companyNumber } = useParams();
  const [results, setResults] = useState({});
  const [officersResult, setOfficersResult] = useState({});
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState();
  const [Charge, setCharge] = useState(false);
  const [People, setPeople] = useState(false);
  const [Company, setCompany] = useState(true);
  const [history, setHistory] = useState(false);

  const http = useHttpPrivate();
  const date = new Date();
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_AML_API_BASE_CORPO_URL}/api/company/${companyNumber}`
      );
      setResults(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [companyNumber, http]);
  const fetchOfficers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_AML_API_BASE_CORPO_URL}/api/officers/${companyNumber}/`
      );
      setOfficersResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [companyNumber, http]);
  useEffect(() => {
    fetchData();
    fetchOfficers();
  }, [fetchData, fetchOfficers]);
  if (loading) return <CardPlaceholder />;

  return (
    <div className="w-full print:!mt-0">
      <div>
        <h2 className=" text-center mt-10 print:!mt-0">
          {results.company_name} - {results?.company_number}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-lg font-bold  text-center mb-3">Company house</div>
        <div className="border w-full m-auto border-gray-300 print:border-white print:shadow-none rounded-lg p-8 shadow bg-white">
          <div className="grid grid-cols-12 gap-3">
            {/* <div className="col-span-3">Company Name</div>
          <div className="col-span-9 font-bold">{results.company_name}</div> */}
            <div className="col-span-12 ">
              <div className="col-span-12 text-xl">Registered office address</div>

              <div className="col-span-12 font-bold text-lg">
                {results.registered_office_address?.address_line_1}{" "}
                {results.registered_office_address?.locality}{" "}
                {results.registered_office_address?.region}{" "}
                {results.registered_office_address?.country}
              </div>
            </div>
            <div className="col-span-12">
              <div className="col-span-12 text-xl">Company Status</div>
              <div
                className={`col-span-12 text-lg text-white p-1  mt-2 w-fit rounded font-medium ${
                  results?.company_status === "active" || results?.company_status === "open"
                    ? " bg-green-700 "
                    : results?.company_status === "dissolved"
                    ? " bg-orange-500  "
                    : " bg-red-500"
                }`}
              >
                {results?.company_status}
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <div className="col-span-6 text-xl">Company type</div>
              <div className="col-span-6 text-xl">Incorporated on</div>
              <div className="col-span-6 font-bold text-lg">{results.type}</div>

              <div className="col-span-6 font-bold text-lg">{results.date_of_creation}</div>
            </div>

            <div className="col-span-12 grid grid-cols-12">
              <div className="col-span-6 mt-4 text-xl">
                Accounts
                <div className="text-lg">
                  <p className=" font-normal">
                    Next accounts made up to{" "}
                    <span className="font-bold">
                      {results.accounts?.next_accounts?.period_end_on}
                    </span>{" "}
                    due by{" "}
                    <span className="font-bold">{results.accounts?.next_accounts?.due_on}</span>
                  </p>
                  <p className="font-normal">
                    Last accounts made up to{" "}
                    <span className="font-bold">{results.accounts?.last_accounts.made_up_to}</span>
                  </p>
                </div>
              </div>
              <div className="col-span-6 mt-4 text-xl">
                Confirmation statement
                <div className="text-lg">
                  <p className=" font-normal">
                    Next statement date{" "}
                    <span className="font-bold">
                      {results.confirmation_statement?.next_made_up_to}
                    </span>{" "}
                    due by{" "}
                    <span className="font-bold">{results.confirmation_statement?.next_due}</span>
                  </p>
                  <p className="font-normal">
                    Last statement dated{" "}
                    <span className="font-bold">
                      {results.confirmation_statement?.last_made_up_to}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {officersResult.items?.length ? (
          <div className="border  border-gray-300 w-full m-auto rounded-lg p-3 shadow bg-white space-y-8">
            <h3 className="flex items-start gap-3 col-span-12 mb-6">Officers</h3>
            <div className="font-bold text-lg">
              {officersResult.total_results} officers / {officersResult.resigned_count} resignations
            </div>
            {officersResult.items?.map((officer, index) => (
              <div key={index + officer.name}>
                <div className="grid grid-cols-12 ">
                  <div className="flex items-center gap-2 col-span-12 font-bold mb-2 text-lg">
                    <img
                      src="/img/fallback_avatar.png"
                      width={50}
                      alt=""
                      className="rounded-full"
                    />
                    <Link
                      to={officer.links.officer.appointments}
                      className="flex items-center gap-2"
                    >
                      {officer.name} <FontAwesomeIcon icon={faLink} className="w-5 h-5" />
                    </Link>
                  </div>
                  <div className="col-span-4 ">Correspondence address</div>
                  <div className="col-span-8 ml-3 font-bold mb-5">
                    {officer.address?.address_line_1},{officer.address?.address_line_2},
                    {officer.address?.locality},{officer.address?.region},
                    {officer.address?.postal_code}
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-6 grid grid-cols-12">
                    <div className="col-span-4">
                      Role{" "}
                      {officer.resigned_on ? (
                        <span className="bg-gray-700 text-white text-xs font-medium mr-2 px-1 py-0.5 rounded">
                          RESIGNED
                        </span>
                      ) : (
                        <span className="bg-green-700 text-white text-xs font-medium mr-2 px-1 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="col-span-8 font-bold">{officer.officer_role}</div>
                    {officer.date_of_birth ? (
                      <>
                        <div className="col-span-4">Date of birth</div>
                        <div className="col-span-8 font-bold">
                          {new Date(2000, officer.date_of_birth?.month).toLocaleString("en-US", {
                            month: "long",
                          })}{" "}
                          {officer.date_of_birth?.year}
                        </div>
                      </>
                    ) : null}
                    {officer.resigned_on ? (
                      <>
                        <div className="col-span-4">Resigned on :</div>
                        <div className="col-span-8 font-bold">{officer.resigned_on}</div>
                      </>
                    ) : null}
                    {officer.appointed_on ? (
                      <>
                        <div className="col-span-5">Appointed on </div>
                        <div className="col-span-7 font-bold">{officer.appointed_on}</div>
                      </>
                    ) : null}
                  </div>
                  <div className="col-span-6 grid grid-cols-12">
                    {officer.nationality ? (
                      <>
                        <div className="col-span-4">Nationality :</div>
                        <div className="col-span-8 font-bold">{officer.nationality}</div>
                      </>
                    ) : null}
                    {officer.country_of_residence ? (
                      <>
                        <div className="col-span-4">Residence :</div>
                        <div className="col-span-8 font-bold">{officer.country_of_residence}</div>
                      </>
                    ) : null}
                    {officer.occupation ? (
                      <>
                        <div className="col-span-4">Occupation :</div>
                        <div className="col-span-8 font-bold">{officer.occupation}</div>
                      </>
                    ) : null}{" "}
                  </div>
                </div>
                <hr className="h-px my-8 bg-gray-300 border-0"></hr>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="text-lg font-bold  text-center mb-3">Charge</div>
      <Charges id={companyNumber} />
      <div className="text-lg font-bold  text-center mb-3">History</div>
      <FilingHistory companyNumber={companyNumber} />
    </div>
  );
}

export default DetailRaportUk;
