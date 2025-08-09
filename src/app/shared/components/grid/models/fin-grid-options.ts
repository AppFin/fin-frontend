import { PagedFilteredAndSortedInput } from '../../../models/paginations/paged-filtered-and-sorted-input';
import { Observable } from 'rxjs';
import { PagedOutput } from '../../../models/paginations/paged-output';
import { FinGridSimpleColumnOption } from './columns/fin-grid-simple-column-option';
import { IFinGridColumnOption } from './columns/i-fin-grid-column-option';

export class FinGridOptions<T = any> {
  public id: string;
  public getList: (input: PagedFilteredAndSortedInput) => Observable<PagedOutput<T>>;
  public getColumns: () => Observable<IFinGridColumnOption<T>[]>;
  public getActions: () => Observable<IFinGridColumnOption<T>[]>;
  public reloadItens: () => Observable<void>;
  public reloadIcons: () => Observable<void>;
  public reloadColumns: () => Observable<void>;

  constructor(options: Partial<FinGridOptions<T>> = {}) {
    Object.assign(this, options);
  }
}