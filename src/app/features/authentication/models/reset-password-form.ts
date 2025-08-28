import { FormControl } from '@angular/forms';

export type ResetPasswordInputForm = {
  password: FormControl<string>;
  passwordConfirmation: FormControl<string>;
};
