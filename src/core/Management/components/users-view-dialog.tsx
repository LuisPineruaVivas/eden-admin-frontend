import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@components/ui/Dialog'
import { Button } from '@components/ui/Button'
import { useQuery } from '@tanstack/react-query'
import { GET } from '@config/fetcher/Get'
import { useSelector } from 'react-redux'
import { User as UserIcon } from 'lucide-react'
import type { RootState } from '@config/store'
import type { IUser } from '@interfaces/models'
import type { AxiosResponse } from 'axios'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: IUser
}

interface IUserDetail extends IUser {
  phone: string
  national_id: string
  identity: string
}

export function UsersViewDialog({ open, onOpenChange, currentRow }: Props) {
  const token = useSelector((state: RootState) => state.user.token)

  const { data: response, isLoading, isError, error } = useQuery<
    AxiosResponse<{ user: IUserDetail }>
  >({
    queryKey: ['user', token, currentRow.id],
    queryFn: () =>
      GET<{ user: IUserDetail }>(
        `${import.meta.env.VITE_API_URL}/manager/users/${currentRow.id}`,
        token
      ),
    enabled: open,
  })

  const user = response?.data.user

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center space-y-2">
          <div className="text-primary">
            <UserIcon className="h-8 w-8" />
          </div>
          <DialogTitle className="text-lg font-semibold">View User</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            Details for <span className="font-semibold">{currentRow.name}</span>
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div className="text-red-500">Error: {(error as Error).message}</div>
        ) : user ? (
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 py-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-muted-foreground">Name</dt>
              <dd className="mt-1">{user.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Email</dt>
              <dd className="mt-1">{user.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Phone</dt>
              <dd className="mt-1">{user.phone}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">National ID</dt>
              <dd className="mt-1">{user.national_id}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Identity</dt>
              <dd className="mt-1 capitalize">{user.identity}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Role</dt>
              <dd className="mt-1 capitalize">{user.role}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Status</dt>
              <dd className="mt-1 capitalize">{user.status}</dd>
            </div>
          </dl>
        ) : null}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}