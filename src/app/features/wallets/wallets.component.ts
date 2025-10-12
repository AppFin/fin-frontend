import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FinancialInstitutionWalletColumnService } from './wallets-list/FinancialInstitutionWalletColumnService/financial-institution-wallet-column.service';

@Component({
  selector: 'fin-wallets',
  imports: [RouterOutlet],
  templateUrl: './wallets.component.html',
  styleUrl: './wallets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsComponent implements OnDestroy {
  private readonly financialInstitutionWallerColumnService = inject(
    FinancialInstitutionWalletColumnService
  );

  public ngOnDestroy(): void {
    this.financialInstitutionWallerColumnService.clearCahce()
  }
}
