import { useUsers } from '@config/providers/UsersContext'
import { IUser } from '@interfaces/models'
import { useHasPermission } from '@hooks/useHasPermission'
import { Button } from '@components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@components/ui/DropdownMenu'
import { MoreHorizontal, Eye, Edit, Trash, CheckCircle } from 'lucide-react'

interface UsersTableActionsProps {
  user: IUser
}

export function UsersTableActions({ user }: UsersTableActionsProps) {
  const { setOpen, setCurrentRow } = useUsers()
  const canView    = useHasPermission('CAN_SEE_USERS')
  const canUpdate  = useHasPermission('CAN_UPDATE_USERS')
  const canDestroy = useHasPermission('CAN_DESTROY_USERS')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" title="Opciones">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {canView && (
          <DropdownMenuItem onClick={() => {
            setCurrentRow(user)
            setOpen('view')
          }}>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
        )}
        {canUpdate && (
          <DropdownMenuItem onClick={() => {
            setCurrentRow(user)
            setOpen('edit')
          }}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
        )}
        {canDestroy && (
          <DropdownMenuItem onClick={() => {
            setCurrentRow(user)
            setOpen('delete')
          }}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {/* Status */}
        <DropdownMenuItem onClick={() => {
          setCurrentRow(user)
          setOpen('status')
        }}>
          <CheckCircle className="mr-2 h-4 w-4" /> Status
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}