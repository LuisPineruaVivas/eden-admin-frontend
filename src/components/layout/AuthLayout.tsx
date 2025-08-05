import { ReactNode } from 'react'
import { Header } from '@components/layout/Header'
import { SidebarProvider } from '@components/ui/Sidebar'
import { AppSidebar } from '@components/layout/AppSidebar'

export interface IAuthLayout {
  children?: ReactNode;
}

export function AuthLayout({ children }: IAuthLayout) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4">
          { children }
        </main>
      </div>
    </SidebarProvider>
  )
}