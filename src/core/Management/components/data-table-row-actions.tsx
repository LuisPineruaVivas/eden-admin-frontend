import { MoreHorizontal, Edit, Trash } from 'lucide-react'
import { Button } from '@components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@components/ui/DropdownMenu'
import { User } from '../data/schema'
import { useNavigate } from 'react-router-dom'

interface DataRow {
  original: User
}

interface DataTableRowActionsProps {
  row: DataRow
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const navigate = useNavigate()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="data-[state=open]:bg-muted flex h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            navigate(`/users/edit/${row.original.id}`)
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <Edit size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            navigate(`/users/delete/${row.original.id}`)
          }}
          className="text-red-500!"
        >
          Delete
          <DropdownMenuShortcut>
            <Trash size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
