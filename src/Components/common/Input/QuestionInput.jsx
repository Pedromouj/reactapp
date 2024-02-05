import { useCallback, useEffect, useState } from "react";
import useHttpPrivate from "../../../hooks/useHttpPrivate";

const QuestionInput = ({ atomeData }) => {
  const http = useHttpPrivate();
  const [questions, setQuestions] = useState([]);
  const [selectedq, setSelectedq] = useState({});
  // const [note, setNote] = useState(0);

  const fetchQuestions = useCallback(async () => {
    const { data } = await http.put("questions", {
      idtype: atomeData.idquestion,
    });
    setQuestions(data);
  }, [http, atomeData]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="datavaleur" style={{ textTransform: "capitalize" }}>
        {atomeData.libelle}
      </label>
      {questions.length > 4 ? (
        <select
          name="datavaleur"
          id="datavaleur"
          required={atomeData.obligatoire}
          className="w-full p-2 rounded-lg bg-gray-50 border border-gray-300"
        >
          <option value="" disabled selected>
            ---
          </option>
          {questions.map((q) => (
            <option key={q.id} value={JSON.stringify({ ...q, libelle: q.question })}>
              {q.question} / {q.note}
            </option>
          ))}
        </select>
      ) : (
        <div className="flex gap-2">
          <input type="hidden" name="datavaleur" value={JSON.stringify(selectedq)} id="" />
          {questions.map((q) => (
            <button
              type="button"
              onClick={() => setSelectedq({ ...q, libelle: q.question })}
              className={`px-5 w-full py-1 rounded-md border ${
                selectedq.id === q.id ? "bg-blue-500 text-white border-blue-500" : "bg-gray-100"
              }`}
              key={q.id + "bloc"}
            >
              {q.question}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionInput;
