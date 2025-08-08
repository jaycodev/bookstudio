import { Handshake } from 'lucide-react'

import { pageMap, type ValidUrl } from '@/config/page-map'

import { sidebarMap } from './sidebar-map'

type ValidPagePath = ValidUrl

type GroupKey = 'principal' | 'biblioteca' | 'usuarios' | 'otros'

const getSidebarItemsByGroup = (group: GroupKey) =>
  (Object.keys(pageMap) as ValidPagePath[])
    .filter(
      (url) =>
        pageMap[url].showInSidebar &&
        sidebarMap[url]?.group === group &&
        !sidebarMap[url]?.parentItem
    )
    .map((url) => ({
      title: pageMap[url].title,
      url,
      icon: sidebarMap[url]!.icon,
    }))

const getSubItems = (parentItem: string) =>
  (Object.keys(pageMap) as ValidPagePath[])
    .filter((url) => pageMap[url].showInSidebar && sidebarMap[url]?.parentItem === parentItem)
    .map((url) => ({
      title: pageMap[url].title,
      url,
      icon: sidebarMap[url]!.icon,
    }))

export const sidebarData = {
  user: {
    name: 'Jason',
    email: 'jasonvilac@gmail.com',
    avatar: '',
  },
  navGroups: [
    {
      title: 'Principal',
      items: [
        ...getSidebarItemsByGroup('principal'),
        {
          title: 'Préstamos',
          icon: Handshake,
          items: getSubItems('préstamos'),
        },
      ],
    },
    {
      title: 'Biblioteca',
      items: getSidebarItemsByGroup('biblioteca'),
    },
    {
      title: 'Usuarios',
      items: getSidebarItemsByGroup('usuarios'),
    },
    {
      title: 'Otros',
      items: getSidebarItemsByGroup('otros'),
    },
  ],
}
