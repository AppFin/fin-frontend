import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FinTextComponent } from '../../../../shared/components/text/fin-text.component';

type PasswordFieldRule = {
  error: string;
  message: string;
};

@Component({
  selector: 'fin-password-rules-info',
  templateUrl: './password-rules-info.component.html',
  styleUrl: './password-rules-info.component.scss',
  imports: [FinTextComponent],
})
export class PasswordRulesInfoComponent {
  public readonly passwordControl = input<FormControl<string | null>>();

  public readonly validationMessage: PasswordFieldRule[] = [
    {
      error: 'minLength',
      message: 'fin-core.auth.erros.passwordMinLength',
    },
    {
      error: 'hasLowercase',
      message: 'fin-core.auth.erros.passwordMustHasLowercase',
    },
    {
      error: 'hasUppercase',
      message: 'fin-core.auth.erros.passwordMustHasUppercase',
    },
    {
      error: 'hasNumber',
      message: 'fin-core.auth.erros.passwordMustHasNumber',
    },
    {
      error: 'hasSpecial',
      message: 'fin-core.auth.erros.passwordMustHasSpecial',
    },
  ];
}
