import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, output, signal, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { UserStartCreateInputForm } from '../../../models/user-start-create-input';
import { passwordValidator } from '../../../validators/password-validator';
import { FinInputComponent } from '../../../../../shared/components/input/fin-input.component';
import { PasswordRulesInfoComponent } from '../../../components/password-rules-info/password-rules-info.component';
import { FinButtonComponent } from '../../../../../shared/components/button/fin-button.component';
import { matchPasswordValidator } from '../../../validators/match-password-validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputOtpModule } from 'primeng/inputotp';
import { MessageModule } from 'primeng/message';
import { FinTextComponent } from '../../../../../shared/components/text/fin-text.component';

type ConfirmationCodeForm = {
  confirmationCode: FormControl<string | null>;
};

@Component({
  selector: 'fin-auth-create-credential-step',
  imports: [
    ReactiveFormsModule,
    FinInputComponent,
    PasswordRulesInfoComponent,
    FinButtonComponent,
    InputOtpModule,
    MessageModule,
    FinTextComponent,
  ],
  templateUrl: './auth-create-credential-step.component.html',
  styleUrl: './auth-create-credential-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCreateCredentialStepComponent implements OnInit {
  public readonly setCreationToken = output<string>();

  public readonly creationToken = signal('');
  public readonly loadingButton = signal(false);

  public confirmationCodeForm: FormGroup<ConfirmationCodeForm>;
  public credentialForm: FormGroup<UserStartCreateInputForm>;

  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.createForms();
    this.setSubs();
  }

  public async nextStep(): Promise<void> {
    if (!this.creationToken()) {
      if (this.credentialForm.invalid) return;
      this.credentialForm.disable();
      this.loadingButton.set(true);

      setTimeout(() => {
        this.creationToken.set('asdasd');
        this.loadingButton.set(false);
      }, 1500);
    } else if (this.confirmationCodeForm.valid) {
      this.confirmationCodeForm.disable();
      this.loadingButton.set(true);

      setTimeout(() => {
        this.loadingButton.set(false);
        this.setCreationToken.emit(
          this.confirmationCodeForm.controls.confirmationCode.value ?? ''
        );
      }, 1500);
    }
  }

  private setSubs(): void {
    this.credentialForm.controls.password.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() =>
        this.credentialForm.controls.passwordConfirmation.updateValueAndValidity()
      );

    this.confirmationCodeForm.controls.confirmationCode.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => {
        const upperValue = (v || '').toUpperCase();
        this.confirmationCodeForm.controls.confirmationCode.setValue(
          upperValue,
          { emitEvent: false }
        );
        this.confirmationCodeForm.updateValueAndValidity();
      });
  }

  private createForms(): void {
    this.confirmationCodeForm = new FormGroup<ConfirmationCodeForm>({
      confirmationCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z0-9]{6}$'),
      ]),
    });

    this.credentialForm = new FormGroup<UserStartCreateInputForm>(
      {
        password: new FormControl('', [
          Validators.required,
          passwordValidator,
          Validators.maxLength(100),
        ]),
        passwordConfirmation: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
      },
      matchPasswordValidator
    );
  }
}
