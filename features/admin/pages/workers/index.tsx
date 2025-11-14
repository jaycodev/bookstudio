'use client'

import { TableListLayout } from '@admin/components/shared/table-list-layout'

import { useListQuery } from '@/hooks/use-list-query'
import { workersApi } from '@/lib/api/workers'
import type { WorkerList } from '@/lib/schemas/worker/worker.list.schema'

import { columns } from './columns'

interface Props {
  title: string
  pathname: string
  resource: string
}

export function WorkersPage({ title, pathname, resource }: Props) {
  const { data, error } = useListQuery<WorkerList[]>(pathname, [resource], workersApi.getAll)

  if (error) {
    console.error(`Failed to fetch ${resource}:`, error)
  }

  return (
    <TableListLayout
      columns={columns}
      data={data}
      resource={resource}
      title={title}
      description="Administra tu equipo."
      pathname={pathname}
    />
  )
}
