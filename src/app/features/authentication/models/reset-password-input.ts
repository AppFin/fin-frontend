import { FormControl } from '@angular/forms';

export class ResetPasswordInput {
  public resetToken: string;
  public password: string;
  public passwordConfirmation: string;
}

export class ResetPasswordInputForm {
  public resetToken: FormControl<string>;
  public password: FormControl<string>;
  public passwordConfirmation: FormControl<string>;
}
