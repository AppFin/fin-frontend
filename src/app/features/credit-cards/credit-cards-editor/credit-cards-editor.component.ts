import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first, firstValueFrom, iif, tap } from 'rxjs';
import { FinCardBrandSelectComponent } from "../../../shared/components/card-brands/card-brand-select/fin-card-brand-select.component";
import { FinFinancialInstitutionSelectComponent } from "../../../shared/components/financial-institution/financial-institution-select/fin-financial-institution-select.component";
import { FinInputComponent } from "../../../shared/components/generics/input/fin-input.component";
import { EditorLayoutComponent } from "../../../shared/components/generics/page-layout/editor-layout/editor-layout.component";
import { FinMoneyInputComponent } from "../../../shared/components/money-input/fin-money-input.component";
import { FinMonthDaySelectComponent } from "../../../shared/components/month-day-select/fin-month-day-select.component";
import { FinUserFriendlyColorPickerComponent } from "../../../shared/components/user-friendly-color-picker/fin-user-friendly-color-picker.component";
import { FinUserFriendlyIconPickerComponent } from "../../../shared/components/user-friendly-icon-picker/fin-user-friendly-icon-picker.component";
import { FinWalletSelectComponent } from "../../../shared/components/wallets/wallet-select/fin-wallet-select.component";
import { CreditCardCreateOrUpdateErrorCode } from '../../../shared/enums/credit-cards/credit-card-create-or-update-error-code';
import { EditorType } from '../../../shared/enums/layouts/editor-type';
import { CreditCardService } from '../../../shared/services/credit-cards/credit-card.service';
import { CreditCardInput } from '../../../shared/types/credit-cards/credit-card-input';
import { CreditCardOutput } from '../../../shared/types/credit-cards/credit-card-output';
import { FormGroupFromType } from '../../../shared/types/form/form-group-from-type';
import { nameAlreadyInUseValidator } from '../../../shared/validators/name-already-in-use-validator';

@Component({
  selector: 'fin-credit-cards-editor',
  imports: [EditorLayoutComponent, FinInputComponent, FinFinancialInstitutionSelectComponent, FinMoneyInputComponent, FinUserFriendlyColorPickerComponent, FinUserFriendlyIconPickerComponent, FinCardBrandSelectComponent, FinWalletSelectComponent, FinMonthDaySelectComponent, ReactiveFormsModule],
  templateUrl: './credit-cards-editor.component.html',
  styleUrl: './credit-cards-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditCardsEditorComponent implements OnInit {
  public formGroup: FormGroupFromType<CreditCardInput>;
  public readonly loading = signal(true);
  public readonly saving = signal(false);
  public readonly editorType = signal(EditorType.Create);
  public readonly entityEditingName = signal('');

  public readonly editorTypes = EditorType;

  private namesAlreadyInUse = signal<string[]>([]);

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(CreditCardService);
  private entityEditingId: string;


  public async ngOnInit(): Promise<void> {
    const editingEntity = await this.setEditing();
    this.setFormGroup(editingEntity);
  }

  public get canSave(): boolean {
    return (
      this.formGroup?.valid &&
      this.formGroup?.touched &&
      !this.loading() &&
      !this.saving()
    );
  }

  public close(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  public save(): void {
    if (!this.canSave) return;
    this.saving.set(true);

    const input = this.formGroup.getRawValue() as CreditCardInput;

    iif(
      () => this.editorType() === EditorType.Create,
      this.apiService.create(input),
      this.apiService.update(this.entityEditingId, input)
    )
      .pipe(
        tap((result) => {
          if (result[0]) return;
          if (
            result[2]?.errorCode ===
            CreditCardCreateOrUpdateErrorCode.NameAlreadyInUse
          ) {
            this.namesAlreadyInUse.update((ns) => {
              return [...ns, input.name];
            });
            this.formGroup.controls.name.updateValueAndValidity();
          }
        }),
        first(),
        finalize(() => this.saving.set(false))
      )
      .subscribe((result) => {
        if (result[0]) this.close();
      });
  }

  private async setEditing(): Promise<CreditCardOutput | null> {
    const id = this.activatedRoute.snapshot.paramMap.get('creditCardId');
    if (!id) return null;

    const entity = await firstValueFrom(this.apiService.get(id));
    this.editorType.set(EditorType.Edit);
    this.entityEditingId = id;
    this.entityEditingName.set(entity.name);
    return entity;
  }

  private setFormGroup(entityEditing: CreditCardOutput | null): void {
    this.formGroup = new FormGroupFromType<CreditCardInput>({
      name: new FormControl(entityEditing?.name ?? '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(100),
          nameAlreadyInUseValidator(() => this.namesAlreadyInUse()),
        ],
      }),
      color: new FormControl(entityEditing?.color ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      icon: new FormControl(entityEditing?.icon ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      financialInstitutionId: new FormControl(
        entityEditing?.financialInstitutionId ?? '',
        {
          validators: Validators.required,
          nonNullable: true
        }
      ),
      debitWalletId: new FormControl(
        entityEditing?.debitWalletId ?? '',
        {
          validators: Validators.required,
          nonNullable: true
        }
      ),
      cardBrandId: new FormControl(
        entityEditing?.cardBrandId ?? '',
        {
          validators: Validators.required,
          nonNullable: true
        }
      ),
      limit: new FormControl(entityEditing?.limit ?? 1, {
        validators: [Validators.min(1), Validators.required],
        nonNullable: true,
      }),
      closingDay: new FormControl(entityEditing?.closingDay ?? 0, {
        validators: [Validators.min(1), Validators.max(31), Validators.required],
        nonNullable: true,
      }),
      dueDay: new FormControl(entityEditing?.dueDay ?? 0, {
        validators: [Validators.min(1), Validators.max(31), Validators.required],
        nonNullable: true,
      }),
    });
    this.loading.set(false);
  }
}

