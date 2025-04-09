export enum UserRole {
  SuperUser = 'super-user',
  AdminUser = 'admin-user',
  User = 'user',
}

export const UserRoleNames: Record<UserRole, string> = {
  [UserRole.SuperUser]: 'Super Usuario',
  [UserRole.AdminUser]: 'Usuario Administrador',
  [UserRole.User]: 'Usuario',
};
