import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-login-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-create.component.html',
  styleUrl: './login-create.component.scss'
})
export class LoginCreateComponent {
  private readonly themeService = inject(ThemeService);

  loginWithGoogle(): void {
    console.log('Criar conta com Google');
  }
}
