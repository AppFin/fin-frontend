import { IFinGridColumnOption } from './i-fin-grid-column-option';
import { FinGridIconColumnComponent } from '../custom-columns/fin-grid-icon-column/fin-grid-icon-column.component';
import {
  FinFontAwesomeType,
  FinIconSize,
  FinIconType,
} from '../../../icon/fin-icon.component';
import { FinSeverity } from '../../../../../../core/types/themes/fin-severity';

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
  public tooltip?: string;
  public color?: string;
  public fontAwesomeType: FinFontAwesomeType = 'fa-solid';
  public type: FinIconType = 'fontAwesome';
  public imageFolder: string = 'icons/';
  public imageExtension: string = '.png';
  public severity: FinSeverity = 'primary';
  public boxColor: string = '';
  public size: FinIconSize = 'md';

  constructor(op: Partial<FinIconOptions> = {}) {
    Object.assign(this, op);
  }
}
