import { useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Delete } from '@config/fetcher/Delete'
import { ConfirmDialog } from '@components/ConfirmDialog'
import { IconAlertTriangle } from '@tabler/icons-react'
import type { RootState } from '@config/store'
import type { User } from '@core/Management/data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const token = useSelector((state: RootState) => state.user.token)
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    try {
      await Delete(
        `${import.meta.env.VITE_API_URL}/manager/users/${currentRow.id}`,
        token
      )
      toast.success('User deleted successfully')
      queryClient.invalidateQueries(['users', token])
      onOpenChange(false)
    } catch (error) {
      console.error(error)
      toast.error('Error deleting user')
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <span className="flex items-center text-destructive">
          <IconAlertTriangle className="mr-2" size={18} /> Delete User
        </span>
      }
      desc={
        <>Are you sure you want to delete <strong>{currentRow.username}</strong>? This action cannot be undone.</>
      }
      cancelBtnText="Cancel"
      confirmText="Confirm"
      destructive
      handleConfirm={handleDelete}
    />
  )
}