import { useTranslation } from 'react-i18next'
import { IGroup } from '@interfaces/models'
import { Button } from '@components/ui/Button'

import { MoreHorizontal, Eye, Edit, Trash } from 'lucide-react'
import { useHasPermission } from '@hooks/useHasPermission'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@components/ui/DropdownMenu'


interface GroupsTableActionsProps {
  group: IGroup
}

export function GroupsTableActions({ group }: GroupsTableActionsProps) {
  const { t } = useTranslation('common')
  const canView = useHasPermission('CAN_SEE_SELLINGS_FORCE_GROUPS')
  const canUpdate = useHasPermission('CAN_UPDATE_SELLINGS_FORCE_GROUPS')
  const canDestroy = useHasPermission('CAN_DESTROY_SELLINGS_FORCE_GROUPS')

  return (
   <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label={t('translation.management.groups_table.options')}
        >
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {canView && (
          <DropdownMenuItem onSelect={() => {}}>
            <Eye className="mr-2 h-4 w-4" /> {t('translation.management.groups_table.view')}
          </DropdownMenuItem>
        )}
        {canUpdate && (
          <DropdownMenuItem onSelect={() => {}}>
            <Edit className="mr-2 h-4 w-4" /> {t('translation.management.groups_table.edit')}
          </DropdownMenuItem>
        )}
        {canDestroy && (
          <DropdownMenuItem onSelect={() => {}}>
            <Trash className="mr-2 h-4 w-4" /> {t('translation.management.groups_table.delete')}
          </DropdownMenuItem>
        )}

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
