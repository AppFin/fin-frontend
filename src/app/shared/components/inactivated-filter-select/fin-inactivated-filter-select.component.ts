import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FinSelectComponent } from '../select/fin-select.component';
import { FinSelectComponentOptions } from '../select/fin-select-component-options';
import { Observable, of } from 'rxjs';
import { FinSelectOption } from '../select/fin-select-option';
import { PagedOutput } from '../../models/paginations/paged-output';

@Component({
  selector: 'fin-inactivated-filter-select',
  imports: [FinSelectComponent],
  templateUrl: './fin-inactivated-filter-select.component.html',
  styleUrl: './fin-inactivated-filter-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinInactivatedFilterSelectComponent {
  @Input() public formControl: FormControl<boolean | null>;

  public readonly readonly = input(false);
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly id = input(
    `fin-inactivated-filter-select-${Math.random().toString(36).substring(2, 9)}`
  );


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
          label: `finCore.features.shared.inactivatedFilter.inactivated`,
        },
        {
          value: false,
          label: `finCore.features.shared.inactivatedFilter.activated`,
        },
      ],
    } as PagedOutput<FinSelectOption<boolean | null>>);
  }
}
