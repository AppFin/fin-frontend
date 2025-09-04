import { ChangeDetectionStrategy, Component, inject, model, signal, } from '@angular/core';
import { FinIconComponent } from '../../../../../shared/components/icon/fin-icon.component';
import { FinTextComponent } from '../../../../../shared/components/text/fin-text.component';
import { LayoutService } from '../../../../services/layout/layout.service';
import { MenuOutput } from '../../../../types/layouts/menu-output';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { ifVerticalAnimation } from '../../../../../shared/animations/if-vertical.animation';

@Component({
  selector: 'fin-side-nav-expanded',
  imports: [FinIconComponent, FinTextComponent, RouterLink, NgTemplateOutlet],
  templateUrl: './side-nav-expanded.component.html',
  styleUrl: './side-nav-expanded.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ifVerticalAnimation],
})
export class SideNavExpandedComponent {
  public readonly menus = model<MenuOutput[]>([]);

  public readonly unpinnedOpened = signal(false);

  private readonly layoutService = inject(LayoutService);

  public toggleSideNav(): void {
    this.layoutService.toggleSideNav();
  }
}
