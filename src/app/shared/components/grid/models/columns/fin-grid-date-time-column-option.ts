import { IFinGridCustomColumn } from '../../interface/i-fin-grid-custom-column';
import { Type } from '@angular/core';
import { IFinGridColumnOption } from './i-fin-grid-column-option';
import { DatePipe } from '@angular/common';

export class FinGridDateTimeColumnOption<T> implements  IFinGridColumnOption<T> {
  public header: string;
  public width?: string;
  public format?: string;
  public getValue: (item: T) => Date;
  public type: 'datetime' | 'time' | 'date' = 'datetime';

  public getDateValue(item: T, datePipe: DatePipe): string {
    return datePipe.transform(this.getValue(item), this.format) ?? '';
  }

  constructor(op: Partial<FinGridDateTimeColumnOptionInput<T>> = {}) {
    Object.assign(this, op);
    this.setFormat();
  }

  private setFormat(): void {
    if (this.format) return;

    switch (this.type) {
      case "datetime":
        this.format = 'dd/MM/yyyy HH:mm'
        break;
      case "time":
        this.format = 'HH:mm'
        break;
      case "date":
        this.format = 'dd/MM/yyyy'
        break;
    }
  }
}

export class FinGridDateTimeColumnOptionInput<T> {
  public header: string;
  public width?: string;
  public getValue?: (item: T) => Date;
  public format?: string;
  public type: 'datetime' | 'time' | 'date' = 'datetime';
  public customColumn?: () => Type<IFinGridCustomColumn<T>>;
}