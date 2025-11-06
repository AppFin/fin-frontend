import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FinButtonComponent } from "../../../../shared/components/generics/button/fin-button.component";
import { FinDialogFooterDirective } from "../../../../shared/components/generics/dialog/fin-dialog-footer.directive";
import { SideModalLayoutComponent } from "../../../../shared/components/generics/side-modal-layout/side-modal-layout.component";
import { FinMultiplyFilterOperatorFilterSelectComponent } from "../../../../shared/components/multiply-filter-operator-filter-select/fin-multiply-filter-operator-filter-select.component";
import { TitleCategoryMultiSelectComponent } from "../../../../shared/components/title-categories/title-category-multi-select/title-category-multi-select.component";
import { MultiplyFilterOperator } from '../../../../shared/enums/filters/multiply-filter-operator';
import { TitleType } from '../../../../shared/enums/titles/title-type';
import { FormGroupFromType } from '../../../../shared/types/form/form-group-from-type';
import { FinInputComponent } from "../../../../shared/components/generics/input/fin-input.component";
import { FinTitlesTypeSelectComponent } from "../../../../shared/components/titles/titles-type-select/fin-titles-type-select.component";
import { FinWalletSelectComponent } from "../../../../shared/components/wallets/wallet-multi-select/fin-wallet-multi-select.component";
import { LayoutService } from '../../../../core/services/layout/layout.service';

export type TitleFilter = {
  categoryIds: string[];
  categoryOperator: MultiplyFilterOperator;
  walletIds: string[];
  type: TitleType | null;
  filter: string;
}

@Component({
  selector: 'fin-title-list-filter',
  imports: [
    SideModalLayoutComponent,
    FinDialogFooterDirective,
    FinButtonComponent,
    TitleCategoryMultiSelectComponent,
    FinMultiplyFilterOperatorFilterSelectComponent,
    FinInputComponent,
    FinTitlesTypeSelectComponent,
    FinWalletSelectComponent
  ],
  templateUrl: './title-list-filter.component.html',
  styleUrl: './title-list-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleListFilterComponent implements OnInit {
  public readonly applyFilter = output<TitleFilter | null>();
  public readonly currentAppliedFIlter = input<TitleFilter | null>();
  public form: FormGroupFromType<TitleFilter>;

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
    this.applyFilter.emit({ categoryIds: [], categoryOperator: MultiplyFilterOperator.Or, walletIds: [], type: null, filter: '' });
  }

  public apply(): void {
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;
    const filter = this.form.getRawValue();
    this.applyFilter.emit(filter)
  }

  public setForm(): void {
    this.form = new FormGroupFromType<TitleFilter>({
      categoryIds: new FormControl<string[]>([], { nonNullable: true }),
      categoryOperator: new FormControl<MultiplyFilterOperator>(MultiplyFilterOperator.Or, { validators: Validators.required, nonNullable: true }),
      walletIds: new FormControl<string[]>([], { nonNullable: true }),
      type: new FormControl<TitleType | null>(null),
      filter: new FormControl<string>('', { nonNullable: true })
    });

    const appliedFIlter = this.currentAppliedFIlter();
    if (appliedFIlter) this.form.patchValue(appliedFIlter);
  }
}
