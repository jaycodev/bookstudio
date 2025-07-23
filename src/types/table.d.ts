import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    filter?: {
      title: string;
      options: { label: string; value: string }[];
    };
    searchable?: boolean;
    dateRangeFilter?: boolean;
  }
}
