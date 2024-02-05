import { Link, Outlet } from "react-router-dom";

const Settingsindex = () => {
  return (
    <div className="border rounded-lg shadow-lg bg-white p-5">
      {/* prettier-ignore */}
      <div className="flex pb-3 space-x-3 border-b text-sm font-bold">
        <Link to="/setting/atome-modeles" className="rounded-md px-6 py-2 bg-gray-100 ">Atom models</Link>
        <Link to="/setting/bloc-data" className="rounded-md px-6 py-2 bg-gray-100 ">Bloc data</Link>
        <Link to="/setting/atome-model-data-types" className="rounded-md px-6 py-2 bg-gray-100 ">Types</Link>
        <Link to="/setting/questions" className="rounded-md px-6 py-2 bg-gray-100 ">Questions</Link>
      </div>
      <div className="pt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Settingsindex;
