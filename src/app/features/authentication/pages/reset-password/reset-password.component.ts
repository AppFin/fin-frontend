import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  signal,
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
import { FinInputComponent } from '../../../../shared/components/input/fin-input.component';
import { FinButtonComponent } from '../../../../shared/components/button/fin-button.component';
import { passwordValidator } from '../../validators/password-validator';
import { matchPasswordValidator } from '../../validators/match-password-validator';
import { PasswordRulesInfoComponent } from '../../components/password-rules-info/password-rules-info.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/authentication/auth.service';
import { ResetPasswordInputForm } from '../../models/reset-password-form';
import { firstValueFrom } from 'rxjs';
import { ResetPasswordErrorCode } from '../../../../core/enums/authentication/reset-password-error-code';

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
    RouterLink,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
  public readonly resetToken = signal('');
  public readonly loading = signal(false);
  public readonly resetDone = signal(false);
  public form: FormGroup<ResetPasswordInputForm>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly activatedRoute = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.createForm();
    this.setSubs();
    this.getAndValidToken();
  }

  @HostListener('keydown.enter', ['$event'])
  public onEnterKeydown(event: KeyboardEvent): void {
    event.preventDefault();
    this.resetPassword();
  }

  public async resetPassword(): Promise<void> {
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);
    this.form.disable();

    const input = this.form.getRawValue();
    const request = this.authService.resetPassword({
      ...input,
      resetToken: this.resetToken(),
    });

    const result = await firstValueFrom(request);

    const success =
      (typeof result === 'boolean' && result) ||
      (typeof result === 'object' && result.success);
    const errorCode = typeof result === 'object' ? result.errorCode : null;

    if (success) {
      this.resetDone.set(true);
      this.loading.set(false);
    } else {
      this.emmitResetFailMessage(errorCode);
    }
  }

  private setSubs(): void {
    this.form.controls.password.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() =>
        this.form.controls.passwordConfirmation.updateValueAndValidity()
      );
  }

  private getAndValidToken(): void {
    const validTokenPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}-[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const token =
      (this.activatedRoute.snapshot.queryParams['token'] as string) || '';

    if (!validTokenPattern.test(token)) {
      this.router.navigate(['/']);
      return;
    }

    this.resetToken.set(token);
  }

  private createForm(): void {
    this.form = new FormGroup<ResetPasswordInputForm>(
      {
        password: new FormControl('', {
          validators: [
            Validators.required,
            passwordValidator,
            Validators.maxLength(100),
          ],
          nonNullable: true,
        }),
        passwordConfirmation: new FormControl('', {
          nonNullable: true,
          validators: Validators.required,
        }),
      },
      [matchPasswordValidator]
    );
  }

  private emmitResetFailMessage(
    errorCode: ResetPasswordErrorCode | null
  ): void {
    // TODO emmit message here
  }
}
