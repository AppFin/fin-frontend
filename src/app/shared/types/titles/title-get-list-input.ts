import { MultiplyFilterOperator } from '../../enums/filters/multiply-filter-operator';
import { TitleType } from '../../enums/titles/title-type';
import { PagedFilteredAndSortedInput } from '../../models/paginations/paged-filtered-and-sorted-input';

export type TitleGetListInput = PagedFilteredAndSortedInput & {
  categoryIds: string[];
  categoryOperator: MultiplyFilterOperator;
  walletIds: string[];
  type?: TitleType;
};
