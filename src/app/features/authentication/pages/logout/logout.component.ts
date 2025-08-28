import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/authentication/auth.service';

@Component({
  selector: 'fin-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent implements OnInit {
  private readonly authService = inject(AuthService);

  public async ngOnInit(): Promise<void> {
    await this.authService.logout();
  }
}
