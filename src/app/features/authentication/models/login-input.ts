import { FormControl } from '@angular/forms';

export class LoginInput {
  public email: string;
  public password: string;
}

export class LoginInputForm {
  public email: FormControl<string | null>;
  public password: FormControl<string | null>;
}
