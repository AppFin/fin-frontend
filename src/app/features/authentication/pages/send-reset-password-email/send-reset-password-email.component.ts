import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { FinTextComponent } from '../../../../shared/components/text/fin-text.component';
import { FinIconComponent } from '../../../../shared/components/icon/fin-icon.component';
import { FinInputComponent } from '../../../../shared/components/input/fin-input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FinButtonComponent } from '../../../../shared/components/button/fin-button.component';
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

    await this.authService.sendResetPasswordEmail(
      this.form.getRawValue().email
    );
    this.emailSent.set(true);
    this.sendingEmail.set(false);
  }
}
