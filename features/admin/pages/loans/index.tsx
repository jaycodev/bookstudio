'use client'

import { TableListLayout } from '@admin/components/shared/table-list-layout'

import { useListQuery } from '@/hooks/use-list-query'
import { loansApi } from '@/lib/api/loans'
import type { LoanList } from '@/lib/schemas/loan/loan.list.schema'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
  resource: string
}

export function LoansPage({ title, pathname, resource }: Props) {
  const { data, error } = useListQuery<LoanList[]>(pathname, [resource], loansApi.getAll)

  if (error) {
    console.error(`Failed to fetch ${resource}:`, error)
  }

  return (
    <TableListLayout
      columns={columns}
      data={data}
      resource={resource}
      title={title}
      description="Todo lo que necesitas para gestionarlos."
      pathname={pathname}
    />
  )
}
