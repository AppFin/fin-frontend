import { UserTheme } from './user-settings-dto';

export interface UserSettingsUpdateInput {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  gender?: number;
  birthDate?: string;
  imagePublicUrl?: string;
  theme?: UserTheme;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
}
