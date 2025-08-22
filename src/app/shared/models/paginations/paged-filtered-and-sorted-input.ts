import { FilteredProperty } from './filtered-property';
import { SortedProperty } from './sorted-property';

export class PagedFilteredAndSortedInput {
  public skipCount = 0;
  public maxResultCount = 15;
  public filter?: FilteredProperty;
  public sorts ?: SortedProperty[];
}