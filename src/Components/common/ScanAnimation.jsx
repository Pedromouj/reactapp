import CardPlaceholder from "./AMLCheck/CardPlaceholder";

const ScanAnimation = ({ searchTerm, type, typeColor }) => {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="ocrloader w-full max-w-[360px] h-[225px] relative ocrloader">
        <p className="text-blue-800 absolute bottom-2 left-[50%] -translate-x-[50%] font-bold animate-pulse uppercase before:content-[''] before:inline-block before:w-3 before:h-3 before:rounded-full before:bg-blue-800 before:relative before:right-1">
          Scanning
        </p>
        <em></em>
        <span className="absolute left-[2%] w-[96%] h-1 bg-blue-800 shadow-lg z-[1] translate-y-[95px] scanner-movement"></span>
        <CardPlaceholder type={type} typeColor={typeColor} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default ScanAnimation;
