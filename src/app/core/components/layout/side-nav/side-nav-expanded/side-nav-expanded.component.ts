import { ChangeDetectionStrategy, Component, inject, model, signal, } from '@angular/core';
import { FinIconComponent } from '../../../../../shared/components/icon/fin-icon.component';
import { FinTextComponent } from '../../../../../shared/components/text/fin-text.component';
import { LayoutService } from '../../../../services/layout/layout.service';
import { MenuOutput } from '../../../../types/layouts/menu-output';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { ifVerticalAnimation } from '../../../../../shared/animations/if-vertical.animation';
import { FinButtonComponent } from '../../../../../shared/components/button/fin-button.component';

@Component({
  selector: 'fin-side-nav-expanded',
  imports: [
    FinIconComponent,
    FinTextComponent,
    RouterLink,
    NgTemplateOutlet,
    FinButtonComponent,
  ],
  templateUrl: './side-nav-expanded.component.html',
  styleUrl: './side-nav-expanded.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ifVerticalAnimation],
})
export class SideNavExpandedComponent {
  public readonly menus = model<MenuOutput[]>([]);

  public readonly unpinnedOpened = signal(false);

  private readonly layoutService = inject(LayoutService);

  public get isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  public toggleSideNav(): void {
    this.layoutService.toggleSideNav();
  }

  public optionClicked(): void {
    if (this.isMobile) {
      this.toggleSideNav();
    }
  }
}
