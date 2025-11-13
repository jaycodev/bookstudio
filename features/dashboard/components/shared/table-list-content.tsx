import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@dashboard/components/data-table/data-table'

interface TableContentProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  resource: string
  dataFetcher: () => Promise<TData[]>
}

export async function TableListContent<TData, TValue>({
  columns,
  resource,
  dataFetcher,
}: TableContentProps<TData, TValue>) {
  const data = await dataFetcher()

  return <DataTable columns={columns} data={data} resource={resource} />
}
