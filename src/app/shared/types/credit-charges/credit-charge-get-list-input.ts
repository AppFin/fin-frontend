import { PagedFilteredAndSortedInput } from '../../models/paginations/paged-filtered-and-sorted-input';

export type CreditChargeGetListInput = PagedFilteredAndSortedInput & {
  categoryIds?: string[];
  categoryOperator?: 'And' | 'Or';
  personIds?: string[];
  personOperator?: 'And' | 'Or';
  creditCardIds?: string[];
  dateFrom?: string; // YYYY-MM-DD format
  dateTo?: string; // YYYY-MM-DD format
};
