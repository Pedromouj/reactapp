import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useState } from "react";
import WebsiteViewer from "./WebsiteViewer";

import DocumentPreview from "./DocumentPreview";
import { useEffect } from "react";

const PdfWebsitePreviewer = ({ previewDocUrl, setPreviewDocUrl, selectedAtome, onComplete }) => {
  const [selectedTab, setSelectedTab] = useState("pdf");

  useEffect(() => {
    if (previewDocUrl === "") return;
    setSelectedTab("document_preview");
    return () => {
      setPreviewDocUrl("");
    };
  }, [setSelectedTab, previewDocUrl, setPreviewDocUrl, selectedAtome]);

  let component;

  switch (selectedTab) {
    case "pdf":
      component = <Pdfviewer selectedAtome={selectedAtome} />;
      break;

    case "document_preview":
      component = <DocumentPreview previewDocUrl={previewDocUrl} />;
      break;

    default:
      component = (
        <WebsiteViewer
          selectedAtome={selectedAtome}
          setPreviewDocUrl={setPreviewDocUrl}
          onComplete={onComplete}
        />
      );
      break;
  }

  return (
    <div>
      <TabsSelector
        setPreviewDocUrl={setPreviewDocUrl}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div>{component}</div>
    </div>
  );
};

const Pdfviewer = () => {
  const [data, setData] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setData(reader.result);
    };
    reader.onerror = function (error) {
      console.error("Error: ", error);
    };
  };

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
      <div>
        <input type="file" accept="application/pdf,application" onChange={handleFileSelect} />
      </div>
      <div className="max-h-[80vh] overflow-auto max-w-4xl">
        {data && <Viewer fileUrl={data} />}
      </div>
    </Worker>
  );
};

const TabsSelector = ({ selectedTab, setSelectedTab, setPreviewDocUrl }) => {
  const tabs = [
    {
      name: "pdf",
      label: "Pdf",
      bgColor: "blue-200",
    },
    {
      name: "web",
      label: "Website",
      bgColor: "green-200",
    },
    {
      name: "document_preview",
      label: "Preview",
      bgColor: "cyan-200",
    },
  ];

  const active = "inline-block py-1 px-4 text-blue-600 border-b border-blue-600 border-3 active";
  const inactive = "inline-block py-1 px-4";

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
      {tabs.map((tab) => (
        <li
          key={tab.name}
          onClick={() => {
            setSelectedTab(tab.name);
            if (tab.name !== "document_preview") setPreviewDocUrl("");
          }}
          className={`mr-2 bg-${tab.bgColor} rounded-t-lg text-black p-0.5 b-10`}
        >
          <button className={selectedTab === tab.name ? active : inactive}>{tab.label}</button>
        </li>
      ))}
    </ul>
  );
};

export default PdfWebsitePreviewer;
