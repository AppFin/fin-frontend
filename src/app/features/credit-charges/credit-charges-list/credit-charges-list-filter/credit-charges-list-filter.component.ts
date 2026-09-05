import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LayoutService } from '../../../../core/services/layout/layout.service';
import { FinCreditCardMultiSelectComponent } from '../../../../shared/components/credit-cards/fin-credit-card-multi-select.component';
import { FinButtonComponent } from '../../../../shared/components/generics/button/fin-button.component';
import { FinDatetimeComponent } from '../../../../shared/components/generics/datetime/fin-date-time.component';
import { FinDialogFooterDirective } from '../../../../shared/components/generics/dialog/fin-dialog-footer.directive';
import { FinInputComponent } from '../../../../shared/components/generics/input/fin-input.component';
import { SideModalLayoutComponent } from '../../../../shared/components/generics/side-modal-layout/side-modal-layout.component';
import { FinMultiplyFilterOperatorFilterSelectComponent } from '../../../../shared/components/multiply-filter-operator-filter-select/fin-multiply-filter-operator-filter-select.component';
import { PersonMultiSelectComponent } from '../../../../shared/components/people/person-multi-select/person-multi-select.component';
import { TitleCategoryMultiSelectComponent } from '../../../../shared/components/title-categories/title-category-multi-select/title-category-multi-select.component';
import { MultiplyFilterOperator } from '../../../../shared/enums/filters/multiply-filter-operator';
import { FormGroupFromType } from '../../../../shared/types/form/form-group-from-type';

export type CreditChargeListFilter = {
  creditCardIds: string[];
  filter: string;
  categoryIds: string[];
  categoryOperator: MultiplyFilterOperator;
  personIds: string[];
  personOperator: MultiplyFilterOperator;
  dateFrom?: string; // YYYY-MM-DD format
  dateTo?: string; // YYYY-MM-DD format
};

@Component({
  selector: 'fin-credit-charges-list-filter',
  imports: [
    SideModalLayoutComponent,
    FinDialogFooterDirective,
    FinButtonComponent,
    TitleCategoryMultiSelectComponent,
    FinMultiplyFilterOperatorFilterSelectComponent,
    FinInputComponent,
    FinDatetimeComponent,
    PersonMultiSelectComponent,
    FinCreditCardMultiSelectComponent,
  ],
  templateUrl: './credit-charges-list-filter.component.html',
  styleUrl: './credit-charges-list-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditChargeListFilterComponent implements OnInit {
  public readonly applyFilter = output<CreditChargeListFilter | null>();
  public readonly currentAppliedFilter = input<CreditChargeListFilter | null>();
  public form: FormGroupFromType<CreditChargeListFilter>;

  private readonly layoutService = inject(LayoutService);

  public ngOnInit(): void {
    this.setForm();
  }

  public get isMobile(): boolean {
    return this.layoutService.isMobile;
  }

  public cancel(): void {
    this.applyFilter.emit(null);
  }

  public clear(): void {
    this.applyFilter.emit({
      creditCardIds: [],
      categoryIds: [],
      categoryOperator: MultiplyFilterOperator.Or,
      filter: '',
      personIds: [],
      personOperator: MultiplyFilterOperator.Or,
      dateFrom: undefined,
      dateTo: undefined,
    });
  }

  public apply(): void {
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;
    const filter = this.form.getRawValue();
    this.applyFilter.emit(filter);
  }

  public setForm(): void {
    this.form = new FormGroupFromType<CreditChargeListFilter>({
      creditCardIds: new FormControl<string[]>([], { nonNullable: true }),
      categoryIds: new FormControl<string[]>([], { nonNullable: true }),
      categoryOperator: new FormControl<MultiplyFilterOperator>(
        MultiplyFilterOperator.Or,
        { validators: Validators.required, nonNullable: true }
      ),
      personIds: new FormControl<string[]>([], { nonNullable: true }),
      personOperator: new FormControl<MultiplyFilterOperator>(
        MultiplyFilterOperator.Or,
        { validators: Validators.required, nonNullable: true }
      ),
      filter: new FormControl<string>('', { nonNullable: true }),
      dateFrom: new FormControl<string | undefined>(undefined),
      dateTo: new FormControl<string | undefined>(undefined),
    });

    const appliedFilter = this.currentAppliedFilter();
    if (appliedFilter) this.form.patchValue(appliedFilter);
  }
}
