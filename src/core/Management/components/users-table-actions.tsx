import { useNavigate } from 'react-router-dom'
import { IUser } from '@/interface/models'
import { Button } from '@components/ui/Button'
import { Eye, Edit, Trash } from 'lucide-react'
import { useHasPermission } from '@hooks/useHasPermission'

interface UsersTableActionsProps {
  user: IUser
}

export function UsersTableActions({ user }: UsersTableActionsProps) {
  const navigate = useNavigate()
  const canView    = useHasPermission('CAN_SEE_USERS')
  const canUpdate  = useHasPermission('CAN_UPDATE_USERS')
  const canDestroy = useHasPermission('CAN_DESTROY_USERS')

  return (
    <div className="flex space-x-2">
      {canView && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => navigate(`users/${user.id}`)}
          title="Ver"
        >
          <Eye size={16} />
        </Button>
      )}
      {canUpdate && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => navigate(`users/${user.id}/edit`)}
          title="Editar"
        >
          <Edit size={16} />
        </Button>
      )}
      {canDestroy && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {/* disparar diálogo de borrado */}}
          title="Eliminar"
        >
          <Trash size={16} />
        </Button>
      )}
    </div>
  )
}