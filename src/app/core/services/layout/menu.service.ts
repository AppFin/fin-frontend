import { Injectable } from '@angular/core';
import { MenuOutput } from '../../types/layouts/menu-output';
import { MenuPosition } from '../../enums/layouts/menu-position';
import { MenuMetadata } from '../../types/layouts/menu-metadata';
import { Subject } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public readonly menusMetadataKey = 'menusMetadata';

  private readonly _menusMetadataChanged = new Subject<MenuMetadata[]>();
  public readonly menusMetadataChanged =
    this._menusMetadataChanged.asObservable();

  public getSideMenus(): Promise<MenuOutput[]> {
    return Promise.resolve([
      {
        icon: 'home',
        name: 'finCore.appName',
        frontRoute: '/',
        position: MenuPosition.LeftBottom,
        id: '5',
      },
      {
        icon: 'home',
        name: 'finCore.appName',
        frontRoute: '/',
        id: '4',
        position: MenuPosition.LeftBottom,
      },
      {
        icon: 'home',
        name: 'finCore.appName',
        frontRoute: '/',
        color: 'green',
        position: MenuPosition.LeftBottom,
        id: '1',
      },
      {
        icon: 'home',
        name: 'finCore.appName',
        frontRoute: '/',
        onlyForAdmin: true,
        position: MenuPosition.LeftTop,
        id: '2',
      },
      {
        icon: 'home',
        name: 'finCore.appName',
        frontRoute: '/',
        onlyForAdmin: true,
        color: 'red',
        position: MenuPosition.LeftTop,
        id: '3',
      },
    ] as MenuOutput[]);
  }

  public loadMenuMetadata(menuOutputs: MenuOutput[]): MenuMetadata[] {
    const savedMenuMetadataStr = localStorage.getItem(this.menusMetadataKey);
    const savedMenuMetadata = savedMenuMetadataStr
      ? JSON.parse(savedMenuMetadataStr)
      : null;

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

      return [...existingSaved, ...appended].map((m) => ({
        ...m,
        menu: menuOutputs.find((mo) => mo.id === m.id)!,
      }));
    }

    return menuOutputs.map(
      (menu, i) =>
        ({
          id: menu.id,
          order: i,
          pinned: true,
          menu,
        }) as MenuMetadata
    );
  }

  public unpinMenu(
    menuOutputs: MenuMetadata[],
    menuId: string
  ): MenuMetadata[] {
    const updated = menuOutputs.map((menu) =>
      menu.id == menuId ? { ...menu, pinned: false } : menu
    );
    this.saveMenuMetadata(updated);
    return updated;
  }

  public pinMenu(menuOutputs: MenuMetadata[], menuId: string): MenuMetadata[] {
    const updated = menuOutputs.map((menu) =>
      menu.id == menuId ? { ...menu, pinned: true } : menu
    );
    this.saveMenuMetadata(updated);
    return updated;
  }

  private saveMenuMetadata(menuOutputs: MenuMetadata[]): void {
    localStorage.setItem(this.menusMetadataKey, JSON.stringify(menuOutputs));
    this._menusMetadataChanged.next(menuOutputs);
  }

  public reorderMenu(
    menuMetadata: MenuMetadata[],
    menuMetadataPinned: MenuMetadata[],
    menuDropped: CdkDragDrop<MenuMetadata[]>
  ): MenuMetadata[] {
    const all = [...menuMetadata];
    if (menuDropped.previousIndex === menuDropped.currentIndex) return all;

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
    return updated;
  }
}
