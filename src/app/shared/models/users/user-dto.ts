import { UserGender } from '../../enums/users/user-gender';
import { Tenant } from '../tenants/tenant';

export class UserDto {
  public id: string;
  public firstName: string;
  public lastName: string;
  public displayName: string | null;
  public gender: UserGender | null;
  public birthDate: Date | null;
  public imagePublicUrl: string | null;
  public isAdmin: boolean;
  public isActivity: boolean;
  public tenants: Tenant[];
}
