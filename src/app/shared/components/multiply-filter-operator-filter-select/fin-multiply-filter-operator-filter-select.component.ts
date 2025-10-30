import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FinSelectComponent } from '../generics/select/fin-select.component';
import { FinSelectComponentOptions } from '../generics/select/fin-select-component-options';
import { Observable, of } from 'rxjs';
import { FinSelectOption } from '../generics/select/fin-select-option';
import { PagedOutput } from '../../models/paginations/paged-output';
import { MultiplyFilterOperator } from '../../enums/filters/multiply-filter-operator';

@Component({
  selector: 'fin-multiply-filter-operator-filter-select',
  imports: [FinSelectComponent],
  templateUrl: './fin-multiply-filter-operator-filter-select.component.html',
  styleUrl: './fin-multiply-filter-operator-filter-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinMultiplyFilterOperatorFilterSelectComponent {
  @Input() public formControl: FormControl<MultiplyFilterOperator | null>;

  public readonly readonly = input(false);
  public readonly label = input('finCore.features.shared.multiplyFilterOperator.title');
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly id = input(
    `fin-multiply-filter-operator-filter-select-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly inactivatedSelectOptions =
    new FinSelectComponentOptions({
      getOptions: this.getInactivatedOptions.bind(this),
    });

  private getInactivatedOptions(): Observable<
    PagedOutput<FinSelectOption<MultiplyFilterOperator>>
  > {
    return of({
      totalCount: 2,
      items: [
        {
          value: MultiplyFilterOperator.Or,
          label: `finCore.features.shared.multiplyFilterOperator.or`,
        },
        {
          value: MultiplyFilterOperator.And,
          label: `finCore.features.shared.multiplyFilterOperator.and`,
        },
      ],
    } as PagedOutput<FinSelectOption<MultiplyFilterOperator>>);
  }
}
