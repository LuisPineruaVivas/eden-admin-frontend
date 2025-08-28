import { useState } from 'react'
import { Input } from '@components/ui/Input'
import { Label } from '@components/ui/Label'
import { User } from '@core/Management/data/schema'
import { IconAlertTriangle } from '@tabler/icons-react'
import { ConfirmDialog } from '@components/ConfirmDialog'
import { showSubmittedData } from '@utils/ShowSubmittedData'
import { Alert, AlertDescription, AlertTitle } from '@components/ui/Alert'
import { useTranslation } from "react-i18next"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const { t } = useTranslation("common")
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (value.trim() !== currentRow.name) return

    onOpenChange(false)
    showSubmittedData(currentRow, 'The following user has been deleted:')
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.name}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='stroke-destructive mr-1 inline-block'
            size={18}
          />{' '}
          {t("translation.management.user_delete_modal.title")}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            {t("translation.management.user_delete_modal.description")}{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            {t("translation.management.user_delete_modal.message")}{' '}
            <span className='font-bold'>
              {currentRow.role.toUpperCase()}
            </span>{' '}
            {t("translation.management.user_delete_modal.message_2")}
          </p>

          <Label className='my-2'>
            {t("translation.management.user_delete_modal.username")}
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter username to confirm deletion.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>{t("translation.management.user_delete_modal.warning")}</AlertTitle>
            <AlertDescription>
              {t("translation.management.user_delete_modal.warning_description")}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={t("translation.management.user_delete_modal.delete")}
      destructive
    />
  )
}
