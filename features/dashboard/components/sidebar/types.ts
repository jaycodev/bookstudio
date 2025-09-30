import { ValidUrl } from '@config/page-map'

interface User {
  name: string
  email: string
  avatar: string
}

interface BaseNavItem {
  title: string
  badge?: string
  icon?: React.ElementType
}

type NavLink = BaseNavItem & {
  url: ValidUrl
  items?: never
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: ValidUrl })[]
  url?: never
}

type NavItem = NavCollapsible | NavLink

interface NavGroup {
  title: string
  items: NavItem[]
}

interface SidebarData {
  user: User
  navGroups: NavGroup[]
}

export type { NavCollapsible, NavGroup, NavItem, NavLink, SidebarData }
