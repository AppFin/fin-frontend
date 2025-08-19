import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FinTextComponent } from '../../../../shared/components/text/fin-text.component';
import { FinIconComponent } from '../../../../shared/components/icon/fin-icon.component';
import { FinInputComponent } from '../../../../shared/components/input/fin-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { SendResetPasswordEmailInputForm } from '../../models/send-reset-password-email-input';
import { FinButtonComponent } from '../../../../shared/components/button/fin-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fin-send-reset-password-email',
  imports: [
    FinTextComponent,
    FinIconComponent,
    FinInputComponent,
    ReactiveFormsModule,
    FinButtonComponent,
    RouterLink,
  ],
  templateUrl: './send-reset-password-email.component.html',
  styleUrl: './send-reset-password-email.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendResetPasswordEmailComponent {
  public readonly form = new FormGroup<SendResetPasswordEmailInputForm>({
    email: new FormControl('', Validators.required),
  });
}
