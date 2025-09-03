import { ChangeDetectionStrategy, Component, inject, OnInit, signal, } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, } from '@angular/material/sidenav';
import { MenuOutput } from '../../../types/layouts/menu-output';
import { MenuService } from '../../../services/layout/menu.service';
import { FinIconComponent } from '../../../../shared/components/icon/fin-icon.component';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';

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

  private readonly menuService = inject(MenuService);

  public ngOnInit(): void {
    this.carregarMenus();
  }

  private async carregarMenus(): Promise<void> {
    const menus = await this.menuService.getSideMenus();
    this.menus.set(menus);
  }
}
