import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Outlet />
    </div>
  );
};

export default Layout;
