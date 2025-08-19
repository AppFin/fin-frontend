import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'fin-password-rules-info',
  imports: [],
  templateUrl: './password-rules-info.component.html',
  styleUrl: './password-rules-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordRulesInfoComponent {
  public readonly  passwordControl = input<FormControl<string | null>>();

  public readonly validationMessages: [[string,string]] = []
    'required': 'Este campo é obrigatório.',
    'minLength': 'A senha deve ter pelo menos 5 caracteres.',
    'hasLowercase': 'A senha deve conter uma letra minúscula.',
    'hasUppercase': 'A senha deve conter uma letra maiúscula.',
    'hasNumber': 'A senha deve conter um número.',
    'hasSpecial': 'A senha deve conter um caractere especial.',
    'passwordsDoNotMatch': 'As senhas não coincidem.'
  };
}
