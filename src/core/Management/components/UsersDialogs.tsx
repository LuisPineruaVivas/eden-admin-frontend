import React from 'react'
import { useUsers } from '@config/providers/UsersContext'
import { UsersActionDialog } from './UsersActionDialog'
import { UsersDeleteDialog } from './UsersDeleteDialog'
import { UsersStatusDialog } from './UsersStatusDialog'
import { UsersViewDialog } from './UsersViewDialog'

interface UsersDialogsProps {
  pageIndex: number
  pageSize: number
  roleFilter?: string
}

export function UsersDialogs({ pageIndex, pageSize, roleFilter }: UsersDialogsProps) {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()

  return (
    <>
      {/* Add */}
      <UsersActionDialog
        key="add"
        pageIndex={pageIndex}
        pageSize={pageSize}
        roleFilter={roleFilter}
        open={open === 'add'}
        onOpenChange={(isOpen) => {
          setOpen(isOpen ? 'add' : null)
          if (!isOpen) setCurrentRow(null)
        }}
      />

      {/* Edit */}
      {currentRow && (
        <UsersActionDialog
          key={`edit-${currentRow.id}`}
          currentRow={currentRow}
          pageIndex={pageIndex}
          pageSize={pageSize}
          roleFilter={roleFilter}
          open={open === 'edit'}
          onOpenChange={(isOpen) => {
            setOpen(isOpen ? 'edit' : null)
            if (!isOpen) setCurrentRow(null)
          }}
        />
      )}

      {/* Delete */}
      {currentRow && (
        <UsersDeleteDialog
          key={`delete-${currentRow.id}`}
          currentRow={currentRow}
          open={open === 'delete'}
          onOpenChange={(isOpen) => {
            setOpen(isOpen ? 'delete' : null)
            if (!isOpen) setCurrentRow(null)
          }}
        />
      )}

      {/* Status */}
      {currentRow && (
        <UsersStatusDialog
          key={`status-${currentRow.id}`}
          currentRow={currentRow}
          open={open === 'status'}
          onOpenChange={(isOpen) => {
            setOpen(isOpen ? 'status' : null)
            if (!isOpen) setCurrentRow(null)
          }}
        />
      )}

      {/* View */}
      {currentRow && (
        <UsersViewDialog
          key={`view-${currentRow.id}`}
          currentRow={currentRow}
          open={open === 'view'}
          onOpenChange={(isOpen) => {
            setOpen(isOpen ? 'view' : null)
            if (!isOpen) setCurrentRow(null)
          }}
        />
      )}
    </>
  )
}