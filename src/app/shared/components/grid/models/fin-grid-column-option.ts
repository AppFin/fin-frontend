import { IFinGridCustomColumn } from '../interface/i-fin-grid-custom-column';
import { Type } from '@angular/core';

export class FinGridColumnOption<T> {
  public field: string;
  public header: string;
  public width?: string;
  public getValue?: (item: T) => string;
  public customColumn?: Type<IFinGridCustomColumn<T>>;
}