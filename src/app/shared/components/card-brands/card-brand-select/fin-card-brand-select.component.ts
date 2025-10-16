import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Input,
} from '@angular/core';
import { FinIconComponent } from '../../generics/icon/fin-icon.component';
import { FinSelectComponent } from '../../generics/select/fin-select.component';
import { FinTextComponent } from '../../generics/text/fin-text.component';
import { FormControl } from '@angular/forms';
import { FinSelectComponentOptions } from '../../generics/select/fin-select-component-options';
import { PagedFilteredAndSortedInput } from '../../../models/paginations/paged-filtered-and-sorted-input';
import { Observable, of } from 'rxjs';
import { PagedOutput } from '../../../models/paginations/paged-output';
import { FinSelectOption } from '../../generics/select/fin-select-option';
import { CardBrandOutput } from '../../../../core/types/card-brands/card-brand-output';
import { CardBrandApiService } from '../../../../core/services/card-brand/card-brand-api.service';

@Component({
  selector: 'fin-card-brand-select',
  imports: [FinIconComponent, FinSelectComponent, FinTextComponent],
  templateUrl: './fin-card-brand-select.component.html',
  styleUrl: './fin-card-brand-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinCardBrandSelectComponent {
  @Input() public formControl: FormControl<string | null>;

  public readonly label = input('finCore.features.cardBrand.title');
  public readonly readonly = input(false);
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly id = input(
    `fin-card-brand-select-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly selectOptions =
    new FinSelectComponentOptions<string, CardBrandOutput>({
      getOptions: this.getCardBrandOptions.bind(this),
    });

  private readonly cardBrandService = inject(
    CardBrandApiService
  );

  private getCardBrandOptions(
    input: PagedFilteredAndSortedInput
  ): Observable<
    PagedOutput<FinSelectOption<string, CardBrandOutput>>
  > {
    const cardBrands =
      this.cardBrandService.getListCached({
        ...input
      });

    console.log(cardBrands);
    console.log(input);

    return of({
      totalCount: cardBrands.totalCount,
      items: cardBrands.items.map(
        (item) =>
          ({
            label: item.name,
            value: item.id,
            customValue: item,
          }) as FinSelectOption<string, CardBrandOutput>
      ),
    });
  }
}
