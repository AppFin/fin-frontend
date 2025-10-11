import { IFinGridColumnOption } from './i-fin-grid-column-option';
import { FinGridMoneyColumnComponent } from '../custom-columns/fin-grid-money-column/fin-grid-money-column.component';

export class FinGridMoneyColumnOption<T> implements IFinGridColumnOption<T> {
  public header: string;
  public width?: string;
  public getValue: (item: T) => number;
  public customColumn = FinGridMoneyColumnComponent;

  constructor(op: Partial<FinGridMoneyColumnOptionInput<T>> = {}) {
    Object.assign(this, op);
  }
}

export class FinGridMoneyColumnOptionInput<T> {
  public header: string;
  public width?: string;
  public getValue: (item: T) => number;
}
