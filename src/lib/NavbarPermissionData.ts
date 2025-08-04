import {
  LayoutDashboard,
  Users,
  Command,
  GalleryVerticalEnd,
  List,
  LayoutList,
} from 'lucide-react'
import type { SidebarData } from '../components/layout/types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Loading...',
    email: '....',
    avatar: '/avatars/default_avatar.png',
  },
  teams: [
    {
      name: 'Prevision El Eden',
      logo: Command,
      plan: 'Maracaibo - Zulia',
    },
    {
      name: 'Jardin El Eden',
      logo: GalleryVerticalEnd,
      plan: 'San Francisco - Zulia',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: LayoutDashboard,
          // Disponible para todos
        },
      ],
    },
    {
    title: 'Management',
    requiredPermission: 'CAN_SEE_USERS',
      items: [
        {
          title: 'Users',
          icon: Users,
          url: '/management',
          items: [
            {
              title: 'Users list',
              icon: List,
              url: '/management/users',
              requiredPermission: 'CAN_SEE_USERS'
            },
            {
              title: 'Permission List',
              icon: LayoutList,
              url: '/management/permissionlist',
              requiredPermission: 'CAN_SEE_USERS'
            },
          ],
        },
      ],
    },
    // Puedes tener otros grupos con sus respectivos items
  ],
}