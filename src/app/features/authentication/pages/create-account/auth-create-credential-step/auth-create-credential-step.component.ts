import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { UserStartCreateInputForm } from '../../../models/user-start-create-input';
import { passwordValidator } from '../../../validators/password-validator';
import { FinInputComponent } from '../../../../../shared/components/input/fin-input.component';
import { PasswordRulesInfoComponent } from '../../../components/password-rules-info/password-rules-info.component';
import { FinButtonComponent } from '../../../../../shared/components/button/fin-button.component';
import { matchPasswordValidator } from '../../../validators/match-password-validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  ],
  templateUrl: './auth-create-credential-step.component.html',
  styleUrl: './auth-create-credential-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCreateCredentialStepComponent implements OnInit {
  public readonly creationToken = signal('');
  public readonly loadingButton = signal(false);

  public readonly confirmationCodeForm = new FormGroup<ConfirmationCodeForm>({
    // TODO adjusts this pattern
    confirmationCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ]),
  });
  public readonly credentialForm = new FormGroup<UserStartCreateInputForm>(
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

  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.credentialForm.controls.password.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() =>
        this.credentialForm.controls.passwordConfirmation.updateValueAndValidity()
      );
  }

  public nextStep(): void {
    if (!this.creationToken()) {
      if (this.credentialForm.invalid) return;
      this.credentialForm.disable();
      this.loadingButton.set(true);

      setTimeout(() => {
        this.creationToken.set('asdasd');
        this.loadingButton.set(false);
      }, 1500);
    } else if (this.confirmationCodeForm.valid) {
    }
  }
}
