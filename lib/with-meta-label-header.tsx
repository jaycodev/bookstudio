'use client'

import type { HeaderContext } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@dashboard/components/data-table'

import { getColumnLabel } from '@/config/column-labels'

export function withMetaLabelHeader<TData, TValue = unknown>() {
  function MetaLabelHeader({ column }: HeaderContext<TData, TValue>) {
    return (
      <DataTableColumnHeader
        column={column}
        title={getColumnLabel(column.columnDef.meta?.resource, column.id)}
      />
    )
  }
  MetaLabelHeader.displayName = 'MetaLabelHeader'
  return MetaLabelHeader
}
