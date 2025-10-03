import { SidebarInset, SidebarProvider } from '@components/ui/sidebar'
import { cn } from '@lib/utils'
import { SearchProvider } from '@context/search-context'
import { AppSidebar } from '@dashboard/components/sidebar'

import { Header } from './components/header'

interface Props {
  children?: React.ReactNode
  fixed?: boolean
}

export function DashboardLayout({ children, fixed = false }: Props) {
  return (
    <SearchProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className={cn('@container/main', fixed && 'has-[[data-layout=fixed]]:h-svh')}>
          <Header />
          <div
            data-layout={fixed ? 'fixed' : 'auto'}
            className={cn('flex flex-1 p-5 gap-4', fixed ? 'flex-col overflow-hidden' : 'flex-col')}
          >
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SearchProvider>
  )
}
