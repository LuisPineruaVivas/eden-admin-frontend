import React from 'react'
import { useAuth } from '@hooks/useAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Delete } from '@config/fetcher/Delete'
import { ConfirmDialog } from '@components/ConfirmDialog'
import { IconAlertTriangle } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import type { IUser } from '@interfaces/models'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: IUser
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const { token } = useAuth()
  const { t } = useTranslation('common')
  const qc = useQueryClient()

  const { mutate: deleteUser, isLoading } = useMutation({
    mutationFn: () =>
      Delete(
        `${import.meta.env.VITE_API_URL}/manager/users/${currentRow.id}`,
        token
      ),
    onSuccess: () => {
      qc.invalidateQueries(['users', token])
      toast.success(t('translation.management.user_delete_dialog.success'))
      onOpenChange(false)
    },
    onError: () => {
      toast.error(t('translation.management.user_delete_dialog.error'))
    },
  })

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <span className="flex items-center text-destructive">
          <IconAlertTriangle className="mr-2" size={18} />
          {t('translation.management.user_delete_dialog.title')}
        </span>
      }
      desc={t('translation.management.user_delete_dialog.description', { name: currentRow.name })}
      cancelBtnText={t('translation.common.cancel')}
      confirmText={isLoading ? t('translation.common.deleting') : t('translation.common.confirm')}
      destructive
      handleConfirm={() => deleteUser()}
      isLoading={isLoading}
    />
  )
}

export default UsersDeleteDialog