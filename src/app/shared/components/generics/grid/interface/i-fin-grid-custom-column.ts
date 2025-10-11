import { IFinGridColumnOption } from '../models/columns/i-fin-grid-column-option';

export interface IFinGridCustomColumn<T> {
  setItem: (item: T, options: IFinGridColumnOption<T>) => void;
}