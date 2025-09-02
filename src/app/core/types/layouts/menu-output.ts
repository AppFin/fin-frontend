import { MenuPosition } from '../../enums/layouts/menu-position';

export type MenuOutput = {
  id: string;
  frontRoute: string;
  name: string;
  icon: string;
  color: string;
  keyWords: string;
  onlyForAdmin: boolean;
  position: MenuPosition;
};
