import summaryRoutes from './summary.routes'
import managementRoutes from './management/management.routes'
import { RouteConfig } from './types'

const privateRoutes: RouteConfig[] = [
  ...summaryRoutes,
  ...managementRoutes,
  // Add more private routes here
]

export default privateRoutes