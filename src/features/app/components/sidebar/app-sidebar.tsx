import * as React from 'react'
import { Link } from '@tanstack/react-router'
import {
  BookCopy,
  Building2,
  CircleFadingPlus,
  GraduationCap,
  LayoutDashboard,
  Notebook,
  SquareUser,
  Users,
} from 'lucide-react'

import Logo from '@/assets/icons/logo.svg?react'
import { NavMain } from '@/features/app/components/sidebar/nav-main'
import { NavUser } from '@/features/app/components/sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: 'Jason',
    email: 'jasonvilac@gmail.com',
    avatar: '',
  },
  navMain: [
    {
      title: 'Dashboard',
      to: '/',
      icon: LayoutDashboard,
    },
    {
      title: 'Préstamos',
      to: '/loans',
      icon: CircleFadingPlus,
    },
    {
      title: 'Libros',
      to: '/books',
      icon: BookCopy,
    },
    {
      title: 'Autores',
      to: '/authors',
      icon: SquareUser,
    },
    {
      title: 'Editoriales',
      to: '/publishers',
      icon: Building2,
    },
    {
      title: 'Cursos',
      to: '/courses',
      icon: Notebook,
    },
    {
      title: 'Estudiantes',
      to: '/students',
      icon: GraduationCap,
    },
    {
      title: 'Usuarios',
      to: '/users',
      icon: Users,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <span className="size-8">
                  <Logo />
                </span>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">BookStudio</span>
                  <span>Biblioteca</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
