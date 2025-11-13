import { CirclePlus, FileSpreadsheet, FileX } from 'lucide-react'

import { sidebarMap } from '@dashboard/components/sidebar/sidebar-map'

import { Button } from '@/components/ui/button'

interface TableListHeaderProps {
  title: string
  description: string
  pathname: string
}

export function TableListHeader({ title, description, pathname }: TableListHeaderProps) {
  const sidebarMeta = sidebarMap[pathname as keyof typeof sidebarMap]
  const Icon = sidebarMeta?.icon

  return (
    <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {Icon && <Icon strokeWidth={2.5} />}
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <FileX className="text-green-500 dark:text-green-400" />
          Excel
        </Button>
        <Button variant="outline">
          <FileSpreadsheet className="text-destructive" />
          PDF
        </Button>
        <Button>
          <CirclePlus />
          Agregar
        </Button>
      </div>
    </div>
  )
}
