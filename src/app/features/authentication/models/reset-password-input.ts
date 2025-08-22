import { FormControl } from '@angular/forms';

export class ResetPasswordInput {
  public resetToken: string;
  public password: string;
  public passwordConfirmation: string;
}

export class ResetPasswordInputForm {
  public password: FormControl<string | null>;
  public passwordConfirmation: FormControl<string | null>;
}
