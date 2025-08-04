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

export function NavGroup({
  title,
  items,
  requiredPermission,
}: NavGroupType) {
  const { state, isMobile } = useSidebar()
  const location = useLocation()
  const href = location.pathname + location.search

  // Obtener el usuario y sus permisos
  const user = useSelector((state: RootState) => state.user.user)
  const hasPermission = (perm?: string): boolean => {
    if (!perm) return true
    if (!user || !user.permissions) return false
    const roleKey = user.role.toLowerCase()
    return (user.permissions[roleKey] || []).includes(perm)
  }

  // Si el grupo requiere un permiso y el usuario no lo tiene, no renderizar nada
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
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
              />
            ) : (
              <SidebarMenuCollapsible
                key={item.url}
                item={{ ...item, items: visibleSub }}
                href={href}
              />
            )
          }

          // Ítem sin sub-items
          return (
            <SidebarMenuLink key={item.url} item={item as NavLink} href={href} />
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
}: {
  item: NavLink
  href: string
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
          <span>{item.title}</span>
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

const SidebarMenuCollapsible = ({
  item,
  href,
}: {
  item: NavCollapsible
  href: string
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
            onClick={() => navigate(item.url)}
            tooltip={item.title}
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub>
            {item.items.map((sub) => (
              <SidebarMenuSubItem key={sub.url}>
                <SidebarMenuSubButton
                  asChild
                  isActive={checkIsActive(href, sub)}
                >
                  <Link to={sub.url} onClick={() => setOpenMobile(false)}>
                    {sub.icon && <sub.icon />}
                    <span>{sub.title}</span>
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
}: {
  item: NavCollapsible
  href: string
}) => {
  const navigate = useNavigate()
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            onClick={() => navigate(item.url)}
            tooltip={item.title}
            isActive={checkIsActive(href, item)}
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" sideOffset={4}>
          <DropdownMenuLabel>
            {item.title} {item.badge ? `(${item.badge})` : ''}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items.map((sub) => (
            <DropdownMenuItem key={sub.url} asChild>
              <Link
                to={sub.url}
                className={checkIsActive(href, sub) ? 'bg-secondary' : ''}
              >
                {sub.icon && <sub.icon />}
                <span>{sub.title}</span>
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