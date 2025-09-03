import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { ButtonFilterComponent } from '../button-filter/button-filter.component';
import { FinButtonComponent } from '../../../../shared/components/button/fin-button.component';
import { FinIconComponent } from '../../../../shared/components/icon/fin-icon.component';
import { FinTextComponent } from '../../../../shared/components/text/fin-text.component';
import { FinUserImageComponent } from '../../../../shared/components/user-image/fin-user-image.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { Toolbar } from 'primeng/toolbar';
import { LayoutService } from '../../../services/layout/layout.service';
import { Menu } from 'primeng/menu';
import { AuthService } from '../../../services/authentication/auth.service';
import { UserProps } from '../../../models/authentication/user-props';
import { Divider } from 'primeng/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'fin-header',
  imports: [
    ButtonFilterComponent,
    FinButtonComponent,
    FinIconComponent,
    FinTextComponent,
    FinUserImageComponent,
    ThemeToggleComponent,
    Toolbar,
    Menu,
    Divider,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public readonly user = signal<UserProps | null>(null);

  private readonly layoutService = inject(LayoutService);
  private readonly authService = inject(AuthService);

  constructor() {
    this.user.set(this.authService.currentUser());
  }

  public get pageName(): Signal<string> {
    return this.layoutService.pageName;
  }
}
