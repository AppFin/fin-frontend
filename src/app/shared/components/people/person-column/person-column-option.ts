import { IFinGridColumnOption } from '../../generics/grid/models/columns/i-fin-grid-column-option';
import { PersonColumnComponent } from './person-column.component';

export class PersonColumnOption<T> implements IFinGridColumnOption<T> {
  public header: string;
  public width?: string;
  public customColumn = PersonColumnComponent;
  public getValue: (item: T) => string[];

  constructor(op: Partial<PersonColumnOption<T>> = {}) {
    Object.assign(this, op);
  }
}
