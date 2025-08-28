/**
 * @type {Environments}
 * @description This type defines all environments of the application.
 * development | debug | production 
 * @example
 * const appEnvironment: Environments = 'development';
 */
export type Environments = 'development' | 'debug' | 'production';

/**
 * @type {Roles}
 * @description This type defines the roles available in the application.
 * It includes roles such as 'Admin', 'Manager', 'Analist', 'Supervisor', 'Seller', and 'Customer'.
 * @example
 * const userRole: Roles = 'Admin';
 */
export type Roles = 'Admin' | 'Manager' | 'Analist' | 'Supervisor' | 'Seller' | 'Customer';

/**
 * @type {Permissions}
 * @description This type defines the permissions structure for different roles.
 * It includes arrays of strings representing each role's permissions.
 * @example
 * const userPermissions: Permissions = {
 *   Admin: ['CAN_ACCESS_DASHBOARD'],
 *   Manager: ['CAN_VIEW_REPORTS'],
 *   Analist: [],
 *   Supervisor: [],
 *   Seller: [],
 *   Customer: []
 * };
 */
export type Permissions = {
  Admin: string[];
  Manager: string[];
  Analist: string[];
  Supervisor: string[];
  Seller: string[];
  Customer: string[];
};

/**
 * @type {Statues}
 * @description This type defines the possible statuses for a user in the application.
 * It includes 'active', 'inactive', and 'pending'.
 * @example
 * const userStatus: Statues = 'active';
 */
export type Statues = 'active' | 'inactive' | 'pending';

/**
 * @interface IUser
 * @description This interface defines the structure of a user object.
 */
export interface IUser {
  id: string;
  avatar: string | null;
  name: string;
  email: string;
  role: Roles;
  status: Statuses;
  created_at: string;
  permissions: Permissions;
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

/**
 * @interface IGroup
 * @description This interface defines the structure of a group object.
 */
export interface IGroup {
  id: string;
  name: string;
  supervisor: {
    id: string;
    name: string;
    avatar: string | null;
  };
  participants: {
    id: string;
    name: string;
    avatar: string | null;
  }[];
  participantCount: number;
  created_at: string;
  updated_at: string;
}