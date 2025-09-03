import { ChangeDetectionStrategy, Component, inject, OnInit, Signal, signal, viewChild, } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, } from '@angular/material/sidenav';
import { MenuOutput } from '../../../types/layouts/menu-output';
import { MenuService } from '../../../services/layout/menu.service';
import { FinIconComponent } from '../../../../shared/components/icon/fin-icon.component';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { LayoutService } from '../../../services/layout/layout.service';

@Component({
  selector: 'fin-side-nav',
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    FinIconComponent,
    RouterLink,
    NgTemplateOutlet,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
  public readonly menus = signal<MenuOutput[]>([]);
  public readonly drawer = viewChild(MatDrawer);

  private readonly menuService = inject(MenuService);
  private readonly layoutService = inject(LayoutService);

  public async ngOnInit(): Promise<void> {
    await this.carregarMenus();
  }

  public get sideNavOpened(): Signal<boolean> {
    return this.layoutService.sideNavOpened;
  }

  public toggleSideNav(): void {
    this.layoutService.toggleSideNav();
  }

  public get isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  private async carregarMenus(): Promise<void> {
    const menus = await this.menuService.getSideMenus();
    this.menus.set(menus);
  }
}
