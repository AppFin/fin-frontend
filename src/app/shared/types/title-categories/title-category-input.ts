import { TitleCategoryType } from '../../enums/title-categories/title-category-type';

export type TitleCategoryInput = {
  name: string;
  color: string;
  icon: string;
  type: TitleCategoryType;
}