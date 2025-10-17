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

@Component({
  selector: 'fin-month-day-select',
  imports: [FinSelectComponent],
  templateUrl: './fin-month-day-select.component.html',
  styleUrl: './fin-month-day-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinMonthDaySelectComponent {
  @Input() public formControl: FormControl<number | null>;

  public readonly label = input('finCore.features.shared.monthDay');
  public readonly readonly = input(false);
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly id = input(
    `fin-month-day-select-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly inactivatedSelectOptions =
    new FinSelectComponentOptions({
      getOptions: this.getInactivatedOptions.bind(this),
    });

  private getInactivatedOptions(): Observable<
    PagedOutput<FinSelectOption<number>>
  > {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);


    return of({
      totalCount: days.length,
      items: days.map((day) => ({ label: String(day), value: day })),
    } as PagedOutput<FinSelectOption<number>>);
  }
}
