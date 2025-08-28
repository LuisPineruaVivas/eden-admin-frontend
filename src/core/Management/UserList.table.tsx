import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { RootState } from '@config/store'
import { GET } from '@config/fetcher/Get'
import { IUser } from '@interfaces/models'
import UsersProvider from '@config/providers/UsersContext'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersDialogs } from './components/users-dialogs'
import { UsersTable } from './components/users-table'
import { columns } from './components/users-columns'
import { Skeleton } from '@components/ui/Skeleton'

export default function UserListTable() {
  const token = useSelector((state: RootState) => state.user.token)
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [roleFilter, setRoleFilter] = useState<string>()

  // 1. Memoizar el fetchFn para que React-Query no lo regenere en cada render
  const fetchUsers = useCallback(() => {
    const url =
      `${import.meta.env.VITE_API_URL}/manager/users?items=${pageSize}` +
      `&page=${pageIndex + 1}` +
      (roleFilter ? `&role=${roleFilter}` : '')
    return GET<{
      users: IUser[]
      metadata: { count: number; page: number; items: number; pages: number }
    }>(url, token)
  }, [pageIndex, pageSize, roleFilter, token])

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', token, pageIndex, pageSize, roleFilter],
    queryFn: fetchUsers,
    enabled: Boolean(token),
    keepPreviousData: true,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60_000,
  })

  if (isLoading) {
    // Muestra skeletons en lugar del texto "Cargando usuarios…"
    return (
      <div className="space-y-2">
        {Array.from({ length: pageSize || 5 }).map((_, idx) => (
          <Skeleton key={idx} className="h-8 w-full" />
        ))}
      </div>
    )
  }
  if (isError)   return <div>Error: {(error as Error).message}</div>

  const userList = data!.data.users
  const { pages } = data!.data.metadata

  return (
    <UsersProvider>
      <div className="mb-4 flex items-center justify-between">
        <UsersPrimaryButtons onRoleFilterChange={setRoleFilter} />
      </div>

      <UsersTable
        data={userList}
        columns={columns}
        pageCount={pages}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPageChange={setPageIndex}
        onPageSizeChange={setPageSize}
      />

      <UsersDialogs
        pageIndex={pageIndex}
        pageSize={pageSize}
        roleFilter={roleFilter}
      />
    </UsersProvider>
  )
}