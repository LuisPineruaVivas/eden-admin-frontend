import { IUser } from '@interfaces/models'
import { Button } from '@components/ui/Button'
import { Eye, Edit, Trash } from 'lucide-react'
import { useHasPermission } from '@hooks/useHasPermission'
import { useUsers } from '@config/providers/UsersContext'

interface UsersTableActionsProps {
  user: IUser
}

export function UsersTableActions({ user }: UsersTableActionsProps) {
  const { setOpen, setCurrentRow } = useUsers()
  const canView = useHasPermission('CAN_SEE_USERS')
  const canUpdate = useHasPermission('CAN_UPDATE_USERS')
  const canDestroy = useHasPermission('CAN_DESTROY_USERS')

  return (
    <div className="flex space-x-2 justify-end">
      {canView && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {}}
          title="Ver"
        >
          <Eye size={16} />
        </Button>
      )}
      {canUpdate && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            setOpen('edit')
            setCurrentRow(user)
          }}
          title="Editar"
        >
          <Edit size={16} />
        </Button>
      )}
      {canDestroy && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            setOpen('delete')
            setCurrentRow(user)
          }}
          title="Eliminar"
        >
          <Trash size={16} />
        </Button>
      )}
    </div>
  )
}