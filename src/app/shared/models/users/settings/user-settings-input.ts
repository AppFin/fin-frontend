import { UserUpdateOrCreateInput } from "../user-update-or-create-input";

export interface UserSettingsInput extends UserUpdateOrCreateInput {
  theme: string;
  locale: string;
  timezone: string;
  currencyCode: string;
}
