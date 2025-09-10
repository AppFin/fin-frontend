import { inject, Injectable, signal } from '@angular/core';
import { MenuOutput } from '../../types/layouts/menu-output';
import { MenuMetadata } from '../../types/layouts/menu-metadata';
import { firstValueFrom } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { StorageService } from '../app/storage.service';
import { MenuApiService } from './menu-api.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly _menusMetadata = signal<MenuMetadata[]>([]);
  public readonly menusMetadata = this._menusMetadata.asReadonly();

  private readonly storageService = inject(StorageService);
  private readonly apiService = inject(MenuApiService);
  private readonly MENUS_METADATA_KEY = 'menus_metadata';

  public filterMenus(
    filter: string,
    skipCount: number,
    maxResultCount: number
  ): Promise<PagedOutput<MenuOutput>> {
    const request = this.apiService.getList({
      filter: { filter, property: 'Name' },
      skipCount,
      maxResultCount,
    });
    return firstValueFrom(request);
  }

  public unpinMenu(menuOutputs: MenuMetadata[], menuId: string): void {
    const updated = menuOutputs.map((menu) =>
      menu.id == menuId ? { ...menu, pinned: false } : menu
    );
    this.saveMenuMetadata(updated);
  }

  public pinMenu(menuOutputs: MenuMetadata[], menuId: string): void {
    const updated = menuOutputs.map((menu) =>
      menu.id == menuId ? { ...menu, pinned: true } : menu
    );
    this.saveMenuMetadata(updated);
  }

  public reorderMenu(
    menuMetadata: MenuMetadata[],
    menuMetadataPinned: MenuMetadata[],
    menuDropped: CdkDragDrop<MenuMetadata[]>
  ): void {
    const all = [...menuMetadata];
    if (menuDropped.previousIndex === menuDropped.currentIndex) return;

    const pinnedSorted = [...menuMetadataPinned].sort(
      (a, b) => a.order - b.order
    );
    moveItemInArray(
      pinnedSorted,
      menuDropped.previousIndex,
      menuDropped.currentIndex
    );

    pinnedSorted.forEach((pinnedItem, idx) => {
      const indexInAll = all.findIndex((m) => m.id === pinnedItem.id);
      if (indexInAll !== -1) {
        all[indexInAll] = { ...all[indexInAll], order: idx };
      }
    });

    let nextOrder = pinnedSorted.length;
    const unpinnedSorted = all
      .filter((m) => !m.pinned)
      .sort((a, b) => a.order - b.order);

    unpinnedSorted.forEach((item) => {
      const indexInAll = all.findIndex((m) => m.id === item.id);
      if (indexInAll !== -1) {
        all[indexInAll] = { ...all[indexInAll], order: nextOrder++ };
      }
    });

    const updated = all.sort((a, b) => a.order - b.order);
    this.saveMenuMetadata(updated);
  }

  public async loadMenuMetadata(): Promise<void> {
    const menuOutputs: MenuOutput[] = await this.loadMenusFromApi();

    const savedMenuMetadata = this.storageService.loadFromLocalStorage<
      MenuMetadata[]
    >(this.MENUS_METADATA_KEY);

    let menuMetadata: MenuMetadata[];

    if (Array.isArray(savedMenuMetadata) && savedMenuMetadata.length > 0) {
      const existingSaved = savedMenuMetadata
        .filter((m) => menuOutputs.some((mo) => mo.id === m.id))
        .map((m) => {
          const menu = menuOutputs.find((mo) => mo.id === m.id)!;
          return {
            ...m,
            menu,
          } as MenuMetadata;
        })
        .sort((a, b) => a.order - b.order);

      const lastOrder = existingSaved.length
        ? existingSaved[existingSaved.length - 1].order
        : -1;

      const existingIds = new Set(existingSaved.map((m) => m.id));
      const newOnes = menuOutputs.filter((mo) => !existingIds.has(mo.id));
      const appended = newOnes.map(
        (menu, i) =>
          ({
            id: menu.id,
            order: lastOrder + i + 1,
            pinned: true,
            menu,
          }) as MenuMetadata
      );

      menuMetadata = [...existingSaved, ...appended].map((m) => ({
        ...m,
        menu: menuOutputs.find((mo) => mo.id === m.id)!,
      }));
    } else {
      menuMetadata = menuOutputs.map(
        (menu, i) =>
          ({
            id: menu.id,
            order: i,
            pinned: true,
            menu,
          }) as MenuMetadata
      );
    }

    this._menusMetadata.set(menuMetadata);
  }

  private saveMenuMetadata(menuMetadata: MenuMetadata[]): void {
    this.storageService.saveToLocalStorage(
      this.MENUS_METADATA_KEY,
      menuMetadata
    );
    this._menusMetadata.set(menuMetadata);
  }

  private async loadMenusFromApi(): Promise<MenuOutput[]> {
    const requests = this.apiService.getListForSideNav();
    return firstValueFrom(requests);
  }
}
