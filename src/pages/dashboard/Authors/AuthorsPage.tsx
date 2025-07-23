import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./authors-columns";
import rawData from "./authors.json";
import { Author } from "./schema";

const data: Author[] = rawData.map((author) => ({
  ...author,
  Status: author.Status === "activo" ? "activo" : "inactivo",
}));

const AuthorsPage = () => {
  return <DataTable columns={columns} data={data} resource="authors" />;
};

export default AuthorsPage;
