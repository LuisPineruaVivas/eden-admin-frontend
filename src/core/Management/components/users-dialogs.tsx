import React from 'react'
import { useUsers } from '@config/providers/UsersContext'
import { UsersActionDialog } from './users-action-dialog'
import { UsersInviteDialog } from './users-invite-dialog'
import { UsersDeleteDialog } from './users-delete-dialog'

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()

  return (
    <>
      <UsersActionDialog
        key="user-add"
        open={open === 'add'}
        onOpenChange={(isOpen) => setOpen(isOpen ? 'add' : null)}
      />

      <UsersInviteDialog
        key="user-invite"
        open={open === 'invite'}
        onOpenChange={(isOpen) => setOpen(isOpen ? 'invite' : null)}
      />

      {currentRow && (
        <>
          <UsersActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'edit' : null)
              if (!isOpen) setCurrentRow(null)
            }}
            currentRow={currentRow}
          />

          <UsersDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'delete' : null)
              if (!isOpen) setCurrentRow(null)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}