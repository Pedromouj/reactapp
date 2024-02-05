import { lazy } from "react";
import { useTranslation } from "react-i18next";

const News = lazy(() => import("./News"));

const MediaBlocs = ({ keyword }) => {
  const { t } = useTranslation();
  return (
    <div className=" bg-white p-2 w-full mx-auto rounded shadow   mt-5">
      <div
        className={`flex flex-col overflow-hidden print:overflow-visible lg:pr-4  h-72 overflow-y-auto`}
      >
        <News searchTerm={keyword} />
      </div>
    </div>
  );
};

export default MediaBlocs;
