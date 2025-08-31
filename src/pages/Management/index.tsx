import { useState } from "react"
// import { Button } from "@components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/Card"
import { Badge } from "@components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/Avatar"
import { Progress } from "@components/ui/Progress"
import { Users, TrendingUp, FileCheck, FileX, Clock, DollarSign, Building2 } from "lucide-react"
import { useTranslation } from "react-i18next"

interface Group {
  id: string
  name: string
  totalEarnings: number
  completedContracts: number
  brokenContracts: number
  pendingContracts: number
  performance: number
}

interface RecentUser {
  id: string
  name: string
  email: string
  avatar: string
  joinDate: string
  performance: number
}

const SummaryManagement = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const { t } = useTranslation("common")

  // Mock data
  const groups: Group[] = [
    {
      id: "1",
      name: "Equipo Alpha",
      totalEarnings: 125000,
      completedContracts: 45,
      brokenContracts: 3,
      pendingContracts: 8,
      performance: 92,
    },
    {
      id: "2",
      name: "Equipo Beta",
      totalEarnings: 98500,
      completedContracts: 38,
      brokenContracts: 5,
      pendingContracts: 12,
      performance: 85,
    },
    {
      id: "3",
      name: "Equipo Gamma",
      totalEarnings: 87200,
      completedContracts: 32,
      brokenContracts: 2,
      pendingContracts: 6,
      performance: 94,
    },
    {
      id: "4",
      name: "Equipo Delta",
      totalEarnings: 76800,
      completedContracts: 28,
      brokenContracts: 7,
      pendingContracts: 15,
      performance: 78,
    },
  ]

  const recentUsers: RecentUser[] = [
    {
      id: "1",
      name: "María González",
      email: "maria.gonzalez@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
      joinDate: "Hace 2 días",
      performance: 95,
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
      joinDate: "Hace 3 días",
      performance: 88,
    },
    {
      id: "3",
      name: "Ana Martínez",
      email: "ana.martinez@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
      joinDate: "Hace 5 días",
      performance: 92,
    },
    {
      id: "4",
      name: "Luis Fernández",
      email: "luis.fernandez@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
      joinDate: "Hace 1 semana",
      performance: 87,
    },
  ]

  const monthlyData = [
    { month: "Ene", users: 45 },
    { month: "Feb", users: 52 },
    { month: "Mar", users: 38 },
    { month: "Abr", users: 67 },
    { month: "May", users: 49 },
    { month: "Jun", users: 58 },
    { month: "Jul", users: 73 },
    { month: "Ago", users: 41 },
    { month: "Sep", users: 62 },
    { month: "Oct", users: 55 },
    { month: "Nov", users: 69 },
    { month: "Dic", users: 84 },
  ]

  const maxUsers = Math.max(...monthlyData.map((d) => d.users))

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header */}
      

      {/* Main Content */}
      <main className="flex-1">
        {/* Metrics Cards */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">{t(`translation.management.managementSummary.newUsers`)}</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+247</div>
              <p className="text-xs">+18.2% {t(`translation.management.managementSummary.sinceLastMonth`)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t(`translation.management.managementSummary.totalIncome`)}</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(387500)}</div>
              <p className="text-xs">+12.5% {t(`translation.management.managementSummary.sinceLastMonth`)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t(`translation.management.managementSummary.completedContracts`)}</CardTitle>
              <FileCheck className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">143</div>
              <p className="text-xs">+8.1% {t(`translation.management.managementSummary.sinceLastMonth`)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t(`translation.management.managementSummary.averagePerformance`)}</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.3%</div>
              <p className="text-xs">+3.2% {t(`translation.management.managementSummary.sinceLastMonth`)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Chart Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t('translation.management.managementSummary.newUsersByMonth')}</CardTitle>
              <CardDescription>{t('translation.management.managementSummary.newUsersByMonthDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-end justify-between space-x-2">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                    <div
                      className="w-full bg-gray-900 rounded-t-sm transition-all hover:bg-gray-700"
                      style={{
                        height: `${(data.users / maxUsers) * 250}px`,
                        minHeight: "20px",
                      }}
                    />
                    <span className="text-xs text-gray-500">{data.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>{t(`translation.management.managementSummary.recentUsers`)}</CardTitle>
              <CardDescription>
                {t(`translation.management.managementSummary.recentUsersDescription`)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs truncate">{user.email}</p>
                    <p className="text-xs">{user.joinDate}</p>
                  </div>
                  <Badge variant={user.performance >= 90 ? "default" : "secondary"}>
                    {user.performance}%
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Groups Performance */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>{t(`translation.management.managementSummary.teamsPerformance`)}</span>
            </CardTitle>
            <CardDescription>
              {t(`translation.management.managementSummary.teamsPerformanceDescription`)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {groups.map((group) => (
                <div key={group.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{group.name}</h3>
                    <Badge
                      variant={
                        group.performance >= 90
                          ? "default"
                          : group.performance >= 80
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {group.performance}% {t(`translation.management.managementSummary.performance`)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{formatCurrency(group.totalEarnings)}</div>
                      <div className="text-sm">{t(`translation.management.managementSummary.totalProfit`)}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold flex items-center justify-center">
                        <FileCheck className="w-5 h-5 mr-1" />
                        {group.completedContracts}
                      </div>
                      <div className="text-sm">{t(`translation.management.managementSummary.completed`)}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold flex items-center justify-center">
                        <FileX className="w-5 h-5 mr-1" />
                        {group.brokenContracts}
                      </div>
                      <div className="text-sm">{t(`translation.management.managementSummary.broken`)}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold flex items-center justify-center">
                        <Clock className="w-5 h-5 mr-1" />
                        {group.pendingContracts}
                      </div>
                      <div className="text-sm">{t(`translation.management.managementSummary.pending`)}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t(`translation.management.managementSummary.performanceProgress`)}</span>
                      <span>{group.performance}%</span>
                    </div>
                    <Progress value={group.performance} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default SummaryManagement
