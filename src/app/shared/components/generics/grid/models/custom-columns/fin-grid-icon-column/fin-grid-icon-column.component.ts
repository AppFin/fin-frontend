import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IFinGridCustomColumn } from '../../../interface/i-fin-grid-custom-column';
import {
  FinGridIconColumnOption,
  FinIconOptions,
} from '../../columns/fin-grid-icon-column-option';
import { IFinGridColumnOption } from '../../columns/i-fin-grid-column-option';
import { FinIconComponent } from '../../../../icon/fin-icon.component';

@Component({
  selector: 'fin-fin-grid-icon-column',
  imports: [FinIconComponent],
  templateUrl: './fin-grid-icon-column.component.html',
  styleUrl: './fin-grid-icon-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinGridIconColumnComponent<T = any>
  implements IFinGridCustomColumn<T>
{
  public iconOptions = signal<FinIconOptions | null>(null);

  public setItem(item: T, options: IFinGridColumnOption<T>): void {
    if (!(options instanceof FinGridIconColumnOption))
      throw 'Options not FinGridIconColumnOption';
    this.iconOptions.set(options.getValue(item));
  }
}
