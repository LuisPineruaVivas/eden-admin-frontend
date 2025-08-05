import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/Card"
import { Button } from "@components/ui/Button"
import { Badge } from "@components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/Avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@components/ui/Chart"
import { AreaChart, Area, XAxis, CartesianGrid, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import {
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Eye,
  Activity,
  FileText,
} from "lucide-react"
import { faker } from "@faker-js/faker"
import { ResponsiveContainer } from "recharts"
import { useTranslation } from "react-i18next"

const DashboardSummary = () => {
  const { t } = useTranslation("common")
  const [activeTab, setActiveTab] = useState("overview")

  // Generate comprehensive mock data
  const generateOverviewData = () => ({
    metrics: [
      {
        title: t("translation.dashboardSummary.newSubscriptions"),
        value: "4,682",
        subtitle: t("translation.dashboardSummary.sinceLastWeek"),
        change: "+15.54%",
        trend: "up",
        chartData: Array.from({ length: 7 }, (_, i) => ({
          point: i,
          value: faker.number.int({ min: 15, max: 55 }),
        })),
      },
      {
        title: t("translation.dashboardSummary.newOrders"),
        value: "1,226",
        subtitle: t("translation.dashboardSummary.sinceLastWeek"),
        change: "-40.2%",
        trend: "down",
        chartData: Array.from({ length: 7 }, (_, i) => ({
          point: i,
          value: faker.number.int({ min: 10, max: 50 }),
        })),
      },
      {
        title: t("translation.dashboardSummary.avgOrderRevenue"),
        value: "1,080",
        subtitle: t("translation.dashboardSummary.sinceLastWeek"),
        change: "+10.8%",
        trend: "up",
        chartData: Array.from({ length: 7 }, (_, i) => ({
          point: i,
          value: faker.number.int({ min: 20, max: 60 }),
        })),
      },
    ],
    totalRevenue: {
      value: "$15,231.89",
      change: "+20.1% from last month",
      chartData: Array.from({ length: 10 }, (_, i) => ({
        point: i,
        value: faker.number.int({ min: 14000, max: 16000 }),
      })),
    },
    salesActivity: Array.from({ length: 6 }, (_, i) => {
      const baseRevenue = 35000 + i * 2000 + faker.number.int({ min: -3000, max: 5000 })
      const baseSales = baseRevenue * 0.7 + faker.number.int({ min: -2000, max: 3000 })
      return {
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
        sales: Math.max(baseSales, 15000),
        revenue: Math.max(baseRevenue, 25000),
      }
    }),
    subscriptions: {
      value: "+2350",
      change: "+180.1% from last month",
      chartData: Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2024, i).toLocaleDateString("en", { month: "short" }),
        value: faker.number.int({ min: 150, max: 420 }),
      })),
    },
    teamMembers: Array.from({ length: 5 }, (_, i) => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: i === 1 ? t("translation.dashboardSummary.owner") : t("translation.dashboardSummary.member"),
      avatar: `/placeholder.svg?height=32&width=32`,
    })),
    payments: Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      status: [t("translation.dashboardSummary.status.success"), t("translation.dashboardSummary.status.success"), t("translation.dashboardSummary.status.processing"), t("translation.dashboardSummary.status.failed")][i],
      email: faker.internet.email(),
      amount: `$${faker.number.int({ min: 200, max: 900 })}.00`,
    })),
  })

  const generateAnalyticsData = () => ({
    userGrowth: Array.from({ length: 12 }, (_, i) => {
      const baseUsers = 2000 + i * 200 + faker.number.int({ min: -300, max: 800 })
      const activeUsers = baseUsers * 0.75 + faker.number.int({ min: -200, max: 400 })
      return {
        month: new Date(2024, i).toLocaleDateString("en", { month: "short" }),
        users: Math.max(baseUsers, 1000),
        activeUsers: Math.max(activeUsers, 800),
      }
    }),
    conversionRates: [
      { source: "Organic Search", rate: faker.number.int({ min: 15, max: 35 }), color: "hsl(142, 76%, 36%)" },
      { source: "Social Media", rate: faker.number.int({ min: 10, max: 25 }), color: "hsl(221, 83%, 53%)" },
      { source: "Email Marketing", rate: faker.number.int({ min: 20, max: 40 }), color: "hsl(48, 96%, 53%)" },
      { source: "Direct Traffic", rate: faker.number.int({ min: 5, max: 20 }), color: "hsl(346, 77%, 49%)" },
    ],
    topProducts: Array.from({ length: 5 }, () => ({
      name: faker.commerce.productName(),
      sales: faker.number.int({ min: 100, max: 1000 }),
      revenue: faker.number.int({ min: 5000, max: 50000 }),
    })),
    deviceStats: [
      { device: "Desktop", users: faker.number.int({ min: 2000, max: 4000 }), fill: "hsl(142, 76%, 36%)" },
      { device: "Mobile", users: faker.number.int({ min: 3000, max: 6000 }), fill: "hsl(221, 83%, 53%)" },
      { device: "Tablet", users: faker.number.int({ min: 500, max: 1500 }), fill: "hsl(48, 96%, 53%)" },
    ],
  })

  const generateReportsData = () => ({
    monthlyReports: Array.from({ length: 6 }, (_, i) => ({
      month: new Date(2024, i).toLocaleDateString("en", { month: "long" }),
      totalSales: faker.number.int({ min: 50000, max: 150000 }),
      orders: faker.number.int({ min: 500, max: 2000 }),
      customers: faker.number.int({ min: 300, max: 1200 }),
      avgOrderValue: faker.number.int({ min: 80, max: 200 }),
    })),
    topCustomers: Array.from({ length: 8 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      totalSpent: faker.number.int({ min: 1000, max: 10000 }),
      orders: faker.number.int({ min: 5, max: 50 }),
      lastOrder: faker.date.recent({ days: 30 }).toLocaleDateString(),
    })),
    salesByCategory: [
      { category: "Electronics", sales: faker.number.int({ min: 20000, max: 50000 }), fill: "hsl(142, 76%, 36%)" },
      { category: "Clothing", sales: faker.number.int({ min: 15000, max: 40000 }), fill: "hsl(221, 83%, 53%)" },
      { category: "Home & Garden", sales: faker.number.int({ min: 10000, max: 30000 }), fill: "hsl(48, 96%, 53%)" },
      { category: "Sports", sales: faker.number.int({ min: 8000, max: 25000 }), fill: "hsl(346, 77%, 49%)" },
      { category: "Books", sales: faker.number.int({ min: 5000, max: 20000 }), fill: "hsl(262, 83%, 58%)" },
    ],
  })

  const overviewData = generateOverviewData()
  const analyticsData = generateAnalyticsData()
  const reportsData = generateReportsData()

  const chartConfigs = {
    sales: {
      sales: { label: "Sales", color: "hsl(173, 58%, 39%)" },
      revenue: { label: "Revenue", color: "hsl(346, 77%, 49%)" },
    },
    subscriptions: {
      value: { label: "Subscriptions", color: "hsl(173, 58%, 39%)" },
    },
    revenue: {
      value: { label: "Revenue", color: "hsl(221, 83%, 53%)" },
    },
    metric: {
      value: { label: "Value", color: "hsl(346, 77%, 49%)" },
    },
    analytics: {
      users: { label: "Total Users", color: "hsl(221, 83%, 53%)" },
      activeUsers: { label: "Active Users", color: "hsl(142, 76%, 36%)" },
    },
  }

  const renderOverview = () => (
    <>
      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {overviewData.metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm">📊</span>
                <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
                <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                  <span className="text-gray-400">ℹ️</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{metric.value}</div>
              <p className="text-xs text-gray-500 mb-3">{metric.subtitle}</p>
              <div className="h-8 mb-3">
                <ChartContainer config={chartConfigs.metric} className="h-full">
                  <LineChart data={metric.chartData}>
                    <Line
                      dataKey="value"
                      type="monotone"
                      stroke={metric.trend === "up" ? "hsl(142, 76%, 36%)" : "hsl(0, 84%, 60%)"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-xs text-gray-600 h-6 px-0">
                  Details
                </Button>
                <div
                  className={`flex items-center text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                >
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Total Revenue Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("translation.dashboardSummary.totalRevenue")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{overviewData.totalRevenue.value}</div>
            <p className="text-xs text-gray-500 mb-3">{overviewData.totalRevenue.change}</p>
            <div className="h-8">
              <ChartContainer config={chartConfigs.revenue} className="h-full">
                <LineChart data={overviewData.totalRevenue.chartData}>
                  <Line dataKey="value" type="monotone" stroke="var(--color-value)" strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Sale Activity Chart - Fixed */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>{t("translation.dashboardSummary.saleActivityMonthly")}</CardTitle>
            <CardDescription>{t("translation.dashboardSummary.saleActivityDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigs.sales} className="">
              <AreaChart data={overviewData.salesActivity} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(346, 77%, 49%)" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="hsl(346, 77%, 49%)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fontSize: 12, fill: "#666" }}
                />
                <ChartTooltip cursor={{ stroke: "#ddd", strokeWidth: 1 }} content={<ChartTooltipContent />} />
                <Area
                  dataKey="sales"
                  type="natural"
                  fill="url(#salesGradient)"
                  stroke="hsl(173, 58%, 39%)"
                  strokeWidth={2}
                />
                <Area
                  dataKey="revenue"
                  type="natural"
                  fill="url(#revenueGradient)"
                  stroke="hsl(346, 77%, 49%)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Subscriptions */}
          <Card>
            <CardHeader>
              <CardTitle>{t("translation.dashboardSummary.subscriptionsLabel")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{overviewData.subscriptions.value}</div>
              <p className="text-xs text-gray-500 mb-4">{overviewData.subscriptions.change}</p>
              <ChartContainer config={chartConfigs.subscriptions} className="">
                <BarChart data={overviewData.subscriptions.chartData}>
                  <Bar dataKey="value" fill="var(--color-value)" radius={2} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle>{t("translation.dashboardSummary.teamMembers")}</CardTitle>
              <CardDescription>{t("translation.dashboardSummary.teamInvite")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {overviewData.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <Badge variant={member.role === "Owner" ? "default" : "secondary"}>
                      {member.role}
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("translation.dashboardSummary.payments")}</CardTitle>
          <CardDescription>{t("translation.dashboardSummary.managePayments")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
          </div>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50/50 dark:bg-gray-900/50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Amount</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {overviewData.payments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          payment.status === t("translation.dashboardSummary.status.success")
                            ? "default"
                            : payment.status === t("translation.dashboardSummary.status.processing")
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{payment.email}</td>
                    <td className="py-3 px-4 text-sm font-medium">{payment.amount}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  )

  // Asegúrate de tener este import al inicio del fichero

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* User Growth Chart - Full width & rectangular */}
      <Card>
        <CardHeader>
          <CardTitle>{t("translation.dashboardSummary.userGrowthAnalytics")}</CardTitle>
          <CardDescription>{t("translation.dashboardSummary.userGrowthDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ChartContainer config={chartConfigs.analytics} className="w-full h-[300px] px-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analyticsData.userGrowth}
                margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
              >
                <defs>
                  <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="activeUsersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fontSize: 12, fill: "#666" }}
                />
                <ChartTooltip cursor={{ stroke: "#ddd", strokeWidth: 1 }} content={<ChartTooltipContent />} />
                <Area
                  dataKey="activeUsers"
                  type="natural"
                  fill="url(#activeUsersGradient)"
                  stroke="hsl(142, 76%, 36%)"
                  strokeWidth={2}
                />
                <Area
                  dataKey="users"
                  type="natural"
                  fill="url(#usersGradient)"
                  stroke="hsl(221, 83%, 53%)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Conversion Rates */}
        <Card>
          <CardHeader>
            <CardTitle>{t("translation.dashboardSummary.conversionRates")}</CardTitle>
            <CardDescription>{t("translation.dashboardSummary.conversionRatesDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.conversionRates.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                    <span className="text-sm font-medium">{source.source}</span>
                  </div>
                  <div className="text-sm font-bold">{source.rate}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Usage Pie - Full width */}
        <Card>
          <CardHeader>
            <CardTitle>{t("translation.dashboardSummary.deviceUsage")}</CardTitle>
            <CardDescription>{t("translation.dashboardSummary.deviceUsageDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer config={{}} className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.deviceStats}
                    dataKey="users"
                    nameKey="device"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                  >
                    {analyticsData.deviceStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>{t("translation.dashboardSummary.topProducts")}</CardTitle>
          <CardDescription>{t("translation.dashboardSummary.topProductsDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${product.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{t("translation.dashboardSummary.revenue")}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderReports = () => (
    <div className="space-y-6">
      {/* Monthly Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("translation.dashboardSummary.monthlyReports")}</CardTitle>
          <CardDescription>{t("translation.dashboardSummary.monthlyReportsDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50/50 dark:bg-gray-900/50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">{t("translation.dashboardSummary.month")}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">{t("translation.dashboardSummary.totalSales")}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">{t("translation.dashboardSummary.orders")}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">{t("translation.dashboardSummary.customers")}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">{t("translation.dashboardSummary.avgOrderValue")}</th>
                </tr>
              </thead>
              <tbody>
                {reportsData.monthlyReports.map((report, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-medium">{report.month}</td>
                    <td className="py-3 px-4">${report.totalSales.toLocaleString()}</td>
                    <td className="py-3 px-4">{report.orders.toLocaleString()}</td>
                    <td className="py-3 px-4">{report.customers.toLocaleString()}</td>
                    <td className="py-3 px-4">${report.avgOrderValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle>{t("translation.dashboardSummary.salesByCategory")}</CardTitle>
            <CardDescription>{t("translation.dashboardSummary.salesByCategoryDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px]">
              <PieChart>
                <Pie
                  data={reportsData.salesByCategory}
                  dataKey="sales"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {reportsData.salesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle>{t("translation.dashboardSummary.topCustomers")}</CardTitle>
            <CardDescription>{t("translation.dashboardSummary.topCustomersDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[250px] overflow-y-auto">
              {reportsData.topCustomers.slice(0, 6).map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium text-sm">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">${customer.totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{customer.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b px-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-6 mt-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab("overview")}
                className={`flex items-center space-x-2 text-sm font-medium rounded-none pb-2 ${
                  activeTab === "overview"
                    ? "border-b-2 border-gray-900 dark:border-gray-200 text-gray-900 dark:text-gray-100"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Eye className="h-4 w-4" />
                <span>{t("translation.dashboardSummary.overview")}</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setActiveTab("analytics")}
                className={`flex items-center space-x-2 text-sm font-medium rounded-none pb-2 ${
                  activeTab === "analytics"
                    ? "border-b-2 border-gray-900 dark:border-gray-200 text-gray-900 dark:text-gray-100"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Activity className="h-4 w-4" />
                <span>{t("translation.dashboardSummary.analytics")}</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setActiveTab("reports")}
                className={`flex items-center space-x-2 text-sm font-medium rounded-none pb-2 ${
                  activeTab === "reports"
                    ? "border-b-2 border-gray-900 dark:border-gray-200 text-gray-900 dark:text-gray-100"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>{t("translation.dashboardSummary.reports")}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === "overview" && renderOverview()}
        {activeTab === "analytics" && renderAnalytics()}
        {activeTab === "reports" && renderReports()}
      </main>
    </div>
  )
}

export default DashboardSummary
