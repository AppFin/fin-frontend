import { FormControl } from '@angular/forms';

export class LoginInputForm {
  public email: FormControl<string | null>;
  public password: FormControl<string | null>;
}
