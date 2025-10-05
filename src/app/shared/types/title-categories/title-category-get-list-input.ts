import { PagedFilteredAndSortedInput } from '../../models/paginations/paged-filtered-and-sorted-input';
import { TitleCategoryType } from '../../enums/title-categories/title-category-type';

export type TitleCategoryGetListInput = PagedFilteredAndSortedInput & {
  inactivated?: boolean;
  type?: TitleCategoryType;
}