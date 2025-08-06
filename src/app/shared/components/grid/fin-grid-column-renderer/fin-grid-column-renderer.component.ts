import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FinGridColumnOption } from '../models/fin-grid-column-option';
import { FinTextComponent } from '../../text/fin-text.component';

@Component({
  selector: 'fin-grid-column-renderer',
  imports: [FinTextComponent],
  templateUrl: './fin-grid-column-renderer.component.html',
  styleUrl: './fin-grid-column-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinGridColumnRendererComponent<T> {
  public readonly item = input<T>();
  public readonly columnOption = input<FinGridColumnOption<T>>();

  public readonly value = computed(() =>
    this.getValue(this.item(), this.columnOption())
  );

  private getValue(item?: T, columnOption?: FinGridColumnOption<T>): string {
    if (!columnOption?.field && !columnOption?.getValue)
      throw new Error('Invalid column option');
    if (!item) throw new Error('Invalid item');

    let value: string;
    if (columnOption?.getValue) value = columnOption.getValue(item);
    else value = (item as any)[columnOption.field];

    return value;
  }
}
