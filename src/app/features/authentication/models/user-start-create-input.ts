import { FormControl } from '@angular/forms';

export class UserStartCreateInput {
  public email: string;
  public password: string;
  public passwordConfirmation: string;
}

export class UserStartCreateInputForm {
  public email: FormControl<string | null>;
  public password: FormControl<string | null>;
  public passwordConfirmation: FormControl<string | null>;
}
