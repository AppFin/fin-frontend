import { ChangeDetectionStrategy, Component, computed, effect, inject, model, signal, } from '@angular/core';
import { FinIconComponent } from '../../../../../shared/components/icon/fin-icon.component';
import { FinTextComponent } from '../../../../../shared/components/text/fin-text.component';
import { LayoutService } from '../../../../services/layout/layout.service';
import { MenuOutput } from '../../../../types/layouts/menu-output';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { ifVerticalAnimation } from '../../../../../shared/animations/if-vertical.animation';
import { FinButtonComponent } from '../../../../../shared/components/button/fin-button.component';
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
  public readonly menus = model<MenuOutput[]>([]);
  public readonly unpinnedOpened = signal(false);

  public readonly menuMetadata = signal<MenuMetadata[]>([]);
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
      this.menus();
      this.loadMenusMetadata();
    });

    effect(() => {
      if (!this.layoutService.sideNavOpened()) this.unpinnedOpened.set(false);
    });
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
    const menus = this.menuService.pinMenu(this.menuMetadata(), menuId);
    this.menuMetadata.set(menus);
  }

  public unpinMenu(ev: Event, menuId: string): void {
    ev.stopPropagation();
    const menus = this.menuService.unpinMenu(this.menuMetadata(), menuId);
    this.menuMetadata.set(menus);
  }

  public menuDropped(menuDropped: CdkDragDrop<MenuMetadata[]>): void {
    const menus = this.menuService.reorderMenu(
      this.menuMetadata(),
      this.menusPinned(),
      menuDropped
    );
    this.menuMetadata.set(menus);
  }

  private loadMenusMetadata(): void {
    this.menuMetadata.set(this.menuService.loadMenuMetadata(this.menus()));
  }
}
