import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FinSelectComponentOptions } from '../../../../shared/components/select/fin-select-component-options';
import { Observable, of } from 'rxjs';
import { PagedOutput } from '../../../../shared/models/paginations/paged-output';
import { FinSelectOption } from '../../../../shared/components/select/fin-select-option';
import { TitleCategoryType } from '../../../../shared/enums/title-categories/title-category-type';
import { FinSelectComponent } from '../../../../shared/components/select/fin-select.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'fin-title-category-type-select',
  imports: [FinSelectComponent],
  templateUrl: './title-category-type-select.component.html',
  styleUrl: './title-category-type-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCategoryTypeSelectComponent {
  @Input() public formControl: FormControl<TitleCategoryType|null>;

  public readonly titleCategorySelectOptions = new FinSelectComponentOptions({
    getOptions: this.getTitleCategoryOptions.bind(this),
  });

  private getTitleCategoryOptions(): Observable<
    PagedOutput<FinSelectOption<TitleCategoryType>>
  > {
    return of({
      totalCount: 2,
      items: Object.values(TitleCategoryType)
        .filter((e) => typeof e !== 'string')
        .map((e) => {
          return {
            value: e,
            label: `finCore.features.titleCategory.type.${TitleCategoryType[e].toLowerCase()}`,
          };
        }),
    } as PagedOutput<FinSelectOption<TitleCategoryType>>);
  }
}
