import { CheckIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import useHttpPrivate from "../../hooks/useHttpPrivate";
import useToast from "../../hooks/useToast";
import AutoCompleteSelect from "./AutoCompleteSelect";

export default function WebsiteViewer({ setPreviewDocUrl, selectedAtome, onComplete }) {
  const [url, setUrl] = useState("");
  const [selectedSource, setSelectedSource] = useState(null);
  const http = useHttpPrivate();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    for (const [key, value] of new FormData(e.currentTarget)) {
      data[key] = value;
    }
    setUrl(data.url);
  };

  const validateSource = async () => {
    try {
      if (!selectedAtome) return;
      await http.post("/atomesources", {
        atome: selectedAtome.libelle,
        idatome: selectedAtome.id,
        source: selectedSource.source,
        idsource: selectedSource.id,
      });
      toast("success", "Source added successfully!");
      setUrl("");
      onComplete();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setUrl(selectedSource?.source);
  }, [selectedSource]);

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="flex gap-2">
          {/* <input
            type="text"
            id="url"
            name="url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="https://www.example.com/article?..."
            required=""
          /> */}
          <AutoCompleteSelect
            className="flex-grow"
            url="/sourceliens"
            label="source"
            onChange={(e) => setSelectedSource(JSON.parse(e.value))}
          />
          {selectedAtome && url && (
            <button
              type="button"
              onClick={validateSource}
              className="border rounded-lg p-2 bg-green-800"
            >
              <CheckIcon className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </form>

      <div className="w-full h-full max-h-[80vh] overflow-auto">
        <iframe title="atomes" src={url} width={1000} height={900}></iframe>
      </div>
    </>
  );
}
