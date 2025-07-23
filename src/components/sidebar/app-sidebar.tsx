import * as React from "react"
import { Link } from "react-router-dom";
import {
  LibraryBig,
  Gauge,
  CircleFadingPlus,
  BookCopy,
  Users,
  Newspaper,
  Notebook,
  GraduationCap,
  SquareUser,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Jason",
    email: "jasonvilac@gmail.com",
    avatar: "",
  },
  teams: [
    {
      name: "BookStudio",
      logo: LibraryBig,
      plan: "Biblioteca",
    }
  ],
  navMain: [
    {
      title: "Dashboard",
      to: "/",
      icon: Gauge,
    },
    {
      title: "Préstamos",
      to: "/loans",
      icon: CircleFadingPlus,
    },
    {
      title: "Libros",
      to: "/books",
      icon: BookCopy,
    },
    {
      title: "Autores",
      to: "/authors",
      icon: SquareUser,
    },
    {
      title: "Editoriales",
      to: "/publishers",
      icon: Newspaper,
    },
    {
      title: "Cursos",
      to: "/courses",
      icon: Notebook,
    },
    {
      title: "Estudiantes",
      to: "/students",
      icon: GraduationCap,
    },
    {
      title: "Usuarios",
      to: "/users",
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
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <LibraryBig className="size-4" />
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
