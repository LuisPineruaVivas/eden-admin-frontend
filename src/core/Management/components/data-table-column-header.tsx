import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-react'
import { cn } from '@lib/utils'
import { Button } from '@components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/DropdownMenu'

interface DataTableColumnHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  sortKey: string
  canHide?: boolean
}

export function DataTableColumnHeader({
  title,
  sortKey,
  canHide,
  className,
  ...props
}: DataTableColumnHeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentSort = searchParams.get('sort')
  const currentOrder = searchParams.get('order')
  const isSorted = currentSort === sortKey ? currentOrder : undefined

  const toggleSorting = (desc: boolean) => {
    setSearchParams({ sort: sortKey, order: desc ? 'desc' : 'asc' })
  }

  const hideColumn = () => {
    // For example, set a "hide" query parameter for this column.
    setSearchParams({ ...Object.fromEntries(searchParams), hide: sortKey })
  }

  return (
    <div className={cn('flex items-center space-x-2', className)} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='data-[state=open]:bg-accent -ml-3 h-8'
          >
            <span>{title}</span>
            {isSorted === 'desc' ? (
              <ArrowDown className='ml-2 h-4 w-4' />
            ) : isSorted === 'asc' ? (
              <ArrowUp className='ml-2 h-4 w-4' />
            ) : (
              <ChevronsUpDown className='ml-2 h-4 w-4' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => toggleSorting(false)}>
            <ArrowUp className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleSorting(true)}>
            <ArrowDown className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
            Desc
          </DropdownMenuItem>
          {canHide && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={hideColumn}>
                <EyeOff className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
                Hide
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
