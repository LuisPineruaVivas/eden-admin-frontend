import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'
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
import type { RootState } from '@config/store'
import type { IUser } from '@interfaces/models'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: IUser
}

export function UsersStatusDialog({ open, onOpenChange, currentRow }: Props) {
  const token = useSelector((state: RootState) => state.user.token)
  const queryClient = useQueryClient()
  const [selectedStatus, setSelectedStatus] = useState<IUser['status'] | ''>('')

  useEffect(() => {
    setSelectedStatus('')
  }, [currentRow])

  const handleChange = async () => {
    if (!selectedStatus) {
      toast.error('Please select a status')
      return
    }

    const url = `${import.meta.env.VITE_API_URL}/manager/users/change_status`
    const payload = {
      user: {
        user_id: Number(currentRow.id),
        status: selectedStatus,
      },
    }

    try {
      await POST(url, payload, token)
      toast.success(`Status updated to "${selectedStatus}"`)
      queryClient.invalidateQueries(['users', token])
      onOpenChange(false)
    } catch (error) {
      console.error(error)
      toast.error('Error updating status')
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <span className="flex items-center">
          <IconToggleRight className="mr-2" size={18} /> Change Status
        </span>
      }
      className="sm:max-w-sm"
      desc={
        <div className="space-y-3">
          <p className="text-sm">
            Select new status for <strong>{currentRow.username}</strong>:
          </p>
          <div className="flex items-center gap-4">
            <span className="w-20 text-right font-semibold text-sm">Status</span>
            <Select
              value={selectedStatus}
              onValueChange={(v) => setSelectedStatus(v as IUser['status'])}
              className="flex-1"
            >
              <SelectTrigger className="w-full bg-background border-input">
                <SelectValue placeholder="-- Select a status --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      }
      cancelBtnText="Cancel"
      confirmText="Confirm"
      disabled={!selectedStatus}
      handleConfirm={handleChange}
    />
  )
}