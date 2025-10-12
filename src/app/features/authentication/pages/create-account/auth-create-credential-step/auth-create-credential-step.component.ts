import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserStartCreateInputForm } from '../../../models/user-start-create-input';
import { passwordValidator } from '../../../validators/password-validator';
import { FinInputComponent } from '../../../../../shared/components/generics/input/fin-input.component';
import { PasswordRulesInfoComponent } from '../../../components/password-rules-info/password-rules-info.component';
import { FinButtonComponent } from '../../../../../shared/components/generics/button/fin-button.component';
import { matchPasswordValidator } from '../../../validators/match-password-validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputOtpModule } from 'primeng/inputotp';
import { MessageModule } from 'primeng/message';
import { FinTextComponent } from '../../../../../shared/components/generics/text/fin-text.component';
import { UserCreateService } from '../../../services/user-create.service';
import { interval, map, takeWhile } from 'rxjs';
import { TimerFomatterPipe } from '../../../../../shared/pipes/timer-formatter/timer-fomatter.pipe';
import { UserCreationStatedDto } from '../../../models/user-creation-stated-dto';

type ConfirmationCodeForm = {
  confirmationCode: FormControl<string>;
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
    TimerFomatterPipe,
  ],
  templateUrl: './auth-create-credential-step.component.html',
  styleUrl: './auth-create-credential-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCreateCredentialStepComponent implements OnInit {
  public readonly creationStarted = output<UserCreationStatedDto>();

  public readonly creationToken = signal('');
  public readonly loadingButton = signal(false);

  public confirmationCodeForm: FormGroup<ConfirmationCodeForm>;
  public credentialForm: FormGroup<UserStartCreateInputForm>;

  public readonly canResendEmail = signal(false);
  public readonly resendEmailTimer = signal(0);

  private readonly destroyRef = inject(DestroyRef);
  private readonly userCreateService = inject(UserCreateService);

  public ngOnInit(): void {
    this.createForms();
    this.setSubs();
  }

  @HostListener('keydown.enter', ['$event'])
  public onEnterKeydown(event: KeyboardEvent): void {
    event.preventDefault();
    this.nextStep();
  }

  public async nextStep(): Promise<void> {
    if (!this.creationToken()) {
      if (this.credentialForm.invalid) return;
      this.credentialForm.disable();
      this.loadingButton.set(true);

      const input = this.credentialForm.getRawValue();
      const result = await this.userCreateService.start(input);

      if (!!result) {
        this.startResendEmailTimer(result.sentEmailDateTime);
        this.creationToken.set(result.creationToken);
      } else {
        this.credentialForm.enable();
      }
    } else if (this.confirmationCodeForm.valid) {
      this.confirmationCodeForm.disable();
      this.loadingButton.set(true);

      const code = this.confirmationCodeForm.getRawValue().confirmationCode;
      const result = await this.userCreateService.validEmail(
        this.creationToken(),
        code
      );

      if (result) {
        const credentials = this.credentialForm.getRawValue();
        this.creationStarted.emit({
          creationToken: this.creationToken(),
          email: credentials.email,
          password: credentials.password,
        });
      } else {
        this.confirmationCodeForm.enable();
      }
    }
    this.loadingButton.set(false);
  }

  public async resendEmail(): Promise<void> {
    if (!this.canResendEmail()) return;
    this.loadingButton.set(true);
    this.confirmationCodeForm.disable();

    const result = await this.userCreateService.resendEmail(
      this.creationToken()
    );
    if (!!result) {
      this.startResendEmailTimer(result);
      this.confirmationCodeForm.reset();
    }

    this.loadingButton.set(false);
    this.confirmationCodeForm.enable();
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
      confirmationCode: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern('^[A-Z0-9]{6}$')],
      }),
    });

    this.credentialForm = new FormGroup<UserStartCreateInputForm>(
      {
        password: new FormControl('', {
          nonNullable: true,
          validators: [
            Validators.required,
            passwordValidator,
            Validators.maxLength(100),
          ],
        }),
        passwordConfirmation: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        }),
      },
      matchPasswordValidator
    );
  }

  private startResendEmailTimer(sentEmailDateTime: Date) {
    this.canResendEmail.set(false);

    const duration = 1.5 * 60 * 1000; // 1.5 minute in milliseconds;

    const timer$ = interval(1000).pipe(
      map(() => {
        const now = new Date();
        const diff = duration - (now.getTime() - sentEmailDateTime.getTime());
        return Math.max(0, diff);
      }),
      takeWhile((remaining) => remaining > 0, true)
    );

    timer$.subscribe({
      next: (ms) => this.resendEmailTimer.set(ms),
      complete: () => this.canResendEmail.set(true),
    });
  }
}
