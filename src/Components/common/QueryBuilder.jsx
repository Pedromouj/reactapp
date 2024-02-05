import { useReducer } from "react";
import AutoCompleteSelect from "./AutoCompleteSelect";
import { v4 as uuidv4 } from "uuid";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { getPropFromStringified } from "../../util/data";

const QueryBuilder = () => {
  const operators = ["=", ">", "<", "LIKE"];
  const [query, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "ADDED":
          return [
            ...state,
            { id: uuidv4(), label: null, operator: "=", value: null, concat: "AND" },
          ];
        case "DELETED":
          return state.filter((s) => s.id !== action.id);
        case "EDITED":
          state.forEach((e) => {
            if (e.id === action.id) {
              e.label = action.values.label || e.label;
              e.operator = action.values.operator || e.operator;
              e.value = action.values.value || e.value;
              e.concat = action.values.concat || e.concat;
            }
          });
          return [...state];
        default:
          return state;
      }
    },
    [{ id: uuidv4(), label: null, operator: "=", value: null, concat: null }]
  );

  return (
    <>
      {query?.map((field, index) => (
        <div className="grid grid-cols-12 items-end gap-5 p-1" key={field.id}>
          <div className="col-span-1">
            {index !== 0 && (
              <select
                name="concat"
                onChange={(e) => {
                  dispatch({ type: "EDITED", id: field.id, values: { concat: e.target.value } });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            )}
          </div>
          <AutoCompleteSelect
            name="atomemodeles[]"
            paramKey="text"
            url="/atomesdatamodeles"
            className="col-span-5"
            onChange={(e) => {
              dispatch({ type: "EDITED", id: field.id, values: { label: getPropFromStringified(e.value) } });
            }}
          />
          <div className="col-span-1">
            <select
              name="operators[]"
              onChange={(e) => {
                dispatch({ type: "EDITED", id: field.id, values: { operator: e.target.value } });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              {operators.map((operator) => (
                <option key={operator} value={operator}>
                  {operator}
                </option>
              ))}
            </select>
          </div>
          <TextInput
            idname="values[]"
            className="col-span-4"
            onChange={(e) => {
              dispatch({ type: "EDITED", id: field.id, values: { value: e.target.value } });
            }}
          />
          {index === 0 ? (
            <div className="text-end">
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: "ADDED" });
                }}
                disabled={!query[0].label}
                className="disabled:bg-gray-400 p-2.5 border border-gray-200 bg-blue-500 rounded-lg text-white font-bold"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-end">
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: "DELETED", id: field.id });
                }}
                className="p-2.5 border border-gray-200 bg-red-500 rounded-lg text-white font-bold"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ))}
      <input type="hidden" name="query_builder" value={JSON.stringify(query)} />
    </>
  );
};

const TextInput = ({ type = "text", idname, className, ...rest }) => (
  <div className={className}>
    <input
      {...rest}
      type={type}
      name={idname}
      id={idname}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 disabled:bg-gray-300"
    />
  </div>
);

export default QueryBuilder;
