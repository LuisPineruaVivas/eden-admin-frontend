import { IconUserPlus } from '@tabler/icons-react'
import { Button } from '@components/ui/Button'
import { useUsers } from '@config/providers/UsersContext'
import { useTranslation } from 'react-i18next'

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers()
  const { t } = useTranslation('common')

  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>{t(`translation.management.user_list.add_user`)}</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
