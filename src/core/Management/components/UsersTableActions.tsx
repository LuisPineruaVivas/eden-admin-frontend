import React from 'react'
import { useTranslation } from 'react-i18next'
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
import type { UsersDialogType } from '@config/providers/UsersContext'

interface UsersTableActionsProps {
  user: IUser
}

export function UsersTableActions({ user }: UsersTableActionsProps) {
  const { t } = useTranslation('common') // usar namespace correcto
  const { setOpen, setCurrentRow } = useUsers()
  const canView    = useHasPermission('CAN_SEE_USERS')
  const canUpdate  = useHasPermission('CAN_UPDATE_USERS')
  const canDestroy = useHasPermission('CAN_DESTROY_USERS')

  const handleAction = (type: UsersDialogType) => {
    setCurrentRow(user)
    setOpen(type)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label={t('translation.management.user_table.actions_label')}
        >
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {canView && (
          <DropdownMenuItem onSelect={() => handleAction('view')}>
            <Eye className="mr-2 h-4 w-4" /> {t('translation.management.user_table.view')}
          </DropdownMenuItem>
        )}
        {canUpdate && (
          <DropdownMenuItem onSelect={() => handleAction('edit')}>
            <Edit className="mr-2 h-4 w-4" /> {t('translation.management.user_table.edit')}
          </DropdownMenuItem>
        )}
        {canDestroy && (
          <DropdownMenuItem onSelect={() => handleAction('delete')}>
            <Trash className="mr-2 h-4 w-4" /> {t('translation.management.user_table.delete')}
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => handleAction('status')}>
          <CheckCircle className="mr-2 h-4 w-4" /> {t('translation.management.user_table.status')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}