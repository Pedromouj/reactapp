export default function DocumentPreview({ previewDocUrl }) {
  return (
    <>
      <div className="w-full h-full max-h-[80vh] overflow-auto">
        {previewDocUrl && (
          <iframe
            title="doc_preview"
            src={`${import.meta.env.VITE_IMG_BASE_URL}/uploadFiles/${previewDocUrl}`}
            width={1000}
            height={900}
          ></iframe>
        )}
      </div>
    </>
  );
}
