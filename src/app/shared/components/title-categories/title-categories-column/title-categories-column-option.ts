import { IFinGridColumnOption } from "../../generics/grid/models/columns/i-fin-grid-column-option";
import { TitleCategoriesColumnComponent } from "./title-categories-column.component";

export class TitleCategoriesColumnOption<T> implements IFinGridColumnOption<T> {
  public header: string;
  public width?: string;
  public customColumn = TitleCategoriesColumnComponent;
  public getValue: (item: T) => string[];

  constructor(op: Partial<TitleCategoriesColumnOption<T>> = {}) {
    Object.assign(this, op);
  }
}
