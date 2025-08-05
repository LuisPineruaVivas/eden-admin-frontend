import {
  Ban,
  Monitor,
  Bug,
  CheckLine,
  Frown,
  HelpCircleIcon,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Bell,
  Package,
  Palette,
  Server,
  Settings,
  Wrench,
  User,
  UserX,
  Users,
} from 'lucide-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { ClerkLogo } from '@/assets/clerk-logo'
import { type SidebarData } from '../components/layout/types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Management',
          url: '/management',
          icon: Monitor,
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: CheckLine,
        },
        {
          title: 'Apps',
          url: '/apps',
          icon: Package,
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          icon: MessageSquare,
        },
        {
          title: 'Users',
          url: '/users',
          icon: Users,
        },
        {
          title: 'Secured by Clerk',
          icon: ClerkLogo,
          items: [
            {
              title: 'Sign In',
              url: '/clerk/sign-in',
            },
            {
              title: 'Sign Up',
              url: '/clerk/sign-up',
            },
            {
              title: 'User Management',
              url: '/clerk/user-management',
            },
          ],
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: Lock,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          icon: Bug,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: Lock,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: UserX,
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: Frown,
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: Server,
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: Ban,
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: User,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: HelpCircleIcon,
        },
      ],
    },
  ],
}
