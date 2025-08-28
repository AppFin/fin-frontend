import { FormControl } from '@angular/forms';

export class UserStartCreateInput {
  public email: string;
  public password: string;
  public passwordConfirmation: string;
}

export class UserStartCreateInputForm {
  public email: FormControl<string>;
  public password: FormControl<string>;
  public passwordConfirmation: FormControl<string>;
}
