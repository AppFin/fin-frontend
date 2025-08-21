import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { FinIconComponent } from '../../../../shared/components/icon/fin-icon.component';
import { FinTextComponent } from '../../../../shared/components/text/fin-text.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResetPasswordInputForm } from '../../models/reset-password-input';
import { FinInputComponent } from '../../../../shared/components/input/fin-input.component';
import { FinButtonComponent } from '../../../../shared/components/button/fin-button.component';
import { passwordValidator } from '../../validators/password-validator';
import { matchPasswordValidator } from '../../validators/match-password-validator';
import { PasswordRulesInfoComponent } from '../../components/password-rules-info/password-rules-info.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fin-reset-password',
  imports: [
    FinIconComponent,
    FinTextComponent,
    FinInputComponent,
    FormsModule,
    ReactiveFormsModule,
    FinButtonComponent,
    PasswordRulesInfoComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
  public readonly form = new FormGroup<ResetPasswordInputForm>(
    {
      password: new FormControl('', [
        Validators.required,
        passwordValidator,
        Validators.maxLength(100),
      ]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    },
    [matchPasswordValidator]
  );

  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.form.controls.password.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() =>
        this.form.controls.passwordConfirmation.updateValueAndValidity()
      );
  }
}
