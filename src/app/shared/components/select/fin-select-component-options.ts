import { PagedFilteredAndSortedInput } from '../../models/paginations/paged-filtered-and-sorted-input';
import { Observable } from 'rxjs';
import { PagedOutput } from '../../models/paginations/paged-output';
import { FinSelectOption } from './fin-select-option';

export class FinSelectComponentOptions {
  public readonly getOptions: (input: PagedFilteredAndSortedInput) => Observable<PagedOutput<FinSelectOption>>;
}