import React from 'react'
import { Link, useLocation } from '@tanstack/react-router'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { pageMap } from '@/config/page-map'
import { sidebarData } from '@/features/app/components/sidebar/sidebar.data'
import { sidebarMap } from '@/features/app/components/sidebar/sidebar-map'

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function AppBreadcrumbs() {
  const location = useLocation()
  const pathname = location.pathname

  const currentPage = pageMap[pathname]
  if (!currentPage) return null

  let groupKey = sidebarMap[pathname]?.group
  if (!groupKey) {
    let tempParent = pageMap[pathname]?.parentItem ?? sidebarMap[pathname]?.parentItem
    while (tempParent && !groupKey) {
      groupKey = sidebarMap[tempParent as keyof typeof sidebarMap]?.group
      tempParent =
        pageMap[tempParent as keyof typeof pageMap]?.parentItem ??
        sidebarMap[tempParent as keyof typeof sidebarMap]?.parentItem
    }
  }
  const groupName = sidebarData.navGroups.find((g) => g.title.toLowerCase() === groupKey)?.title

  const parents: { key: string; title: string; isLink: boolean }[] = []
  let parentKey = pageMap[pathname]?.parentItem ?? sidebarMap[pathname]?.parentItem

  while (parentKey) {
    const parentPage = pageMap[parentKey as keyof typeof pageMap]

    if (parentPage) {
      parents.unshift({
        key: parentKey,
        title: parentPage.title,
        isLink: true,
      })
    } else {
      parents.unshift({
        key: parentKey,
        title: capitalize(parentKey),
        isLink: false,
      })
    }

    parentKey =
      pageMap[parentKey as keyof typeof pageMap]?.parentItem ??
      sidebarMap[parentKey as keyof typeof pageMap]?.parentItem
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {groupName && (
          <BreadcrumbItem>
            <span className="text-muted-foreground cursor-default">{groupName}</span>
          </BreadcrumbItem>
        )}

        {parents.map((p) => (
          <React.Fragment key={p.key}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {p.isLink ? (
                <BreadcrumbLink asChild>
                  <Link to={p.key}>{p.title}</Link>
                </BreadcrumbLink>
              ) : (
                <span className="text-muted-foreground cursor-default">{p.title}</span>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
