import { UserDto } from '../user-dto';

export interface UserSettingsOutput extends UserDto {
    theme: string;
    locale: string;
    timezone: string;
    currencyCode: string;
}
