import { PagedFilteredAndSortedInput } from '../../../models/paginations/paged-filtered-and-sorted-input';
import { Observable } from 'rxjs';
import { PagedOutput } from '../../../models/paginations/paged-output';
import { IFinGridColumnOption } from './columns/i-fin-grid-column-option';
import { IFinGridActionOption } from './i-fin-grid-action-option';
import { NotificationSeverity } from '../../../../core/enums/notifications/notification-severity';

export class FinGridOptions<T = any> {
  public id: string;
  public getList: (
    input: PagedFilteredAndSortedInput
  ) => Observable<PagedOutput<T>>;
  public getColumns: () => Observable<IFinGridColumnOption<T>[]>;
  public getActions: () => Observable<IFinGridActionOption<T>[]>;
  public getRightActions: () => Observable<IFinGridActionOption<T>[]>;
  public reloadItens: Observable<void>;
  public reloadActions: Observable<void>;
  public reloadColumns: Observable<void>;


  public rowStyle?: (item: T) => ({[p: string]: any} | null | undefined)

  public deleteOptions?: FinGridOnDeleteOptions<T>;
  public onEdit?: (item: T) => Observable<void>;
  public onToggleInactive?: (item: T) => Observable<void>;
  public getInactive?: (item: T) => boolean;


  constructor(options: Partial<FinGridOptions<T>> = {}) {
    Object.assign(this, options);
  }
}

export class FinGridOnDeleteOptions<T = any> {
  public onDelete?: (item: T) => Observable<void>;
  public confirmDeleteMessage?: string;
  public successMessage?: string;
}

export class FinGridInfoOptions {
  public message: string;
  public severity?: NotificationSeverity;
  
  constructor(message: string, severity: NotificationSeverity = NotificationSeverity.Success) {
    this.message = message;
    this.severity = severity;
  }
}
