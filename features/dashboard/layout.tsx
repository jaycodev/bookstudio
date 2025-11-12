import { AppSidebar } from '@dashboard/components/sidebar/app-sidebar'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SearchProvider } from '@/context/search-context'

import { Header } from './components/header'

interface Props {
  children?: React.ReactNode
}

export function DashboardLayout({ children }: Props) {
  return (
    <SearchProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="@container/main has-[[data-layout=fixed]]:h-svh">
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </SearchProvider>
  )
}
