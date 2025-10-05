import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FinSelectComponentOptions } from '../../../../shared/components/select/fin-select-component-options';
import { Observable, of } from 'rxjs';
import { PagedOutput } from '../../../../shared/models/paginations/paged-output';
import { FinSelectOption } from '../../../../shared/components/select/fin-select-option';
import { FinSelectComponent } from '../../../../shared/components/select/fin-select.component';

@Component({
  selector: 'fin-title-category-inactivated-filter-selector',
  imports: [FinSelectComponent],
  templateUrl: './title-category-inactivated-filter-selector.component.html',
  styleUrl: './title-category-inactivated-filter-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCategoryInactivatedFilterSelectorComponent {
  @Input() public formControl: FormControl<boolean | null>;

  public readonly titleCategoryInactivatedSelectOptions =
    new FinSelectComponentOptions({
      getOptions: this.getTitleCategoryInactivatedOptions.bind(this),
    });

  private getTitleCategoryInactivatedOptions(): Observable<
    PagedOutput<FinSelectOption<boolean | null>>
  > {
    return of({
      totalCount: 2,
      items: [
        {
          value: true,
          label: `finCore.features.titleCategory.type.inactivatedFilter.inactivated`,
        },
        {
          value: false,
          label: `finCore.features.titleCategory.type.inactivatedFilter.activated`,
        },
      ],
    } as PagedOutput<FinSelectOption<boolean | null>>);
  }
}
