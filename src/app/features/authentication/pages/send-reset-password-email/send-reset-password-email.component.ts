import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { FinTextComponent } from '../../../../shared/components/generics/text/fin-text.component';
import { FinIconComponent } from '../../../../shared/components/generics/icon/fin-icon.component';
import { FinInputComponent } from '../../../../shared/components/generics/input/fin-input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FinButtonComponent } from '../../../../shared/components/generics/button/fin-button.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/authentication/auth.service';
import { SendResetPasswordEmailForm } from '../../models/send-reset-password-email-form';

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
  public readonly emailSent = signal(false);
  public readonly sendingEmail = signal(false);

  public readonly form = new FormGroup<SendResetPasswordEmailForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  private readonly authService = inject(AuthService);

  @HostListener('keydown.enter', ['$event'])
  public onEnterKeydown(event: KeyboardEvent): void {
    event.preventDefault();
    this.sendEmail();
  }

  public async sendEmail(): Promise<void> {
    if (this.form.invalid || this.sendingEmail()) return;
    this.sendingEmail.set(true);
    this.form.disable();

    const success = await this.authService.sendResetPasswordEmail(
      this.form.getRawValue().email
    );

    if (success) {
      this.emailSent.set(true);
    } else {
      this.form.enable();
    }
    this.sendingEmail.set(false);
  }
}
