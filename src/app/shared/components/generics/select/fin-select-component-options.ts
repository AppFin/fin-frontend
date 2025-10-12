import { PagedFilteredAndSortedInput } from '../../../models/paginations/paged-filtered-and-sorted-input';
import { Observable } from 'rxjs';
import { PagedOutput } from '../../../models/paginations/paged-output';
import { FinSelectOption } from './fin-select-option';

export class FinSelectComponentOptions<T = any, C = null> {
  public readonly getOptions: (input: PagedFilteredAndSortedInput) => Observable<PagedOutput<FinSelectOption<T, C>>>;

  constructor(input: Partial<FinSelectComponentOptions<T, C>> = {} ) {
    Object.assign(this, input);
  }
}