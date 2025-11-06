import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TitleCategoryApiService } from '../../../services/title-categories/title-category-api.service';
import { TitleCategoryOutput } from '../../../types/title-categories/title-category-output';
import { IFinGridCustomColumn } from '../../generics/grid/interface/i-fin-grid-custom-column';
import { IFinGridColumnOption } from '../../generics/grid/models/columns/i-fin-grid-column-option';
import { TitleCategoriesColumnOption } from './title-categories-column-option';
import { ChipModule } from 'primeng/chip';
import { FinTextComponent } from "../../generics/text/fin-text.component";
import { FinIconComponent } from "../../generics/icon/fin-icon.component";

@Component({
  selector: 'fin-title-categories-column',
  imports: [ChipModule, FinTextComponent, FinIconComponent],
  templateUrl: './title-categories-column.component.html',
  styleUrl: './title-categories-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleCategoriesColumnComponent<T> implements IFinGridCustomColumn<T> {
  public readonly categories = signal<TitleCategoryOutput[]>([]);
  private readonly service = inject(TitleCategoryApiService);


  public async setItem(
    item: T,
    options: IFinGridColumnOption<T>
  ): Promise<void> {
    if (!(options instanceof TitleCategoriesColumnOption))
      throw 'Options not FinGridIconColumnOption';

    const ids = (options as TitleCategoriesColumnOption<T>).getValue?.(item);
    if (!ids || !Array.isArray(ids) || ids.length == 0) return;

    const categories = this.service.getListCached({ maxResultCount: 100, skipCount: 0 });
    if (categories.items.length > 0) {
      this.categories.set(categories.items.filter(category => {
        return ids.includes(category.id);
      }));
    }
    return Promise.resolve();
  }
}
