/**
 * @type {Environments}
 * @description This type define all environments of application.
 * It can includes just 3 differents environments.
 * development | debug | production 
 * @example
 * const appEnvironment: Environments = 'development';
 * // Just can be 'development', 'debug', 'production
 */
export type Environments = 'development' | 'debug' | 'production';

/**
 * @type {Roles}
 * @description This type defines the roles available in the application.
 * It includes roles such as 'admin', 'manager', 'coordinator', 'analyst', and 'customer'.
 * These roles can be used to manage user permissions and access levels within the application.
 * @example
 * const userRole: Roles = 'admin';
 * // userRole can be 'admin', 'manager', 'coordinator', 'analyst', or 'customer'
 */
export type Roles = 'admin' | 'manager' | 'coordinator' | 'analyst' | 'customer'

/**
 * @type {Permissions}
 * @description This type defines the permissions structure for different roles in the application.
 * It includes arrays of numbers representing permissions for marketing, sales, and customers.
 * This structure can be used to manage access control and permissions for various functionalities.
 * @example
 * const userPermissions: Permissions = {
 *   marketing: [1, 2, 3],
 *   sales: [4, 5],
 *   customers: [6, 7]
 * };
 */
export type Permissions = {
  marketing: number[];
  sales: number[];
  customers: number[];
}

/**
 * @type {Statues}
 * @description This type defines the possible statuses for a user in the application.
 * It includes 'active', 'inactive', and 'pending' statuses.
 * This can be used to track user activity and account status.
 * @example
 * const userStatus: Statues = 'active';
 * // userStatus can be 'active', 'inactive', or 'pending'
 */
export type Statues = 'active' | 'inactive' | 'pending'

/**
 * @interface IUser
 * @description This interface defines the structure of a user object in the application.
 * It includes properties such as id, avatar, name, email, role, status, created_at, and permissions.
 * This structure can be used to manage user data and display user information in the application.
 */
export interface IUser {
  id: string;
  avatar: string | null;
  name: string;
  email: string;
  role: string;
  status: Statues;
  created_at: string;
  permissions: Permissions[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: IUser;
  error?: string;
}