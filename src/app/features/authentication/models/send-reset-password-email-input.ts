import { FormControl } from '@angular/forms';

export class SendResetPasswordEmailInput {
  public email: string;
}

export class SendResetPasswordEmailInputForm {
  public email: FormControl<string | null>;
}
