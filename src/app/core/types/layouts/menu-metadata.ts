import { MenuOutput } from './menu-output';

export type MenuMetadata = {
  id: string;
  order: number;
  pinned: boolean;
  menu: MenuOutput;
};
