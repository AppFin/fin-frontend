import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FinancialInstitutionApiService } from '../../../services/financial-institutions/financial-institution-api.service';
import { FinancialInstitutionOutput } from '../../../types/financial-institutions/financial-institution-output';
import { IFinGridCustomColumn } from '../../generics/grid/interface/i-fin-grid-custom-column';
import { FinGridSimpleColumnOption } from '../../generics/grid/models/columns/fin-grid-simple-column-option';
import { IFinGridColumnOption } from '../../generics/grid/models/columns/i-fin-grid-column-option';
import { FinIconComponent } from '../../generics/icon/fin-icon.component';
import { FinTextComponent } from '../../generics/text/fin-text.component';

@Component({
  selector: 'fin-financial-institution-column',
  imports: [FinIconComponent, FinTextComponent],
  templateUrl: './financial-institution-column.component.html',
  styleUrl: './financial-institution-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialInstitutionColumnComponent<T> implements IFinGridCustomColumn<T> {
  public readonly financialInstitution = signal<FinancialInstitutionOutput | null>(null);
  private readonly service = inject(FinancialInstitutionApiService);

  public async setItem(
    item: T,
    options: IFinGridColumnOption<T>
  ): Promise<void> {
    const id = (options as FinGridSimpleColumnOption<T>).getValue(item)?.toString();
    if (!id) return;

    const financialInstitution = this.service.getCached(id);
    if (financialInstitution) {
      this.financialInstitution.set(financialInstitution);
    }
    return Promise.resolve();
  }
}
