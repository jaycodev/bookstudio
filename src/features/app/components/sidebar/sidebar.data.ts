import { pageMap } from '@/lib/constants/page-map'

import { NavLink } from './types'

type ValidPagePath = keyof typeof pageMap

export const sidebarData = {
  user: {
    name: 'Jason',
    email: 'jasonvilac@gmail.com',
    avatar: '',
  },
  navGroups: [
    {
      title: 'Plataforma',
      items: (Object.keys(pageMap) as ValidPagePath[])
        .filter((url) => pageMap[url].showInSidebar)
        .map((url) => ({
          title: pageMap[url].title,
          url,
          icon: pageMap[url].icon,
        })) as NavLink[],
    },
  ],
}
