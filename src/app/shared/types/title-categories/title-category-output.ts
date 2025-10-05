import { TitleCategoryType } from '../../enums/title-categories/title-category-type';

export type TitleCategoryOutput = {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: TitleCategoryType;
  inactivated: boolean;
}