import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { WalletService } from '../../../services/wallets/wallet.service';
import { WalletOutput } from '../../../types/wallets/wallet-output';
import { IFinGridCustomColumn } from '../../generics/grid/interface/i-fin-grid-custom-column';
import { FinGridSimpleColumnOption } from '../../generics/grid/models/columns/fin-grid-simple-column-option';
import { IFinGridColumnOption } from '../../generics/grid/models/columns/i-fin-grid-column-option';
import { FinIconComponent } from '../../generics/icon/fin-icon.component';
import { FinTextComponent } from '../../generics/text/fin-text.component';

@Component({
  selector: 'fin-wallet-column',
  imports: [FinIconComponent, FinTextComponent],
  templateUrl: './wallet-column.component.html',
  styleUrl: './wallet-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletColumnComponent<T> implements IFinGridCustomColumn<T> {
  public readonly wallet = signal<WalletOutput | null>(null);
  private readonly service = inject(WalletService);

  public async setItem(
    item: T,
    options: IFinGridColumnOption<T>
  ): Promise<void> {
    const id = (options as FinGridSimpleColumnOption<T>).getValue?.(item)?.toString();
    if (!id) return;

    const wallet = this.service.getCached(id);
    if (wallet) {
      this.wallet.set(wallet);
    }
    return Promise.resolve();
  }
}
