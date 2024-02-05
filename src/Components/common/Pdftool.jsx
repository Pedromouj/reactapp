import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import PDF from "../../assets/doc.pdf";
import { SizeMe } from "react-sizeme";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
// import useHttpPrivate from "../../hooks/useHttpPrivate";

const Pdftool = () => {
  // const http = useHttpPrivate();
  const [pdf, setPdf] = useState(PDF);
  const [url, setUrl] = useState("");
  const [selectedTab, setSelectedTab] = useState("pdf");
  // const [sources, setSources] = useState([]);

  // const fetchSources = useCallback(async () => {
  //   try {
  //     const response = await http.put("/sources", { texte: url });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [http, url]);

  useEffect(() => {
    if (pdf && !url) return;
    setPdf("");
  }, [url, pdf]);

  // useEffect(() => {
  //   fetchSources();
  // }, [fetchSources, url]);

  return (
    <div className="min-h-[90vh] flex flex-col">
      <TabsSelector selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="flex-grow">
        {selectedTab === "pdf" && <Pdftab pdf={pdf} />}
        {selectedTab === "website" && <Websitetab url={url} setUrl={setUrl} />}
      </div>
    </div>
  );
};

const TabsSelector = ({ selectedTab, setSelectedTab }) => {
  const tabs = [
    {
      name: "pdf",
      label: "Pdf",
    },
    {
      name: "website",
      label: "Website",
    },
  ];

  const active = "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active";
  const inactive = "inline-block p-4 text-gray-400 rounded-t-lg";

  return (
    <ul className="flex flex-wrap text-sm border-b font-medium text-center text-gray-500 border-gray-200">
      {tabs.map((tab) => (
        <li key={tab.name} onClick={() => setSelectedTab(tab.name)} className="mr-2">
          <button className={selectedTab === tab.name ? active : inactive}>{tab.label}</button>
        </li>
      ))}
    </ul>
  );
};

const Pdftab = ({ pdf }) => {
  return (
    <div className="p-10 flex flex-col space-y-10">
      <div className="flex flex-col space-y-5">
        <UploadPdf />
      </div>
      {pdf && <RenderPdf pdf={pdf} />}
    </div>
  );
};

const Websitetab = ({ url, setUrl }) => {
  return (
    <div className="p-10 flex flex-col space-y-10">
      <WebsiteURL url={url} setUrl={setUrl} />

      {url && <RenderWebsite url={url} />}
    </div>
  );
};

const TextInput = ({ label, type = "text", idname, ...rest }) => (
  <div>
    <input
      {...rest}
      type={type}
      name={idname}
      id={idname}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      required
    />
  </div>
);

const UploadPdf = () => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">
        Upload file
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        id="file_input"
        type="file"
      />
    </div>
  );
};

const WebsiteURL = ({ setUrl }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput idname="url" value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

const RenderPdf = ({ pdf }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () => setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <div className="w-full max-h-[80vh] overflow-auto">
      <nav>
        <button
          onClick={goToPrevPage}
          className="bg-gray-500 px-3 rounded-md text-white font-bold mr-2"
        >
          Prev
        </button>
        <button onClick={goToNextPage} className="bg-gray-500 px-3 rounded-md text-white font-bold">
          Next
        </button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </nav>

      <SizeMe>
        {({ size }) => (
          <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} width={size.width} />
          </Document>
        )}
      </SizeMe>
    </div>
  );
};

const RenderWebsite = ({ url }) => {
  return (
    <div className="w-full h-full max-h-[80vh] overflow-auto">
      <iframe title="atomes" src={url} width={1000} height={900}></iframe>
    </div>
  );
};

export default Pdftool;
