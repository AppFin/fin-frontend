import { ChangeDetectionStrategy, Component, inject, Input, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { PagedFilteredAndSortedInput } from '../../../models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../models/paginations/paged-output';
import { TitleCategoryApiService } from '../../../services/title-categories/title-category-api.service';
import { TitleCategoryOutput } from '../../../types/title-categories/title-category-output';
import { FinSelectComponentOptions } from '../../generics/select/fin-select-component-options';
import { FinSelectOption } from '../../generics/select/fin-select-option';
import { FinMultiSelectComponent } from "../../generics/multi-select/fin-multi-select.component";
import { FinTextComponent } from "../../generics/text/fin-text.component";
import { FinIconComponent } from "../../generics/icon/fin-icon.component";

@Component({
  selector: 'fin-title-category-multi-select',
  imports: [FinMultiSelectComponent, FinTextComponent, FinIconComponent],
  templateUrl: './title-category-multi-select.component.html',
  styleUrl: './title-category-multi-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleCategoryMultiSelectComponent {
  @Input() public formControl: FormControl<string[]>;

  public readonly label = input('finCore.features.titleCategory.title');
  public readonly readonly = input(false);
  public readonly maxSelectedLabels = input(10);
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly id = input(
    `fin-title-category-multi-select-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly selectOptions =
    new FinSelectComponentOptions<string, TitleCategoryOutput>({
      getOptions: this.getCardBrandOptions.bind(this),
    });

  private readonly cardBrandService = inject(
    TitleCategoryApiService
  );

  private getCardBrandOptions(
    input: PagedFilteredAndSortedInput
  ): Observable<
    PagedOutput<FinSelectOption<string, TitleCategoryOutput>>
  > {
    const cardBrands =
      this.cardBrandService.getListCached({
        ...input
      });

    return of({
      totalCount: cardBrands.totalCount,
      items: cardBrands.items.map(
        (item) =>
          ({
            label: item.name,
            value: item.id,
            customValue: item,
          }) as FinSelectOption<string, TitleCategoryOutput>
      ),
    });
  }
}
