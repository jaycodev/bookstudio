import { pageMap } from '@/lib/constants/page-map'

export const sidebarData = {
  user: {
    name: 'Jason',
    email: 'jasonvilac@gmail.com',
    avatar: '',
  },
  navMain: Object.entries(pageMap)
    .filter(([, meta]) => meta.showInSidebar)
    .map(([to, meta]) => ({
      to,
      title: meta.title,
      icon: meta.icon,
    })),
}
