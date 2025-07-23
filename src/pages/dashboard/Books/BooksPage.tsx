import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./books-columns";
import rawData from "./books.json";
import { Book } from "./schema";

const data: Book[] = rawData.map((book) => ({
  ...book,
  Status: book.Status === "activo" ? "activo" : "inactivo",
}));

const BooksPage = () => {
  return <DataTable columns={columns} data={data} resource="books" />;
};

export default BooksPage;
