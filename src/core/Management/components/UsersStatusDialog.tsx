import React, { useState, useEffect } from 'react'
import { useAuth } from '@hooks/useAuth'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { POST } from '@config/fetcher/Post'
import { ConfirmDialog } from '@components/ConfirmDialog'
import { IconToggleRight } from '@tabler/icons-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@components/ui/Select'
import type { IUser } from '@interfaces/models'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: IUser
}

export function UsersStatusDialog({ open, onOpenChange, currentRow }: Props) {
  const { token } = useAuth()
  const { t } = useTranslation('common') // usar el mismo namespace que el resto
  const qc = useQueryClient()
  const [selectedStatus, setSelectedStatus] = useState<IUser['status'] | ''>('')

  useEffect(() => {
    setSelectedStatus('')
  }, [currentRow])

  const { mutate: changeStatus, isLoading } = useMutation({
    mutationFn: () =>
      POST(
        `${import.meta.env.VITE_API_URL}/manager/users/change_status`,
        { user: { user_id: Number(currentRow.id), status: selectedStatus } },
        token
      ),
    onSuccess: () => {
      qc.invalidateQueries(['users', token])
      toast.success(t('translation.management.user_status_dialog.success'))
      onOpenChange(false)
    },
    onError: () => {
      toast.error(t('translation.management.user_status_dialog.error'))
    },
  })

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <span className="flex items-center text-primary">
          <IconToggleRight className="mr-2" size={18} />
          {t('translation.management.user_status_dialog.title')}
        </span>
      }
      desc={t('translation.management.user_status_dialog.description', { name: currentRow.name })}
      cancelBtnText={t('translation.common.cancel')}
      confirmText={isLoading ? t('translation.common.processing') : t('translation.common.confirm')}
      disabled={!selectedStatus}
      handleConfirm={() => changeStatus()}
      isLoading={isLoading}
    >
      <div className="mt-2 space-y-1">
        <Select
          value={selectedStatus}
          onValueChange={(v) => setSelectedStatus(v as IUser['status'])}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('translation.management.user_status_dialog.select_placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">{t('translation.management.user_status_dialog.options.active')}</SelectItem>
            <SelectItem value="inactive">{t('translation.management.user_status_dialog.options.inactive')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </ConfirmDialog>
  )
}