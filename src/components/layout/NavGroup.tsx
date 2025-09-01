import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@config/store'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/Collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@components/ui/Sidebar'
import { Badge } from '@components/ui/Badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/DropdownMenu'
import {
  NavCollapsible,
  NavItem,
  NavLink,
  NavGroup as NavGroupType,
} from './types'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function NavGroup({
  title,
  items,
  requiredPermission,
}: NavGroupType) {
  const { t } = useTranslation("common");
  const { state, isMobile } = useSidebar()
  const location = useLocation()
  const href = location.pathname + location.search

  // Obtener el usuario y sus permisos
  const user = useSelector((state: RootState) => state.user.user)
  const hasPermission = (perm?: string): boolean => {
    if (!perm) return true
    if (!user || !user.permissions) return false
    const roleKey = user.role.toLowerCase()
    return ((user.permissions as Record<string, string[]>)[roleKey] || []).includes(perm)
  }

  // Si el grupo requiere un permiso y el usuario no lo tiene, no renderizar nada
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t(`translation.sidebar.${title}`)}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => {
          // Filtrar ítems sin permiso
          if (!hasPermission(item.requiredPermission)) return null

          // Si tiene sub-items, filtrarlos
          if (item.items) {
            const visibleSub = item.items.filter((s) =>
              hasPermission(s.requiredPermission),
            )
            if (!visibleSub.length) return null

            return state === 'collapsed' && !isMobile ? (
              <SidebarMenuCollapsedDropdown
                key={item.url}
                item={{ ...item, items: visibleSub }}
                href={href}
                t={t}
              />
            ) : (
              <SidebarMenuCollapsible
                key={item.url}
                item={{ ...item, items: visibleSub }}
                href={href}
                t={t}
              />
            )
          }

          // Ítem sin sub-items
          return (
            <SidebarMenuLink key={index} item={item as NavLink} href={href} t={t} />
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

const NavBadge = ({ children }: { children: React.ReactNode }) => (
  <Badge className="rounded-full px-1 py-0 text-xs">{children}</Badge>
)

const SidebarMenuLink = ({
  item,
  href,
  t
}: {
  item: NavLink
  href: string
  t: (key: string) => string
}) => {
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={checkIsActive(href, item)}
        tooltip={item.title}
      >
        <Link to={item.url} onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span>{t(`translation.sidebar.${item.title}`)}</span>
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

const SidebarMenuCollapsible = ({
  item,
  href,
  t
}: {
  item: NavCollapsible
  href: string
  t: (key: string) => string
}) => {
  const { setOpenMobile } = useSidebar()
  const navigate = useNavigate()
  return (
    <Collapsible
      asChild
      defaultOpen={checkIsActive(href, item, true)}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            onClick={() => navigate(String(item.url))}
            tooltip={item.title}
          >
            {item.icon && <item.icon />}
            <span>{t(`translation.sidebar.${item.title}`)}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub>
            {item.items.map((sub, index) => (
              <SidebarMenuSubItem key={index}>
                <SidebarMenuSubButton
                  asChild
                  isActive={checkIsActive(href, sub)}
                >
                  <Link to={sub.url} onClick={() => setOpenMobile(false)}>
                    {sub.icon && <sub.icon />}
                    <span>{t(`translation.sidebar.${sub.title}`)}</span>
                    {sub.badge && <NavBadge>{sub.badge}</NavBadge>}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

const SidebarMenuCollapsedDropdown = ({
  item,
  href,
  t
}: {
  item: NavCollapsible
  href: string
  t: (key: string) => string
}) => {
  const navigate = useNavigate()
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            onClick={() => navigate(String(item.url))}
            tooltip={item.title}
            isActive={checkIsActive(href, item)}
          >
            {item.icon && <item.icon />}
            <span>{t(`translation.sidebar.${item.title}`)}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" sideOffset={4}>
          <DropdownMenuLabel>
            {t(`translation.sidebar.${item.title}`)} {item.badge ? `(${item.badge})` : ''}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items.map((sub, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link
                to={sub.url}
                className={checkIsActive(href, sub) ? 'bg-secondary' : ''}
              >
                {sub.icon && <sub.icon />}
                <span>{t(`translation.sidebar.${sub.title}`)}</span>
                {sub.badge && <span className="ml-auto text-xs">{sub.badge}</span>}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

function checkIsActive(
  href: string,
  item: NavItem,
  mainNav = false,
): boolean {
  const hrefSegment = href.split('/')[1] || ''
  const itemSegment =
    typeof item.url === 'string'
      ? item.url.split('/')[1]
      : item.url?.pathname?.split('/')[1] ?? ''
  return (
    href === item.url ||
    href.split('?')[0] === item.url ||
    !!item.items?.some((i) => i.url === href) ||
    (mainNav && hrefSegment !== '' && hrefSegment === itemSegment)
  )
}