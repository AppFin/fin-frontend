import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { FinIconComponent } from '../../../../shared/components/icon/fin-icon.component';
import { FinTextComponent } from '../../../../shared/components/text/fin-text.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginInputForm } from '../../models/login-input-form';
import { FinInputComponent } from '../../../../shared/components/input/fin-input.component';
import { FinButtonComponent } from '../../../../shared/components/button/fin-button.component';
import {
  AuthService,
  ExternalLoginProvider,
} from '../../../../core/services/authentication/auth.service';
import { LoginInput } from '../../../../core/models/authentication/login-input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FinIconComponent,
    FinTextComponent,
    ReactiveFormsModule,
    FinInputComponent,
    FinButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public readonly form = new FormGroup<LoginInputForm>({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public readonly loading = signal(false);

  private readonly authService = inject(AuthService);

  @HostListener('keydown.enter', ['$event'])
  public onEnterKeydown(event: KeyboardEvent): void {
    event.preventDefault();
    this.login();
  }

  public async loginWithExternalProvider(
    provider: ExternalLoginProvider
  ): Promise<void> {
    this.loading.set(true);
    await this.authService.externalLogin(provider);
    this.loading.set(false);
  }

  public async login(): Promise<void> {
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);

    const input = this.form.getRawValue() as LoginInput;
    await this.authService.login(input);
    this.loading.set(false);
  }
}
