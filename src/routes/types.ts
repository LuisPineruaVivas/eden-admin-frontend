import { ReactNode } from 'react'

export interface RouteConfig {
  path: string
  element: ReactNode
  children?: RouteConfig[]
  meta?: {
    title?: string
  }
}

export interface RouteGroup {
  name: string
  routes: RouteConfig[]
}

export interface AuthState {
  isAuthenticated: boolean
  isValidating: boolean
  user?: {
    id: string
    email: string
    roles: string[]
    permissions: string[]
  }
} 