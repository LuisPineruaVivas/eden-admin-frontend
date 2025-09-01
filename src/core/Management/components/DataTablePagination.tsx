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
import { useTranslation } from 'react-i18next'

interface DataTablePaginationProps {
  totalRows: number
  selectedRows: number
}

export function DataTablePagination({ totalRows, selectedRows }: DataTablePaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageIndex = Number(searchParams.get('page') || '0')
  const pageSize = Number(searchParams.get('pageSize') || '10')
  const { t } = useTranslation('common')

  // Asegura que totalRows y pageSize sean válidos para evitar NaN
  const safeTotalRows = Number.isFinite(totalRows) && totalRows > 0 ? totalRows : 0
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 10
  const pageCount = Math.max(1, Math.ceil(safeTotalRows / safePageSize))

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
        {selectedRows} {t('translation.management.user_list.of')} {safeTotalRows} {t('translation.management.user_list.selected')}.
      </div>
      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='hidden text-sm font-medium sm:block'>{t('translation.management.user_list.rowsPerPage')}</p>
          <Select value={`${safePageSize}`} onValueChange={(value) => setPageSize(Number(value))}>
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={`${safePageSize}`} />
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
          {t('translation.management.user_list.page')} {pageIndex + 1} {t('translation.management.user_list.of')} {pageCount}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => setPageIndex(0)}
            disabled={!canPreviousPage}
          >
            <span className='sr-only'>{t('translation.management.user_list.goToFirstPage')}</span>
            <ChevronsLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={!canPreviousPage}
          >
            <span className='sr-only'>{t('translation.management.user_list.goToPreviousPage')}</span>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={!canNextPage}
          >
            <span className='sr-only'>{t('translation.management.user_list.goToNextPage')}</span>
            <ChevronRight className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => setPageIndex(pageCount - 1)}
            disabled={!canNextPage}
          >
            <span className='sr-only'>{t('translation.management.user_list.goToLastPage')}</span>
            <ChevronsRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}