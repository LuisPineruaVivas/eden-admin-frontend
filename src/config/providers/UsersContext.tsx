import { IUser } from '@/interface/models'
import { createContext, useContext, useState, ReactNode } from 'react'

export type UsersDialogType = 'add' | 'invite' | 'edit' | 'delete' | null

interface UsersContextProps {
  open: UsersDialogType
  setOpen: (type: UsersDialogType) => void
  currentRow: IUser | null
  setCurrentRow: (row: IUser | null) => void
  roleFilter?: string
  setRoleFilter: (role?: string) => void
}

const UsersContext = createContext<UsersContextProps | undefined>(undefined)

export default function UsersProvider({ children }: { children: ReactNode }) {
  const [open, setOpenState] = useState<UsersDialogType>(null)
  const [currentRow, setCurrentRowState] = useState<IUser | null>(null)
  const [roleFilter, setRoleFilterState] = useState<string | undefined>()

  const setOpen = (type: UsersDialogType) => setOpenState(type)
  const setCurrentRow = (row: IUser | null) => setCurrentRowState(row)

  return (
    <UsersContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        roleFilter,
        setRoleFilter: setRoleFilterState,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const ctx = useContext(UsersContext)
  if (!ctx) throw new Error('useUsers debe usarse dentro de <UsersProvider>')
  return ctx
}

// Alias para compatibilidad con import { useUsersContext }
export const useUsersContext = useUsers