import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./users-columns";
import rawData from "./users.json";
import { User } from "./schema";

const data: User[] = rawData.map((user) => ({
  ...user,
  Role: user.Role === "administrador" ? "administrador" : "bibliotecario",
}));

const UsersPage = () => {
  return <DataTable columns={columns} data={data} resource="users" />;
};

export default UsersPage;
