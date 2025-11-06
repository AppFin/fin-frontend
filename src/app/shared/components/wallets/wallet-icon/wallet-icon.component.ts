import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { WalletService } from '../../../services/wallets/wallet.service';
import { WalletOutput } from '../../../types/wallets/wallet-output';
import { FinIconComponent } from "../../generics/icon/fin-icon.component";
import { FinancialInstitutionOutput } from '../../../types/financial-institutions/financial-institution-output';
import { FinancialInstitutionApiService } from '../../../services/financial-institutions/financial-institution-api.service';

@Component({
  selector: 'fin-wallet-icon',
  imports: [FinIconComponent],
  templateUrl: './wallet-icon.component.html',
  styleUrl: './wallet-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletIconComponent {
  public readonly walletId = input.required<string>();

  public readonly walletItem = computed(() => this.getWallet(this.walletId()));
  public readonly financialInstitutionItem = computed(() => this.getFinancialInstitution(this.walletItem()?.financialInstitutionId ?? null));

  private readonly walletService = inject(WalletService);
  private readonly financialInstitutionService = inject(FinancialInstitutionApiService);

  private getWallet(walletId: string): WalletOutput | undefined {
    if (!walletId) return undefined;
    return this.walletService.getCached(walletId);
  }

  private getFinancialInstitution(financialInstitutionId: string | null): FinancialInstitutionOutput | undefined {
    if (!financialInstitutionId) return undefined;
    return this.financialInstitutionService.getCached(financialInstitutionId);
  }
}
