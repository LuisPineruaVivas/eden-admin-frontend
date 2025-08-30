import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { RootState } from '@config/store'
import { GET } from '@config/fetcher/Get'
import { IUser } from '@interfaces/models'
import UsersProvider from '@config/providers/UsersContext'
import { UsersPrimaryButtons } from './components/UsersPrimaryButtons'
import { UsersDialogs } from './components/UsersDialogs'
import { UsersTable } from './components/UsersTable'
import { columns } from './components/UsersColumns'
import { Skeleton } from '@components/ui/Skeleton'

export default function UserListTable() {
  const token = useSelector((state: RootState) => state.user.token)
  const [pageIndex, setPageIndex] = useState(0) // 0-based for UI, 1-based for API
  const [pageSize, setPageSize] = useState(10)
  const [roleFilter, setRoleFilter] = useState<string>()

  // Memoized fetch function
  const fetchUsers = useCallback(() => {
    const url =
      `${import.meta.env.VITE_API_URL}/manager/users?items=${pageSize}` +
      `&page=${pageIndex + 1}` + // API expects 1-based page
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
    return (
      <div className="space-y-2">
        {Array.from({ length: pageSize || 5 }).map((_, idx) => (
          <Skeleton key={idx} className="h-8 w-full" />
        ))}
      </div>
    )
  }
  if (isError) return <div>Error: {(error as Error).message}</div>

  const userList = data!.data.users
  const { pages, count } = data!.data.metadata

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
        totalRows={count}
      />

      <UsersDialogs
        pageIndex={pageIndex}
        pageSize={pageSize}
        roleFilter={roleFilter}
      />
    </UsersProvider>
  )
}