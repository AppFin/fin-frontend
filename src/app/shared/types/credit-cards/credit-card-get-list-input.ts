import { PagedFilteredAndSortedInput } from '../../models/paginations/paged-filtered-and-sorted-input';

export type CreditCardGetListInput = PagedFilteredAndSortedInput & {
  inactivated?: boolean;
  debitWalletIds: string[];
  financialInstitutionIds: string[];
  cardBrandIds: string[];
};