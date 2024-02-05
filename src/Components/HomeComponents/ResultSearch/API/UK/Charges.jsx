import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
function Charges({ id }) {
  const [charges, setCharges] = useState();

  const fetchData = async () => {
    await axios
      .get(`${import.meta.env.VITE_AML_API_BASE_CORPO_URL}/api/charges/` + id)
      .then((res) => {
        setCharges(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="border border-gray-300 rounded-lg p-3 shadow bg-white space-y-6 w-full m-auto">
      {charges?.items?.map((itm, i) => (
        <>
          <Link
            className="font-bold text-xl hover:opacity-50 cursor-pointer transition-all duration-100mt-3 underline"
            style={{
              color: "#005ea5",
            }}
            to={`${itm.links.self}`}
          >
            {itm.charge_code ? "Charge code " + itm.charge_code : itm.classification.description}
          </Link>
          {i === 0 && (
            <div className="text-lg">
              <h4 className="mb-4">{itm.classification.description}</h4>
              {charges.total_count} outstanding, {charges.satisfied_count} satisfied,{" "}
              {charges.part_satisfied_count} part satisfied
            </div>
          )}
          <div className="grid grid-cols-3 mt-5 gap-0" key={i}>
            <div className="col-span-1">
              <div className="text-lg font-semibold">Created</div>
              <h5>{itm.created_on}</h5>
            </div>
            <div className="col-span-1">
              <div className="text-lg font-semibold"> Delivered</div>
              <h5>{itm.delivered_on}</h5>
            </div>
            <div className="col-span-1">
              <div className="text-lg font-semibold">Status</div>
              <h5>{itm.status}</h5>
            </div>
          </div>

          <div className="block">
            <h5>Persons entitled</h5>
            <div className="text-lg" key={i}>
              {itm.persons_entitled.map((per) => per.name)}
            </div>
          </div>
          <div className="block">
            <h5>Short particulars</h5>
            <div className=" text-ellipsis overflow-hidden whitespace-normal">
              {itm.particulars.description.length > 100
                ? itm.particulars.description.substring(0, 100) + "..."
                : itm.particulars.description}
            </div>
          </div>
          <hr className="mt-3 mb-3" />
        </>
      ))}
    </div>
  );
}

export default Charges;
