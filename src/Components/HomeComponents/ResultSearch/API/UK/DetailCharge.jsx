import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useHttpPrivate from "../../../../hooks/useHttpPrivate";

function DetailCharge() {
  const http = useHttpPrivate();
  const [Detail, setDetail] = useState();
  const [results, setResults] = useState();
  /* 
detail charge
http://147.135.254.92:9099/api/company/00078950/charges/UZcnYn3RfmS0-OdpP1ccS1VvcCo

history : 
http://147.135.254.92:9099/api/filing-history/00078950

detail history :
http://147.135.254.92:9099/api/company/00078950/filing-history/MzM3NjEyNjYwNmFkaXF6a2N4


*/
  const parameters = useParams();
  const fetchData = async () => {
    await axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/company/${parameters.companyNumber}/charges/${
          parameters.idcharge
        }`
      )
      .then((res) => {
        setDetail(res.data);
      })
      .catch((err) => console.error(err));
  };

  const fetchCompany = async () => {
    try {
      const response = await http.get(`/company/${parameters.companyNumber}`);
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCompany();
  }, []);
  return (
    <div className="flex flex-col ">
      <div>
        <h2 className="text-center mt-10 mb-10">
          {results && results.company_name + " - " + results?.company_number}
        </h2>
      </div>
      <div className=" w-5/6 m-auto p-6 bg-white border border-gray-200 rounded-lg shadow">
        {Detail && (
          <>
            <div className="text-xl font-semibold">
              {" "}
              {Detail.charge_code ? (
                <p className="font-semibold">
                  Charge code : <span className="font-bold">{Detail.charge_code}</span>{" "}
                </p>
              ) : (
                Detail.classification.description
              )}
            </div>

            <div>
              <div className="grid grid-cols-3 mt-5 gap-3">
                <div className="col-span-1">
                  <div className="text-lg font-semibold">Created</div>
                  <h5>{Detail.created_on}</h5>
                </div>
                <div className="col-span-1">
                  <div className="text-lg font-semibold"> Delivered</div>
                  <h5>{Detail.delivered_on}</h5>
                </div>
                <div className="col-span-1">
                  <div className="text-lg font-semibold">Status</div>
                  <h5>{Detail.status}</h5>
                </div>
              </div>
            </div>

            <div className="block mt-5">
              <h5>Persons entitled</h5>
              <div className="text-lg">{Detail.persons_entitled.map((per) => per.name)}</div>
            </div>
            <div className="block mt-5">
              <h5>Short particulars</h5>
              <div className=" text-ellipsis overflow-hidden whitespace-normal">
                {Detail.particulars.description}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailCharge;
