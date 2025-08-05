import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '@components/ui/Sidebar'
import { AppSidebar } from '@components/layout/AppSidebar'
import { Header } from '@components/layout/Header'

export function AuthLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}