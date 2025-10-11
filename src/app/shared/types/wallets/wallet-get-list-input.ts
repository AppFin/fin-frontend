import { PagedFilteredAndSortedInput } from '../../models/paginations/paged-filtered-and-sorted-input';

export type WalletGetListInput = PagedFilteredAndSortedInput & {
  inactivated?: boolean;
};