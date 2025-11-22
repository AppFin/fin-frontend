import { PagedFilteredAndSortedInput } from '../../models/paginations/paged-filtered-and-sorted-input';

export type PersonGetListInput = PagedFilteredAndSortedInput & {
  inactivated?: boolean;
};
