import { IGroup } from '@interfaces/models'
import { Button } from '@components/ui/Button'

import { Eye, Edit, Trash } from 'lucide-react'
import { useHasPermission } from '@hooks/useHasPermission'

interface GroupsTableActionsProps {
  group: IGroup
}

export function GroupsTableActions({ group }: GroupsTableActionsProps) {
  const canView = useHasPermission('CAN_SEE_SELLINGS_FORCE_GROUPS')
  const canUpdate = useHasPermission('CAN_UPDATE_SELLINGS_FORCE_GROUPS')
  const canDestroy = useHasPermission('CAN_DESTROY_SELLINGS_FORCE_GROUPS')

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
          onClick={() => {}}
          title="Editar"
        >
          <Edit size={16} />
        </Button>
      )}
      {canDestroy && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {}}
          title="Eliminar"
        >
          <Trash size={16} />
        </Button>
      )}
    </div>
  )
}
