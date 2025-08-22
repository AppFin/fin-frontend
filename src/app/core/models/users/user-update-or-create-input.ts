import { UserGender } from '../../enums/users/user-gender';
import { FormControl } from '@angular/forms';

export class UserUpdateOrCreateInput {
  public firstName: string;
  public lastName: string;
  public displayName: string;
  public imagePublicUrl: string;
  public birthDate: Date;
  public gender: UserGender;
}

export class UserCreateInputForm {
  public firstName: FormControl<string | null>;
  public lastName: FormControl<string | null>;
  public displayName: FormControl<string | null>;
}
