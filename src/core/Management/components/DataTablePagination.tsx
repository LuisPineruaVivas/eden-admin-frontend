import { useSearchParams } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { Button } from '@components/ui/Button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/Select'

interface DataTablePaginationProps {
  totalRows: number
  selectedRows: number
}

export function DataTablePagination({ totalRows, selectedRows }: DataTablePaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageIndex = Number(searchParams.get('page') || '0')
  const pageSize = Number(searchParams.get('pageSize') || '10')
  const pageCount = Math.ceil(totalRows / pageSize)

  const setPageIndex = (index: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', index.toString())
    setSearchParams(params)
  }

  const setPageSize = (size: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('pageSize', size.toString())
    // reset the page to the first one when the page size changes
    params.set('page', '0')
    setSearchParams(params)
  }

  const canPreviousPage = pageIndex > 0
  const canNextPage = pageIndex < pageCount - 1

  return (
    <div
      className='flex items-center justify-between overflow-clip px-2'
      style={{ overflowClipMargin: 1 }}
    >
      <div className='text-muted-foreground hidden flex-1 text-sm sm:block'>
        {selectedRows} of {totalRows} row(s) selected.
      </div>
      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='hidden text-sm font-medium sm:block'>Rows per page</p>
          <Select value={`${pageSize}`} onValueChange={(value) => setPageSize(Number(value))}>
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page {pageIndex + 1} of {pageCount}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => setPageIndex(0)}
            disabled={!canPreviousPage}
          >
            <span className='sr-only'>Go to first page</span>
            <ChevronsLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={!canPreviousPage}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={!canNextPage}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRight className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => setPageIndex(pageCount - 1)}
            disabled={!canNextPage}
          >
            <span className='sr-only'>Go to last page</span>
            <ChevronsRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
