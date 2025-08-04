import { useSelector } from 'react-redux'
import { RootState } from '@config/store'

export function useHasPermission(requiredPermission: string): boolean {
  const user = useSelector((state: RootState) => state.user.user)
  if (!user || !user.permissions) return false

  const roleKey = user.role.toLowerCase()
  const relevantPermissions = user.permissions[roleKey] || []
  return relevantPermissions.includes(requiredPermission)
}