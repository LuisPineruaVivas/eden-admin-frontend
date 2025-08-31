import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { RootState } from '@config/store'
import { GroupsPrimaryButtons } from './components/GroupsPrimaryButtons'
import { GroupsTable } from './components/GroupsTable'
import { groupsColumns } from './components/GroupsColumns'
import { mockGroups } from './data/groups'
import { Skeleton } from '@components/ui/Skeleton'

export default function GroupListTable() {
  const token = useSelector((state: RootState) => state.user.token)
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  // Por ahora usamos datos mock, pero mantenemos la estructura para futura integración con API
  const fetchGroups = useCallback(() => {
    // Simular paginación con los datos mock
    const startIndex = pageIndex * pageSize
    const endIndex = startIndex + pageSize
    const paginatedGroups = mockGroups.slice(startIndex, endIndex)
    
    return Promise.resolve({
      data: {
        groups: paginatedGroups,
        metadata: {
          count: mockGroups.length,
          page: pageIndex + 1,
          items: pageSize,
          pages: Math.ceil(mockGroups.length / pageSize)
        }
      }
    })
  }, [pageIndex, pageSize])

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['groups', token, pageIndex, pageSize],
    queryFn: fetchGroups,
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

  const groupList = data!.data.groups
  const { pages } = data!.data.metadata

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <GroupsPrimaryButtons />
      </div>

      <GroupsTable
        data={groupList}
        columns={groupsColumns}
        pageCount={pages}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPageChange={setPageIndex}
        onPageSizeChange={setPageSize}
      />
    </div>
  )
}
