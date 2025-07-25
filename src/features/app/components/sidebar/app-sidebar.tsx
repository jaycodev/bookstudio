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
import { NavMain } from '@/features/app/components/sidebar/nav-main'
import { NavUser } from '@/features/app/components/sidebar/nav-user'

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
      to: '/prestamos',
      icon: CircleFadingPlus,
    },
    {
      title: 'Libros',
      to: '/libros',
      icon: BookCopy,
    },
    {
      title: 'Autores',
      to: '/autores',
      icon: SquareUser,
    },
    {
      title: 'Editoriales',
      to: '/editoriales',
      icon: Building2,
    },
    {
      title: 'Cursos',
      to: '/cursos',
      icon: Notebook,
    },
    {
      title: 'Estudiantes',
      to: '/estudiantes',
      icon: GraduationCap,
    },
    {
      title: 'Usuarios',
      to: '/usuarios',
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
                <div className="flex aspect-square size-8 items-center justify-center rounded-2xl">
                  <Logo />
                </div>
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
