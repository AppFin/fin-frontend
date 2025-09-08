import {
  ChangeDetectionStrategy,
  Component, computed,
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
export class SideNavComponent {
  public readonly menuMetadataPinned = computed(() => {
    return this.menuMetadata().filter((m) => m.pinned);
  });

  private readonly menuService = inject(MenuService);
  private readonly layoutService = inject(LayoutService);

  public get sideNavOpened(): Signal<boolean> {
    return this.layoutService.sideNavOpened;
  }

  public toggleSideNav(): void {
    this.layoutService.toggleSideNav();
  }

  public get isMobile(): boolean {
    return this.layoutService.isMobile;
  }

  private get menuMetadata(): Signal<MenuMetadata[]> {
    return this.menuService.menusMetadata;
  }
}
