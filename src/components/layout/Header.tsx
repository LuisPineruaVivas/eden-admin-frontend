//// filepath: src/components/layout/header.tsx
import { cn } from '@lib/utils'
import { Sun, Moon} from 'lucide-react'
import { Search } from '@components/Search'
import { useEffect, useState } from 'react'
import { Button } from '@components/ui/Button'
import { Separator } from '@components/ui/Separator'
import { LanguageSwitcher } from './LanguageSwitcher'
import { SidebarTrigger } from '@components/ui/Sidebar'
import { useTheme } from '@config/providers/ThemeProvider'
import { ProfileDropdown } from '@components/ProfileDropdown'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}

export const Header = ({
  className,
  fixed,
  children,
  ...props
}: HeaderProps) => {
  const [offset, setOffset] = useState(0)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }

    document.addEventListener('scroll', onScroll, { passive: true })
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'bg-background flex h-16 items-center gap-3 p-4 sm:gap-4',
        fixed && 'header-fixed peer/header fixed z-50 w-[inherit] rounded-md',
        offset > 10 && fixed ? 'shadow-sm' : 'shadow-none',
        className
      )}
      {...props}
    >

      <SidebarTrigger variant='outline' className='scale-125 sm:scale-100 cursor-pointer' />
      <Separator orientation='vertical' className='h-6' />

      <div className="flex items-center gap-2">
        {/* theme switch */}


        {/* command menu */}
        <Search />
      </div>

      <Separator orientation='vertical' className='h-6' />
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="cursor-pointer">
          {theme === 'light' ? <Moon /> : <Sun />}
        </Button>
        <LanguageSwitcher />
      <div className="ml-auto">
        <ProfileDropdown />

      </div>
      {children}
    </header>
  )
}

Header.displayName = 'Header'