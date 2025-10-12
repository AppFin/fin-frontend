import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IFinGridCustomColumn } from '../../../interface/i-fin-grid-custom-column';
import { IFinGridColumnOption } from '../../columns/i-fin-grid-column-option';
import { FinGridMoneyColumnOption } from '../../columns/fin-grid-money-column-option';
import { FinTextComponent } from '../../../../text/fin-text.component';
import { FinMoneyPipe } from '../../../../../../pipes/money/fin-money.pipe';

@Component({
  selector: 'fin-grid-money-column',
  imports: [FinTextComponent, FinMoneyPipe],
  templateUrl: './fin-grid-money-column.component.html',
  styleUrl: './fin-grid-money-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinGridMoneyColumnComponent<T = any>
  implements IFinGridCustomColumn<T>
{
  public readonly value = signal(0);

  public setItem(item: T, options: IFinGridColumnOption<T>): void {
    if (!(options instanceof FinGridMoneyColumnOption))
      throw 'Options not FinGridMoneyColumnOption';
    this.value.set(options.getValue(item) ?? 0);
    console.log(this.value());
  }
}
