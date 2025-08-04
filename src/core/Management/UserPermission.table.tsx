"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"

interface Permission {
  name: string
  key_code: string
  role_id: number
  description: string
  category: string
  example: string
  usage: string
}

interface Role {
  id: number
  name: string
  color: string
  description: string
}

const PermissionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const roles: Role[] = [
    { id: 1, name: "Super Admin", color: "bg-red-100 text-red-800", description: "Acceso completo al sistema" },
    { id: 2, name: "Manager", color: "bg-blue-100 text-blue-800", description: "Gestión de equipos y usuarios" },
    {
      id: 3,
      name: "Coordinator",
      color: "bg-green-100 text-green-800",
      description: "Coordinación de clientes y contratos",
    },
    { id: 4, name: "Agent", color: "bg-yellow-100 text-yellow-800", description: "Agente de ventas básico" },
  ]

  const permissions: Permission[] = [
    // User Permissions
    {
      name: "createUsersPermission",
      key_code: "CAN_CREATE_USERS",
      role_id: 2,
      description: "Permite crear nuevos usuarios en el sistema con roles específicos y configuraciones iniciales",
      category: "Gestión de Usuarios",
      example: "user.create({ name, email, role })",
      usage: "Formularios de registro, panel de administración",
    },
    {
      name: "updateUsersPermission",
      key_code: "CAN_UPDATE_USERS",
      role_id: 2,
      description: "Permite modificar información de usuarios existentes incluyendo datos personales y configuraciones",
      category: "Gestión de Usuarios",
      example: "user.update(id, { name, email })",
      usage: "Edición de perfiles, actualización de datos",
    },
    {
      name: "destroyUsersPermission",
      key_code: "CAN_DESTROY_USERS",
      role_id: 2,
      description:
        "Permite eliminar usuarios del sistema permanentemente. Acción irreversible que requiere confirmación",
      category: "Gestión de Usuarios",
      example: "user.delete(id)",
      usage: "Limpieza de cuentas inactivas, eliminación por violaciones",
    },
    {
      name: "seeUsersPermission",
      key_code: "CAN_SEE_USERS",
      role_id: 2,
      description: "Permite visualizar la lista de usuarios y acceder a sus detalles básicos y estadísticas",
      category: "Gestión de Usuarios",
      example: "user.list(), user.show(id)",
      usage: "Listados de usuarios, búsquedas, reportes",
    },
    {
      name: "canToggleUsersPermission",
      key_code: "CAN_TOGGLE_USERS",
      role_id: 2,
      description: "Permite activar/desactivar usuarios temporalmente sin eliminar sus datos del sistema",
      category: "Gestión de Usuarios",
      example: "user.toggle(id, status)",
      usage: "Suspensiones temporales, mantenimiento de cuentas",
    },
    {
      name: "canResetUsersPermission",
      key_code: "CAN_RESET_USERS",
      role_id: 2,
      description: "Permite resetear contraseñas y configuraciones de usuario a valores por defecto",
      category: "Gestión de Usuarios",
      example: "user.resetPassword(id)",
      usage: "Recuperación de cuentas, soporte técnico",
    },
    {
      name: "canChangeStatusOfUsersPermission",
      key_code: "CAN_CHANGE_STATUS_OF_USERS",
      role_id: 2,
      description: "Permite cambiar el estado operativo de los usuarios (activo, inactivo, suspendido, etc.)",
      category: "Gestión de Usuarios",
      example: "user.changeStatus(id, 'suspended')",
      usage: "Gestión de estados, control de acceso",
    },

    // Customer Management Permissions
    {
      name: "addCustomersPermission",
      key_code: "CAN_ADD_CUSTOMERS",
      role_id: 3,
      description: "Permite agregar nuevos clientes al sistema con toda su información de contacto y comercial",
      category: "Gestión de Clientes",
      example: "customer.create({ name, email, phone })",
      usage: "Registro de prospectos, nuevos clientes",
    },
    {
      name: "seeCustomersPermission",
      key_code: "CAN_SEE_CUSTOMERS",
      role_id: 3,
      description: "Permite visualizar información completa de clientes incluyendo historial y datos de contacto",
      category: "Gestión de Clientes",
      example: "customer.list(), customer.show(id)",
      usage: "Consulta de clientes, seguimiento comercial",
    },
    {
      name: "seeCustomersPaymentsPermission",
      key_code: "CAN_SEE_CUSTOMERS_PAYMENTS",
      role_id: 3,
      description: "Permite acceder al historial completo de pagos y transacciones financieras de los clientes",
      category: "Gestión de Clientes",
      example: "customer.payments(id)",
      usage: "Seguimiento de pagos, análisis financiero",
    },
    {
      name: "seeCustomersContractsPermission",
      key_code: "CAN_SEE_CUSTOMERS_CONTRACTS",
      role_id: 3,
      description: "Permite visualizar todos los contratos asociados a un cliente específico",
      category: "Gestión de Clientes",
      example: "customer.contracts(id)",
      usage: "Revisión de contratos, seguimiento comercial",
    },
    {
      name: "manageCustomersPermission",
      key_code: "CAN_MANAGE_CUSTOMERS",
      role_id: 2,
      description: "Permite gestión completa de clientes: crear, editar, eliminar y administrar toda su información",
      category: "Gestión de Clientes",
      example: "customer.manage(id, action)",
      usage: "Administración completa de cartera de clientes",
    },
    {
      name: "updateCustomersPermission",
      key_code: "CAN_UPDATE_CUSTOMERS",
      role_id: 2,
      description: "Permite modificar información existente de clientes incluyendo datos de contacto y comerciales",
      category: "Gestión de Clientes",
      example: "customer.update(id, data)",
      usage: "Actualización de datos, corrección de información",
    },
    {
      name: "destroyCustomersPermission",
      key_code: "CAN_DESTROY_CUSTOMERS",
      role_id: 2,
      description: "Permite eliminar clientes del sistema de forma permanente junto con su historial",
      category: "Gestión de Clientes",
      example: "customer.delete(id)",
      usage: "Limpieza de base de datos, eliminación por GDPR",
    },
    {
      name: "toggleCustomersPermission",
      key_code: "CAN_TOGGLE_CUSTOMERS",
      role_id: 2,
      description: "Permite activar/desactivar clientes temporalmente manteniendo su información",
      category: "Gestión de Clientes",
      example: "customer.toggle(id, status)",
      usage: "Suspensión temporal, gestión de estados",
    },

    // Customer Contracts Permissions
    {
      name: "manageCustomersContractsPermission",
      key_code: "CAN_MANAGE_CUSTOMERS_CONTRACTS",
      role_id: 2,
      description: "Permite gestión completa de contratos: creación, modificación, seguimiento y cierre",
      category: "Gestión de Contratos",
      example: "contract.manage(id, action)",
      usage: "Administración completa de contratos",
    },
    {
      name: "updateCustomersContractsPermission",
      key_code: "CAN_UPDATE_CUSTOMERS_CONTRACTS",
      role_id: 2,
      description: "Permite modificar términos, condiciones y estado de contratos existentes",
      category: "Gestión de Contratos",
      example: "contract.update(id, terms)",
      usage: "Modificación de contratos, actualizaciones",
    },
    {
      name: "destroyCustomersContractsPermission",
      key_code: "CAN_DESTROY_CUSTOMERS_CONTRACTS",
      role_id: 2,
      description: "Permite eliminar contratos del sistema de forma permanente",
      category: "Gestión de Contratos",
      example: "contract.delete(id)",
      usage: "Eliminación de contratos cancelados o erróneos",
    },

    // Selling Force Groups Permissions
    {
      name: "seeItsSellingForceGroupsPermission",
      key_code: "SEE_ITS_SELLINGS_FORCE_GROUP",
      role_id: 3,
      description: "Permite ver únicamente los grupos de fuerza de ventas a los que está asignado el usuario",
      category: "Equipos de Ventas",
      example: "groups.myGroups(userId)",
      usage: "Vista de equipos propios, coordinación interna",
    },
    {
      name: "requestUsersToItsSellingForceGroupsPermission",
      key_code: "REQUEST_USERS_TO_ITS_SELLINGS_FORCE_GROUP",
      role_id: 3,
      description: "Permite solicitar la asignación de usuarios específicos a los grupos bajo su coordinación",
      category: "Equipos de Ventas",
      example: "groups.requestUser(groupId, userId)",
      usage: "Solicitudes de personal, formación de equipos",
    },
    {
      name: "seeSellingForceGroupsPermission",
      key_code: "CAN_SEE_SELLINGS_FORCE_GROUPS",
      role_id: 2,
      description: "Permite visualizar todos los grupos de fuerza de ventas existentes en la organización",
      category: "Equipos de Ventas",
      example: "groups.list(), groups.show(id)",
      usage: "Supervisión general, reportes organizacionales",
    },
    {
      name: "manageSellingForceGroupsPermission",
      key_code: "MANAGE_SELLINGS_FORCE_GROUPS",
      role_id: 2,
      description: "Permite gestión completa de grupos: crear, modificar, asignar personal y establecer objetivos",
      category: "Equipos de Ventas",
      example: "groups.manage(id, config)",
      usage: "Administración completa de equipos de ventas",
    },
    {
      name: "updateSellingForceGroupsPermission",
      key_code: "CAN_UPDATE_SELLINGS_FORCE_GROUPS",
      role_id: 2,
      description: "Permite modificar configuración, objetivos y composición de grupos de ventas existentes",
      category: "Equipos de Ventas",
      example: "groups.update(id, settings)",
      usage: "Ajustes de equipos, cambios organizacionales",
    },
    {
      name: "createSellingForceGroupsPermission",
      key_code: "CAN_CREATE_SELLINGS_FORCE_GROUPS",
      role_id: 2,
      description: "Permite crear nuevos grupos de fuerza de ventas con configuraciones específicas",
      category: "Equipos de Ventas",
      example: "groups.create({ name, config })",
      usage: "Expansión de equipos, nuevas divisiones",
    },
    {
      name: "destroySellingForceGroupsPermission",
      key_code: "CAN_DESTROY_SELLINGS_FORCE_GROUPS",
      role_id: 2,
      description: "Permite eliminar grupos de fuerza de ventas y reasignar su personal",
      category: "Equipos de Ventas",
      example: "groups.delete(id)",
      usage: "Reestructuración organizacional, cierre de divisiones",
    },
  ]

  const categories = ["all", ...Array.from(new Set(permissions.map((p) => p.category)))]

  const filteredPermissions = permissions.filter((permission) => {
    const matchesSearch =
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.key_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || permission.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getRoleById = (roleId: number) => {
    return roles.find((role) => role.id === roleId)
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al Dashboard</span>
          </Link>
          <div className="h-6 w-px bg-gray-300" />
          <div>
            <div className="text-sm text-gray-500">Sistema / Permisos</div>
            <h1 className="text-2xl font-bold">Permisos</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Introduction */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Permisos del Sistema</h2>
          <p className="text-gray-600 mb-6">
            Sistema de control de acceso basado en roles. Cada permiso define una acción específica que puede realizar
            un usuario según su rol asignado.
          </p>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar permisos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "Todos" : category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions Table */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-48">Nombre</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-32">Tipo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Descripción</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-48">Ejemplo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-32">Rol</th>
                </tr>
              </thead>
              <tbody>
                {filteredPermissions.map((permission, index) => {
                  const role = getRoleById(permission.role_id)
                  return (
                    <tr key={permission.key_code} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-4 px-4 border-b">
                        <div className="font-mono text-sm text-blue-600 font-medium">{permission.name}</div>
                      </td>
                      <td className="py-4 px-4 border-b">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                          {permission.key_code}
                        </code>
                      </td>
                      <td className="py-4 px-4 border-b">
                        <div className="text-sm text-gray-700 leading-relaxed">{permission.description}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          <strong>Uso:</strong> {permission.usage}
                        </div>
                      </td>
                      <td className="py-4 px-4 border-b">
                        <code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded block">
                          {permission.example}
                        </code>
                      </td>
                      <td className="py-4 px-4 border-b">
                        {role && <Badge className={`${role.color} border-0`}>{role.name}</Badge>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredPermissions.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron permisos</h3>
            <p className="text-gray-500">Intenta ajustar los filtros o el término de búsqueda.</p>
          </div>
        )}

        {/* Examples Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Permisos por Rol (Ejemplos)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Admin */}
            <div>
              <h3 className="text-lg font-medium mb-2">
          <Badge className="bg-red-100 text-red-800 border-0">Admin</Badge>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <code className="bg-gray-100 px-1 rounded">CAN_CREATE_USERS</code> – Crear usuarios
          </li>
          <li>
            <code className="bg-gray-100 px-1 rounded">CAN_UPDATE_USERS</code> – Editar usuarios
          </li>
          <li>
            <code className="bg-gray-100 px-1 rounded">CAN_MANAGE_CUSTOMERS</code> – Gestión completa de clientes
          </li>
          <li>
            <code className="bg-gray-100 px-1 rounded">MANAGE_SELLINGS_FORCE_GROUPS</code> – Administrar grupos de ventas
          </li>
              </ul>
            </div>

            {/* Manager */}
            <div>
              <h3 className="text-lg font-medium mb-2">
          <Badge className="bg-blue-100 text-blue-800 border-0">Manager</Badge>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <code className="bg-gray-100 px-1 rounded">CAN_CREATE_USERS</code> – Crear usuarios
          </li>
          <li>
            <code className="bg-gray-100 px-1 rounded">CAN_UPDATE_USERS</code> – Editar usuarios
          </li>
          <li>
            <code className="bg-gray-100 px-1 rounded">CAN_MANAGE_CUSTOMERS</code> – Gestión de clientes
          </li>
          <li>
            <code className="bg-gray-100 px-1 rounded">CAN_SEE_SELLINGS_FORCE_GROUPS</code> – Ver todos los grupos de ventas
          </li>
              </ul>
            </div>

            {/* Analyst */}
            <div>
              <h3 className="text-lg font-medium mb-2">
          <Badge className="bg-purple-100 text-purple-800 border-0">Analyst</Badge>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <code className="bg-gray-100 px-1 rounded">CAN_SEE_USERS</code> – Ver lista de usuarios
          </li>
          <li>
            <code className="bg-gray-100 px-1 rounded">CAN_SEE_CUSTOMERS</code> – Ver información de clientes
          </li>
          <li>
            <code className="bg-gray-100 px-1 rounded">CAN_SEE_CUSTOMERS_PAYMENTS</code> – Ver historial de pagos
          </li>
              </ul>
            </div>

            {/* Coordinator */}
            <div>
              <h3 className="text-lg font-medium mb-2">
          <Badge className="bg-green-100 text-green-800 border-0">Coordinator</Badge>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <code className="bg-gray-100 px-1 rounded">CAN_ADD_CUSTOMERS</code> – Agregar nuevos clientes
          </li>
          <li>
            <code className="bg-gray-100 px-1 rounded">REQUEST_USERS_TO_ITS_SELLINGS_FORCE_GROUP</code> – Solicitar usuarios a grupos
          </li>
              </ul>
            </div>

            {/* Seller */}
            <div>
              <h3 className="text-lg font-medium mb-2">
          <Badge className="bg-yellow-100 text-yellow-800 border-0">Seller</Badge>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <code className="bg-gray-100 px-1 rounded">SEE_ITS_SELLINGS_FORCE_GROUP</code> – Ver sus grupos de ventas
          </li>
              </ul>
            </div>

            {/* Customer */}
            <div>
              <h3 className="text-lg font-medium mb-2">
          <Badge className="bg-gray-100 text-gray-800 border-0">Customer</Badge>
              </h3>
              <p className="text-sm text-gray-600">Este rol no tiene permisos de ejemplo asignados.</p>
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}

export default PermissionsPage
