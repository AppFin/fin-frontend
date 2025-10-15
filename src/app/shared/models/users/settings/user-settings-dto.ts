export type UserTheme = 'light' | 'dark' | 'auto';

export interface UserSettingsDto {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  gender: number;
  birthDate: string | null;
  imagePublicUrl: string | null;
  theme: UserTheme;
  emailNotifications: boolean;
  pushNotifications: boolean;
  isAdmin: boolean;
  isActivity: boolean;
  tenants: Tenant[];
}

export interface Tenant {
  id: string;
  name: string;
  currency: string;
  locale: string;
  timezone: string;
}
