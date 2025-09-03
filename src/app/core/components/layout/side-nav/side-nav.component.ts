import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, } from '@angular/material/sidenav';
import { MenuOutput } from '../../../types/layouts/menu-output';
import { MenuService } from '../../../services/layout/menu.service';
import { FinIconComponent } from '../../../../shared/components/icon/fin-icon.component';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { FinTextComponent } from '../../../../shared/components/text/fin-text.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { LayoutService } from '../../../services/layout/layout.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { FinButtonComponent } from '../../../../shared/components/button/fin-button.component';

@Component({
  selector: 'fin-side-nav',
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    FinIconComponent,
    RouterLink,
    NgTemplateOutlet,
    FinTextComponent,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    FinButtonComponent,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit, AfterViewInit {
  @ViewChild(MatDrawer) public drawer!: MatDrawer;

  public readonly menus = signal<MenuOutput[]>([]);

  public readonly pinnedMenus = signal<MenuOutput[]>([]);
  public readonly unpinnedMenus = signal<MenuOutput[]>([]);
  public readonly showUnpinned = signal<boolean>(false);

  private readonly menuService = inject(MenuService);
  private readonly layoutService = inject(LayoutService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly storageKey = 'fin.sideNav.pins.v1';
  private readonly drawerKey = 'fin.sideNav.drawer.open.v1';

  public ngOnInit(): void {
    this.carregarMenus();
    this.setSideNavToggleSub();
  }

  public get isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  public ngAfterViewInit(): void {
    // apply saved drawer open state
    try {
      const raw = localStorage.getItem(this.drawerKey);
      if (raw !== null) {
        const opened = raw === 'true';
        // set opened state without animation glitches
        Promise.resolve().then(() => this.drawer.toggle(opened));
      }
    } catch {}
  }

  private async carregarMenus(): Promise<void> {
    const menus = await this.menuService.getSideMenus();
    this.menus.set(menus);

    const saved = this.loadState();
    if (saved) {
      // reconcile saved ids with current menus
      const map = new Map(menus.map((m) => [m.id, m] as const));
      const pinned: MenuOutput[] = [];
      const unpinned: MenuOutput[] = [];
      for (const id of saved.pinned) if (map.has(id)) pinned.push(map.get(id)!);
      for (const id of saved.unpinned)
        if (map.has(id)) unpinned.push(map.get(id)!);
      // include any new menus not present in saved state as pinned by default (at end)
      const allSavedIds = new Set([...saved.pinned, ...saved.unpinned]);
      const newOnes = menus.filter((m) => !allSavedIds.has(m.id));
      pinned.push(...newOnes);
      this.pinnedMenus.set(pinned);
      this.unpinnedMenus.set(unpinned);
    } else {
      // default: all pinned
      this.pinnedMenus.set(menus);
      this.unpinnedMenus.set([]);
      this.saveState();
    }
  }

  // Improved drag & drop handlers
  public handleDropPinned(event: CdkDragDrop<MenuOutput[]>): void {
    if (event.previousContainer === event.container) {
      // Reordering within pinned
      const items = [...this.pinnedMenus()];
      moveItemInArray(items, event.previousIndex, event.currentIndex);
      this.pinnedMenus.set(items);
    } else {
      // Moving from unpinned to pinned
      const pinnedItems = [...this.pinnedMenus()];
      const unpinnedItems = [...this.unpinnedMenus()];
      transferArrayItem(
        unpinnedItems,
        pinnedItems,
        event.previousIndex,
        event.currentIndex
      );
      this.pinnedMenus.set(pinnedItems);
      this.unpinnedMenus.set(unpinnedItems);
    }
    this.saveState();
  }

  public handleDropUnpinned(event: CdkDragDrop<MenuOutput[]>): void {
    if (event.previousContainer === event.container) {
      // Reordering within unpinned
      const items = [...this.unpinnedMenus()];
      moveItemInArray(items, event.previousIndex, event.currentIndex);
      this.unpinnedMenus.set(items);
    } else {
      // Moving from pinned to unpinned
      const pinnedItems = [...this.pinnedMenus()];
      const unpinnedItems = [...this.unpinnedMenus()];
      transferArrayItem(
        pinnedItems,
        unpinnedItems,
        event.previousIndex,
        event.currentIndex
      );
      this.pinnedMenus.set(pinnedItems);
      this.unpinnedMenus.set(unpinnedItems);
    }
    this.saveState();
  }

  private saveState(): void {
    const pinnedIds = this.pinnedMenus().map((m) => m.id);
    const unpinnedIds = this.unpinnedMenus().map((m) => m.id);
    const data = { pinned: pinnedIds, unpinned: unpinnedIds };
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch {}
  }

  public toggleDrawer(): void {
    if (!this.drawer) return;
    this.drawer.toggle();
    try {
      localStorage.setItem(this.drawerKey, String(this.drawer.opened));
    } catch {}
  }

  private loadState(): { pinned: string[]; unpinned: string[] } | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.pinned) && Array.isArray(parsed?.unpinned))
        return parsed;
      return null;
    } catch {
      return null;
    }
  }

  private setSideNavToggleSub(): void {
    this.layoutService.toggleSideNavSub
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(300))
      .subscribe(() => {
        this.drawer.toggle();
      });
  }
}
