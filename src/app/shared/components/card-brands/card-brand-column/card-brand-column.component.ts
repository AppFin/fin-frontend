import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CardBrandApiService } from '../../../../core/services/card-brand/card-brand-api.service';
import { CardBrandOutput } from '../../../../core/types/card-brands/card-brand-output';
import { IFinGridCustomColumn } from '../../generics/grid/interface/i-fin-grid-custom-column';
import { FinGridSimpleColumnOption } from '../../generics/grid/models/columns/fin-grid-simple-column-option';
import { IFinGridColumnOption } from '../../generics/grid/models/columns/i-fin-grid-column-option';
import { FinIconComponent } from '../../generics/icon/fin-icon.component';
import { FinTextComponent } from '../../generics/text/fin-text.component';

@Component({
  selector: 'fin-card-brand-column',
  imports: [FinIconComponent, FinTextComponent],
  templateUrl: './card-brand-column.component.html',
  styleUrl: './card-brand-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBrandColumnComponent<T> implements IFinGridCustomColumn<T> {
  public readonly cardBrand = signal<CardBrandOutput | null>(null);
  private readonly service = inject(CardBrandApiService);

  public async setItem(
    item: T,
    options: IFinGridColumnOption<T>
  ): Promise<void> {
    const id = (options as FinGridSimpleColumnOption<T>).getValue(item)?.toString();
    if (!id) return;

    const cardBrand = this.service.getCached(id);
    if (cardBrand) {
      this.cardBrand.set(cardBrand);
    }
    return Promise.resolve();
  }
}
