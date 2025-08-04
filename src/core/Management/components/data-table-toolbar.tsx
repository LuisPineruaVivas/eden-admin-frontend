import React from 'react'
import { Input } from '@/components/ui/Input'
import type { Table } from '@tanstack/react-table'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  // obtenemos el valor actual del filtro sobre la columna "email"
  const emailFilter = (table.getColumn('email')?.getFilterValue() as string) ?? ''

  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder="Buscar por email..."
        value={emailFilter}
        onChange={e =>
          table.getColumn('email')?.setFilterValue(e.target.value || undefined)
        }
        className="max-w-sm"
      />
      {/* aquí podrías tener botones de export, refrescar, etc. */}
    </div>
  )
}