import { PagedFilteredAndSortedInput } from '../../models/paginations/paged-filtered-and-sorted-input';

export type TitleCategoryGetListInput = PagedFilteredAndSortedInput & {
  inactivated: boolean;
}