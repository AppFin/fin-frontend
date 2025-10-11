import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { IFinGridCustomColumn } from '../../../../shared/components/generics/grid/interface/i-fin-grid-custom-column';
import { WalletOutput } from '../../../../shared/types/wallets/wallet-output';
import { IFinGridColumnOption } from '../../../../shared/components/generics/grid/models/columns/i-fin-grid-column-option';
import { FinancialInstitutionOutput } from '../../../../shared/types/financial-institutions/financial-institution-output';
import { firstValueFrom } from 'rxjs';
import { FinIconComponent } from '../../../../shared/components/generics/icon/fin-icon.component';
import { FinTextComponent } from '../../../../shared/components/generics/text/fin-text.component';
import { FinancialInstitutionWalletColumnService } from './financial-institution-wallet-column.service';

@Component({
  selector: 'fin-financial-institution-wallet-column',
  imports: [FinIconComponent, FinTextComponent],
  templateUrl: './financial-institution-wallet-column.component.html',
  styleUrl: './financial-institution-wallet-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialInstitutionWalletColumnComponent
  implements IFinGridCustomColumn<WalletOutput>
{
  public readonly financialInstitution =
    signal<FinancialInstitutionOutput | null>(null);
  public readonly loading = signal(false);

  private readonly service = inject(FinancialInstitutionWalletColumnService);

  public async setItem(
    item: WalletOutput,
    options: IFinGridColumnOption<WalletOutput>
  ): Promise<void> {
    if (!item.financialInstitutionId) return;
    const financialInstitution = await firstValueFrom(
      this.service.get(item.financialInstitutionId)
    );
    this.financialInstitution.set(financialInstitution);
    this.loading.set(true);
  }
}
