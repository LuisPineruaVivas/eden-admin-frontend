import { IconUsersGroup, IconFilter } from '@tabler/icons-react'
import { Button } from '@components/ui/Button'

export function GroupsPrimaryButtons() {
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => console.log('Agregar grupo')}>
        <span>Agregar grupo</span> <IconUsersGroup size={18} />
      </Button>
      <Button variant="outline" className='space-x-1' onClick={() => console.log('Filtrar')}>
        <span>Filtrar</span> <IconFilter size={18} />
      </Button>
    </div>
  )
}
