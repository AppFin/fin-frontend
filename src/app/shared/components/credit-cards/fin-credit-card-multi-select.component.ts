import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { PagedFilteredAndSortedInput } from '../../models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../models/paginations/paged-output';
import { CreditCardService } from '../../services/credit-cards/credit-card.service';
import { CreditCardOutput } from '../../types/credit-cards/credit-card-output';
import { FinMultiSelectComponent } from '../generics/multi-select/fin-multi-select.component';
import { FinSelectComponentOptions } from '../generics/select/fin-select-component-options';
import { FinSelectOption } from '../generics/select/fin-select-option';
import { FinTextComponent } from '../generics/text/fin-text.component';

@Component({
  selector: 'fin-credit-card-multi-select',
  imports: [FinTextComponent, FinMultiSelectComponent],
  templateUrl: './fin-credit-card-multi-select.component.html',
  styleUrl: './fin-credit-card-multi-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinCreditCardMultiSelectComponent {
  @Input() public formControl: FormControl<string[] | null>;

  public readonly label = input('finCore.features.creditCard.titleSingular');
  public readonly readonly = input(false);
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly maxSelectedLabels = input<number | undefined>(5);
  public readonly id = input(
    `fin-credit-card-multi-select-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly inactivatedFilter = input<boolean | undefined>(undefined);

  public readonly selectOptions = new FinSelectComponentOptions<
    string,
    CreditCardOutput
  >({
    getOptions: this.getCreditCardOptions.bind(this),
  });

  private readonly creditCardService = inject(CreditCardService);

  private getCreditCardOptions(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<FinSelectOption<string, CreditCardOutput>>> {
    const creditCards = this.creditCardService.getListCached({
      ...input,
      inactivated: this.inactivatedFilter(),
    });

    return of({
      totalCount: creditCards.totalCount,
      items: creditCards.items.map(
        (item) =>
          ({
            label: item.name,
            value: item.id,
            disabled: this.formControl.value?.includes(item.id)
              ? false
              : item.inactivated,
            customValue: item,
          }) as FinSelectOption<string, CreditCardOutput>
      ),
    });
  }
}
