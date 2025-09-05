import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { MenuOutput } from '../../../types/layouts/menu-output';
import { MenuService } from '../../../services/layout/menu.service';
import { FinIconComponent } from '../../../../shared/components/icon/fin-icon.component';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { LayoutService } from '../../../services/layout/layout.service';
import { SideNavExpandedComponent } from './side-nav-expanded/side-nav-expanded.component';
import { MenuMetadata } from '../../../types/layouts/menu-metadata';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fin-side-nav',
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    FinIconComponent,
    RouterLink,
    NgTemplateOutlet,
    SideNavExpandedComponent,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
  public readonly menus = signal<MenuOutput[]>([]);
  public readonly menuMetadata = signal<MenuMetadata[]>([]);

  private readonly menuService = inject(MenuService);
  private readonly layoutService = inject(LayoutService);
  private readonly destroyRef = inject(DestroyRef);

  public async ngOnInit(): Promise<void> {
    await this.carregarMenus();
    this.loadMenuMetadata();
    this.startMenuChangeSub();
  }

  public get sideNavOpened(): Signal<boolean> {
    return this.layoutService.sideNavOpened;
  }

  public toggleSideNav(): void {
    this.layoutService.toggleSideNav();
  }

  public get isMobile(): boolean {
    return this.layoutService.isMobile;
  }

  private async carregarMenus(): Promise<void> {
    const menus = await this.menuService.getSideMenus();
    this.menus.set(menus);
  }

  private loadMenuMetadata(): void {
    const menusMetadata = this.menuService.loadMenuMetadata(this.menus());
    this.setMenuMetadata(menusMetadata);
  }

  private setMenuMetadata(menusMetadata: MenuMetadata[]): void {
    this.menuMetadata.set(menusMetadata.filter((m) => m.pinned));
  }

  private startMenuChangeSub(): void {
    this.menuService.menusMetadataChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((menus) => this.setMenuMetadata(menus));
  }
}
