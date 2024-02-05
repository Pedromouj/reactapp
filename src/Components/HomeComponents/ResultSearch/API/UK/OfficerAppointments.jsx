import { LinkIcon } from "@heroicons/react/20/solid";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardPlaceholder from "../../../../common/AMLCheck/CardPlaceholder";
import useHttpPrivate from "../../../../hooks/useHttpPrivate";

const OfficerAppointments = () => {
  const { officerId } = useParams();
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const http = useHttpPrivate();

  const fetchData = useCallback(async () => {
    try {
      const response = await http.get(`/officers/${officerId}/appointments`);
      setResults(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [http, officerId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, http]);

  if (loading) return <CardPlaceholder />;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="border border-gray-300 rounded-lg p-3 shadow bg-white w-5/6 m-auto mt-16">
        <div className="grid grid-cols-12">
          <h2 className="flex items-start gap-3 col-span-12 mb-6">
            <img src="/img/fallback_avatar.png" width={45} alt="" className="rounded-full" />
            {results.name}
          </h2>
          <p className="col-span-12 mb-5">
            Total number of appointments <span className="font-bold">{results.items?.length}</span>
          </p>
          {results.date_of_birth && (
            <div className="col-span-12 w-full border-b-[1px] mb-3 border-gray-200">
              <div className="text-lg">Date of birth</div>
              <div className=" mb-3 font-bold">
                {" "}
                {new Date(2000, results.date_of_birth?.month).toLocaleString("en-US", {
                  month: "long",
                })}{" "}
                {results.date_of_birth?.year}
              </div>
            </div>
          )}
          {results.items?.map((company, index) => (
            <div
              key={index + company.appointed_to?.company_number}
              className="col-span-12 border-b-[1px]  border-gray-200 p-3"
            >
              <div className="font-bold mb-2 text-lg gap-2">
                <Link
                  to={`/uk/${company.appointed_to.company_number}`}
                  className="flex items-center gap-2"
                >
                  {company.appointed_to?.company_name} <LinkIcon className="w-5 h-5" />
                </Link>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-4">
                  Company status :{" "}
                  <span className="font-bold">{company.appointed_to?.company_status}</span>
                </div>
                <div className="col-span-4">
                  Correspondence address :{" "}
                  <span className="font-bold">
                    {company.address?.address_line_1},{company.address?.address_line_2},
                    {company.address?.locality},{company.address?.region},
                    {company.address?.postal_code}
                  </span>
                </div>
                <div className="col-span-4">
                  Role{" "}
                  <span className="bg-green-700 text-white text-xs font-medium mr-2 px-1 py-0.5 rounded">
                    Active
                  </span>{" "}
                  : <span className="font-bold">{company.officer_role}</span>
                </div>
                {company.appointed_on ? (
                  <div className="col-span-4">
                    Appointed on : <span className="font-bold">{company.appointed_on}</span>
                  </div>
                ) : null}
                {company.appointed_before ? (
                  <div className="col-span-4">
                    Appointed before : <span className="font-bold">{company.appointed_before}</span>
                  </div>
                ) : null}
                {company.nationality ? (
                  <div className="col-span-4">
                    Nationality : <span className="font-bold">{company.nationality}</span>
                  </div>
                ) : null}
                {company.country_of_residence ? (
                  <div className="col-span-4">
                    Country of residence :{" "}
                    <span className="font-bold">{company.country_of_residence}</span>
                  </div>
                ) : null}
                {company.occupation ? (
                  <div className="col-span-4">
                    Occupation : <span className="font-bold">{company.occupation}</span>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficerAppointments;
