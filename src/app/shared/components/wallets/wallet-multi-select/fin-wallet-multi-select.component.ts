import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { PagedFilteredAndSortedInput } from '../../../models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../models/paginations/paged-output';
import { WalletService } from '../../../services/wallets/wallet.service';
import { WalletOutput } from '../../../types/wallets/wallet-output';
import { FinIconComponent } from '../../generics/icon/fin-icon.component';
import { FinMultiSelectComponent } from "../../generics/multi-select/fin-multi-select.component";
import { FinSelectComponentOptions } from '../../generics/select/fin-select-component-options';
import { FinSelectOption } from '../../generics/select/fin-select-option';
import { FinTextComponent } from '../../generics/text/fin-text.component';

@Component({
  selector: 'fin-multi-wallet-select',
  imports: [FinIconComponent, FinTextComponent, FinMultiSelectComponent],
  templateUrl: './fin-wallet-multi-select.component.html',
  styleUrl: './fin-wallet-multi-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinWalletSelectComponent {
  @Input() public formControl: FormControl<string[] | null>;

  public readonly label = input('finCore.features.wallet.titleSingular');
  public readonly readonly = input(false);
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly maxSelectedLabels = input<number | undefined>(5);
  public readonly id = input(
    `fin-multi-wallet-select-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly inactivatedFilter = input<boolean | undefined>(undefined);


  public readonly selectOptions =
    new FinSelectComponentOptions<string, WalletOutput>({
      getOptions: this.getWalletOptions.bind(this),
    });

  private readonly walletService = inject(
    WalletService
  );

  private getWalletOptions(
    input: PagedFilteredAndSortedInput
  ): Observable<
    PagedOutput<FinSelectOption<string, WalletOutput>>
  > {
    const wallets =
      this.walletService.getListCached({
        ...input,
        inactivated: this.inactivatedFilter(),
      });

    return of({
      totalCount: wallets.totalCount,
      items: wallets.items.map(
        (item) =>
          ({
            label: item.name,
            value: item.id,
            disabled: this.formControl.value?.includes(item.id) ? false : item.inactivated,
            customValue: item,
          }) as FinSelectOption<string, WalletOutput>
      ),
    });
  }
}
