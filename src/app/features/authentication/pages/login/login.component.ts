import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FinIconComponent } from '../../../../shared/components/icon/fin-icon.component';
import { FinTextComponent } from '../../../../shared/components/text/fin-text.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginInputForm } from '../../models/login-input';
import { FinInputComponent } from '../../../../shared/components/input/fin-input.component';
import { FinButtonComponent } from '../../../../shared/components/button/fin-button.component';

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
  protected readonly decodeURI = decodeURI;
}
