import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Input,
} from '@angular/core';
import { FinSelectComponent } from '../../generics/select/fin-select.component';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { PagedOutput } from '../../../models/paginations/paged-output';
import { FinSelectOption } from '../../generics/select/fin-select-option';
import { FinSelectComponentOptions } from '../../generics/select/fin-select-component-options';
import { FinancialInstitutionApiService } from '../../../services/financial-institutions/financial-institution-api.service';
import { PagedFilteredAndSortedInput } from '../../../models/paginations/paged-filtered-and-sorted-input';
import { FinancialInstitutionOutput } from '../../../types/financial-institutions/financial-institution-output';
import { FinTextComponent } from '../../generics/text/fin-text.component';
import { FinIconComponent } from '../../generics/icon/fin-icon.component';

@Component({
  selector: 'fin-financial-institution-select',
  imports: [FinSelectComponent, FinTextComponent, FinIconComponent],
  templateUrl: './fin-financial-institution-select.component.html',
  styleUrl: './fin-financial-institution-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinFinancialInstitutionSelectComponent {
  @Input() public formControl: FormControl<string | null>;

  public readonly label = input('finCore.features.financialInstitutions.titleSingular');
  public readonly readonly = input(false);
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly id = input(
    `fin-financial-institution-select-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly inactivatedFilter = input<boolean | undefined>(undefined);

  public readonly titleFinancialInstitutionSelectOptions =
    new FinSelectComponentOptions<string, FinancialInstitutionOutput>({
      getOptions: this.getFinancialInstitutionOptions.bind(this),
    });

  private readonly financialInstitutionService = inject(
    FinancialInstitutionApiService
  );

  private getFinancialInstitutionOptions(
    input: PagedFilteredAndSortedInput
  ): Observable<
    PagedOutput<FinSelectOption<string, FinancialInstitutionOutput>>
  > {
    const financialInstitutions =
      this.financialInstitutionService.getListCached({
        ...input,
        inactive: this.inactivatedFilter(),
      });

    return of({
      totalCount: financialInstitutions.totalCount,
      items: financialInstitutions.items.map(
        (item) =>
          ({
            label: item.name,
            value: item.id,
            customValue: item,
          }) as FinSelectOption<string, FinancialInstitutionOutput>
      ),
    });
  }
}
