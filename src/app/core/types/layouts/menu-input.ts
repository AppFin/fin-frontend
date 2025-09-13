import { MenuPosition } from '../../enums/layouts/menu-position';

export type MenuInput = {
  frontRoute: string;
  name: string;
  icon: string;
  color: string;
  keyWords: string;
  onlyForAdmin: boolean;
  position: MenuPosition;
}