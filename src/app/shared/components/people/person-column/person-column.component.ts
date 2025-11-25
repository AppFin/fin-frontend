import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { PeopleService } from '../../../services/people/person.service';
import { PersonOutput } from '../../../types/people/person-output';
import { IFinGridCustomColumn } from '../../generics/grid/interface/i-fin-grid-custom-column';
import { IFinGridColumnOption } from '../../generics/grid/models/columns/i-fin-grid-column-option';
import { FinTextComponent } from '../../generics/text/fin-text.component';
import { PersonColumnOption } from './person-column-option';

@Component({
  selector: 'fin-person-column',
  imports: [ChipModule, FinTextComponent],
  templateUrl: './person-column.component.html',
  styleUrl: './person-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonColumnComponent<T> implements IFinGridCustomColumn<T> {
  public readonly categories = signal<PersonOutput[]>([]);
  private readonly service = inject(PeopleService);

  public async setItem(
    item: T,
    options: IFinGridColumnOption<T>
  ): Promise<void> {
    if (!(options instanceof PersonColumnOption))
      throw 'Options not FinGridIconColumnOption';

    const ids = (options as PersonColumnOption<T>).getValue?.(item);
    if (!ids || !Array.isArray(ids) || ids.length == 0) return;

    const categories = this.service.getListCached({
      maxResultCount: 100,
      skipCount: 0,
    });
    if (categories.items.length > 0) {
      this.categories.set(
        categories.items.filter((category) => {
          return ids.includes(category.id);
        })
      );
    }
    return Promise.resolve();
  }
}
