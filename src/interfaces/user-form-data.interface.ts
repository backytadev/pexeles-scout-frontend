import { type UserRole } from '@/enums/user-role.enum';

export interface UserFormData {
  id?: string;
  firstNames: string;
  lastNames: string;
  email: string;
  password?: string | undefined;
  passwordConfirm?: string | undefined;
  roles: UserRole[];
}

export type UserFormDataKeys =
  | 'id'
  | 'firstNames'
  | 'lastNames'
  | 'email'
  | 'password'
  | 'passwordConfirm'
  | 'roles';
