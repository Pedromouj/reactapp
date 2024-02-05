import TableUser from "./TableUser";

// const TableUser = lazy(() => import("./TableUser"));
const Users = () => {
  return (
    <div className="container mx-auto mt-10">
      <TableUser />
    </div>
  );
};

export default Users;
