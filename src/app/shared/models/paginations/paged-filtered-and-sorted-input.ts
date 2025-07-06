import { FilteredProperty } from './filtered-property';
import { SortedProperty } from './sorted-property';

export class PagedFilteredAndSortedInput {
  public skipCount: number;
  public maxResultCount : number;
  public filter?: FilteredProperty;
  public sorts ?: SortedProperty[];
}