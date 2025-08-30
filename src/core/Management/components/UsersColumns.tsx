import { IUser } from '@interfaces/models'
import { Badge } from '@components/ui/Badge'
import { UsersTableActions } from './UsersTableActions'
import type { ColumnDef, Getter } from '@tanstack/react-table'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/Avatar'

export const columns: ColumnDef<IUser>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        ref={el => {
          if (el) el.indeterminate = table.getIsSomePageRowsSelected()
        }}
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        ref={el => {
          if (el) el.indeterminate = row.getIsSomeSelected()
        }}
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    meta: { className: 'w-8' },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`${import.meta.env.VITE_API_URL}/${user.avatar}`}
              alt={user.name}
            />
            <AvatarFallback>
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span>{user.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: { className: 'truncate max-w-xs' },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }: { getValue: Getter<string> }) => (
      <Badge variant={getValue() === 'active' ? 'default' : 'secondary'}>
        {getValue()}
      </Badge>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <UsersTableActions user={row.original} />,
    meta: { className: 'text-right' },
  },
]