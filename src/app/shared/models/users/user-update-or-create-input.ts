import { UserGender } from '../../enums/users/user-gender';

export type UserUpdateOrCreateInput = {
  firstName: string;
  lastName: string;
  displayName?: string | null;
  imagePublicUrl?: string | null;
  birthDate?: Date | null;
  gender?: UserGender | null;
};
