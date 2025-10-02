import { IFinGridColumnOption } from './i-fin-grid-column-option';
import { FinGridImageColumnComponent, FinImageOptions } from '../custom-columns/fin-grid-image-column/fin-grid-image-column.component';

export class FinGridImageColumnOption<T> implements IFinGridColumnOption<T> {
  public header: string;
  public width?: string;
  public getValue: (item: T) => FinImageOptions;
  public customColumn = FinGridImageColumnComponent;

  constructor(op: Partial<FinGridImageColumnOptionInput<T>> = {}) {
    Object.assign(this, op);
  }
}

export class FinGridImageColumnOptionInput<T> {
  public header: string;
  public width?: string;
  public getValue: (item: T) => FinImageOptions;
}
