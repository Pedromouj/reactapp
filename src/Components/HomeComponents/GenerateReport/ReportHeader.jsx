const ReportHeader = ({ selectedRecord }) => {
  return (
    <div className="text-center hidden print:block">
      <div className="flex justify-between items-center gap-5">
        <img
          src="/icons/picod_logo_full.svg"
          width={150}
          height="auto"
          className="inline ml-8"
          alt=""
          srcSet=""
        />

        <div className="flex flex-col gap-2 items-center">
          <h5 className="!m-0">
            {selectedRecord?.libelle ? selectedRecord?.libelle : selectedRecord}
          </h5>
          <p className="font-bold text-xs">Certificate issued by PICOD</p>
          <p className="font-bold text-xs">{new Date().toLocaleString()}</p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ReportHeader;
