import { IFinGridColumnOption } from './i-fin-grid-column-option';
import { FinGridIconColumnComponent } from '../custom-columns/fin-grid-icon-column/fin-grid-icon-column.component';
import {
  FinFontAwesomeType,
  FinIconType,
} from '../../../icon/fin-icon.component';

export class FinGridIconColumnOption<T> implements IFinGridColumnOption<T> {
  public header: string;
  public width?: string;
  public getValue: (item: T) => FinIconOptions;
  public customColumn = FinGridIconColumnComponent;

  constructor(op: Partial<FinGridIconColumnOptionInput<T>> = {}) {
    Object.assign(this, op);
  }
}

export class FinGridIconColumnOptionInput<T> {
  public header: string;
  public width?: string;
  public getValue: (item: T) => FinIconOptions;
}

export class FinIconOptions {
  public icon: string;
  public tooltip: string;
  public color: string;
  public fontAwesomeType: FinFontAwesomeType = 'fas';
  public type: FinIconType = 'fontAwesome';
  public imageFolder: string = 'icons/';
  public imageExtension: string = '.png';

  constructor(op: Partial<FinIconOptions> = {}) {
    Object.assign(this, op);
  }
}