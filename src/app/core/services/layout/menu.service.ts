import { Injectable } from '@angular/core';
import { MenuOutput } from '../../types/layouts/menu-output';
import { MenuPosition } from '../../enums/layouts/menu-position';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
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
}
