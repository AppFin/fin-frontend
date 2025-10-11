import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { FinIconComponent } from '../../../../../shared/components/generics/icon/fin-icon.component';
import { FinTextComponent } from '../../../../../shared/components/generics/text/fin-text.component';
import { LayoutService } from '../../../../services/layout/layout.service';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { ifVerticalAnimation } from '../../../../../shared/animations/if-vertical.animation';
import { FinButtonComponent } from '../../../../../shared/components/generics/button/fin-button.component';
import { MenuService } from '../../../../services/layout/menu.service';
import { MenuMetadata } from '../../../../types/layouts/menu-metadata';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'fin-side-nav-expanded',
  imports: [
    FinIconComponent,
    FinTextComponent,
    RouterLink,
    NgTemplateOutlet,
    FinButtonComponent,
    DragDropModule,
  ],
  templateUrl: './side-nav-expanded.component.html',
  styleUrl: './side-nav-expanded.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ifVerticalAnimation],
})
export class SideNavExpandedComponent {
  public readonly unpinnedOpened = signal(false);

  public readonly menusPinned = computed(() => {
    return this.menuMetadata().filter((m) => m.pinned);
  });
  public readonly menusUnpinned = computed(() => {
    return this.menuMetadata().filter((m) => !m.pinned);
  });

  private readonly layoutService = inject(LayoutService);
  private readonly menuService = inject(MenuService);

  constructor() {
    effect(() => {
      if (!this.layoutService.sideNavOpened()) this.unpinnedOpened.set(false);
    });
  }

  public get menuMetadata(): Signal<MenuMetadata[]> {
    return this.menuService.menusMetadata;
  }

  public get isMobile(): boolean {
    return this.layoutService.isMobile;
  }

  public toggleSideNav(): void {
    this.layoutService.toggleSideNav();
  }

  public optionClicked(): void {
    if (this.isMobile) {
      this.toggleSideNav();
    }
  }

  public pinMenu(ev: Event, menuId: string): void {
    ev.stopPropagation();
    this.menuService.pinMenu(this.menuMetadata(), menuId);
  }

  public unpinMenu(ev: Event, menuId: string): void {
    ev.stopPropagation();
    this.menuService.unpinMenu(this.menuMetadata(), menuId);
  }

  public menuDropped(menuDropped: CdkDragDrop<MenuMetadata[]>): void {
    this.menuService.reorderMenu(
      this.menuMetadata(),
      this.menusPinned(),
      menuDropped
    );
  }
}
