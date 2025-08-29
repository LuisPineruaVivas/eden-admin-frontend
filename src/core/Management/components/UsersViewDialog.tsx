import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@config/store'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { GET } from '@config/fetcher/Get'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@components/ui/Dialog'
import { Button } from '@components/ui/Button'
import { User as UserIcon } from 'lucide-react'
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
  const { t } = useTranslation('common')
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
          <DialogTitle className="text-lg font-semibold">
            {t('translation.management.user_view_dialog.title')}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            {t('translation.management.user_view_dialog.description', {
              name: currentRow.name,
            })}
          </DialogDescription>
        </DialogHeader>

        {isLoading && <div>{t('translation.common.loading')}…</div>}

        {isError && (
          <div className="text-destructive">
            {t('translation.common.error')}: {(error as Error).message}
          </div>
        )}

        {user && !isLoading && !isError && (
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 py-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-muted-foreground">
                {t('translation.management.user_view_dialog.fields.name')}
              </dt>
              <dd className="mt-1">{user.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">
                {t('translation.management.user_view_dialog.fields.email')}
              </dt>
              <dd className="mt-1">{user.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">
                {t('translation.management.user_view_dialog.fields.phone')}
              </dt>
              <dd className="mt-1">{user.phone}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">
                {t('translation.management.user_view_dialog.fields.national_id')}
              </dt>
              <dd className="mt-1">{user.national_id}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">
                {t('translation.management.user_view_dialog.fields.identity')}
              </dt>
              <dd className="mt-1 capitalize">{user.identity}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">
                {t('translation.management.user_view_dialog.fields.role')}
              </dt>
              <dd className="mt-1 capitalize">{user.role}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">
                {t('translation.management.user_view_dialog.fields.status')}
              </dt>
              <dd className="mt-1 capitalize">{user.status}</dd>
            </div>
          </dl>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
               {t('translation.management.user_view_dialog.fields.close')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UsersViewDialog