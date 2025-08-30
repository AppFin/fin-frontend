import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';
import { RouterOutlet } from '@angular/router';
import { FinTextComponent } from '../../../shared/components/text/fin-text.component';
import { Toolbar } from 'primeng/toolbar';
import { FinUserImageComponent } from '../../../shared/components/user-image/fin-user-image.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { ButtonFilterComponent } from './button-filter/button-filter.component';
import { FinIconComponent } from '../../../shared/components/icon/fin-icon.component';
import { FinButtonComponent } from '../../../shared/components/button/fin-button.component';

@Component({
  selector: 'fin-layout',
  imports: [
    RouterOutlet,
    FinTextComponent,
    Toolbar,
    FinUserImageComponent,
    ThemeToggleComponent,
    ButtonFilterComponent,
    FinIconComponent,
    FinButtonComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  private readonly layoutService = inject(LayoutService);

  public get pageName(): Signal<string> {
    return this.layoutService.pageName;
  }
}
