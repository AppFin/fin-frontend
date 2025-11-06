import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { TitleType } from '../../../enums/titles/title-type';
import { PagedOutput } from '../../../models/paginations/paged-output';
import { FinSelectComponentOptions } from '../../generics/select/fin-select-component-options';
import { FinSelectOption } from '../../generics/select/fin-select-option';
import { FinSelectComponent } from "../../generics/select/fin-select.component";

@Component({
  selector: 'fin-titles-type-select',
  imports: [FinSelectComponent],
  templateUrl: './fin-titles-type-select.component.html',
  styleUrl: './fin-titles-type-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinTitlesTypeSelectComponent {
  @Input() public formControl: FormControl<TitleType | null>;

  public readonly readonly = input(false);
  public readonly label = input('finCore.features.shared.type');
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly id = input(
    `fin-titles-type-select-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly inactivatedSelectOptions =
    new FinSelectComponentOptions({
      getOptions: this.getInactivatedOptions.bind(this),
    });

  private getInactivatedOptions(): Observable<
    PagedOutput<FinSelectOption<TitleType>>
  > {
    return of({
      totalCount: 2,
      items: [
        {
          value: TitleType.Expense,
          label: `finCore.features.title.type.expense`,
        },
        {
          value: TitleType.Income,
          label: `finCore.features.title.type.income`,
        },
      ],
    } as PagedOutput<FinSelectOption<TitleType>>);
  }
}
