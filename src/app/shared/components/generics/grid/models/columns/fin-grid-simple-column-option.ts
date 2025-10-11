import { IFinGridCustomColumn } from '../../interface/i-fin-grid-custom-column';
import { Type } from '@angular/core';
import { IFinGridColumnOption } from './i-fin-grid-column-option';

export class FinGridSimpleColumnOption<T> implements  IFinGridColumnOption<T> {
  public header: string;
  public width?: string;
  public getValue: (item: T) => string;
  public customColumn?: () => Type<IFinGridCustomColumn<T>>;

  constructor(op: Partial<FinGridSimpleColumnOption<T>> = {}) {
    Object.assign(this, op);
  }
}