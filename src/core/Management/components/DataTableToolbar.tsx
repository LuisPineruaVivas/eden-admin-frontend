import { Input } from '@components/ui/Input'
import type { Table } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  // obtenemos el valor actual del filtro sobre la columna "email"
  const emailFilter = (table.getColumn('email')?.getFilterValue() as string) ?? ''
  const { t } = useTranslation('common')

  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder={t('translation.management.user_list.searchByEmail')}
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