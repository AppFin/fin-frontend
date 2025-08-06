import { PagedFilteredAndSortedInput } from '../../../models/paginations/paged-filtered-and-sorted-input';
import { Observable } from 'rxjs';
import { PagedOutput } from '../../../models/paginations/paged-output';
import { FinGridColumnOption } from './fin-grid-column-option';

export class FinGridOptions<T = any> {
  public id: string;
  public getList: (input: PagedFilteredAndSortedInput) => Observable<PagedOutput<T>>;
  public getColumns: () => Observable<FinGridColumnOption<any>[]>;
  public reloadItens: () => Observable<void>;
  public reloadColumns: () => Observable<void>;
}