import { FinIconOptions } from './columns/fin-grid-icon-column-option';
import { Observable } from 'rxjs';

export interface IFinGridActionOption<T = any> {
  icon: (item: T) => FinIconOptions;
  canShow?: (item: T) => Observable<boolean>;
  disabled?: (item: T) => Observable<boolean>;
  onClick: (item: T) => Observable<void>;
}