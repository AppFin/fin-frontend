import { ChangeDetectionStrategy, Component, OnInit, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FinButtonComponent } from "../../../../shared/components/generics/button/fin-button.component";
import { FinDialogFooterDirective } from "../../../../shared/components/generics/dialog/fin-dialog-footer.directive";
import { SideModalLayoutComponent } from "../../../../shared/components/generics/side-modal-layout/side-modal-layout.component";
import { MultiplyFilterOperator } from '../../../../shared/enums/filters/multiply-filter-operator';
import { TitleType } from '../../../../shared/enums/titles/title-type';
import { FormGroupFromType } from '../../../../shared/types/form/form-group-from-type';

export type TitleFilter = {
  categoryIds: string[];
  categoryOperator: MultiplyFilterOperator;
  walletIds: string[];
  type: TitleType | null;
}

@Component({
  selector: 'fin-title-list-filter',
  imports: [SideModalLayoutComponent, FinDialogFooterDirective, FinButtonComponent],
  templateUrl: './title-list-filter.component.html',
  styleUrl: './title-list-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleListFilterComponent implements OnInit {
  public readonly applyFilter = output<TitleFilter | null>();
  public form: FormGroupFromType<TitleFilter>;

  public ngOnInit(): void {
    this.setForm();
  }

  public cancel(): void {
    this.applyFilter.emit(null);
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
      categoryOperator: new FormControl<MultiplyFilterOperator>(MultiplyFilterOperator.Or, { nonNullable: true }),
      walletIds: new FormControl<string[]>([], { nonNullable: true }),
      type: new FormControl<TitleType | null>(null)
    })
  }
}
