'use client'

import React from 'react'

import { usePathname } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { pageMap } from '@/config/page-map'

import { sidebarData } from './sidebar/sidebar.data'
import { sidebarMap } from './sidebar/sidebar-map'

export function Breadcrumbs() {
  const pathname = usePathname()
  const currentPage = pageMap[pathname]
  if (!currentPage) return null

  const groupKey = sidebarMap[pathname]?.group
  const groupName = sidebarData.navGroups.find((g) => g.title.toLowerCase() === groupKey)?.title

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {groupName && (
          <BreadcrumbItem>
            <span className="text-muted-foreground cursor-default">{groupName}</span>
          </BreadcrumbItem>
        )}

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
