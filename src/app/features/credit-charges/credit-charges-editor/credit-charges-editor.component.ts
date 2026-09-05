import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, finalize, first, firstValueFrom, iif } from 'rxjs';
import { ifVerticalAnimation } from '../../../shared/animations/if-vertical.animation';
import { FinCreditCardSelectComponent } from '../../../shared/components/credit-cards/fin-credit-card-select.component';
import { FinDatetimeComponent } from '../../../shared/components/generics/datetime/fin-date-time.component';
import { FinInputComponent } from '../../../shared/components/generics/input/fin-input.component';
import { FinNumberInputComponent } from '../../../shared/components/generics/number-input/fin-number-input.component';
import { EditorLayoutComponent } from '../../../shared/components/generics/page-layout/editor-layout/editor-layout.component';
import { FinToggleSwitchComponent } from '../../../shared/components/generics/toggle-switch/fin-toggle-switch.component';
import { FinMoneyInputComponent } from '../../../shared/components/money-input/fin-money-input.component';
import { PersonMultiSelectComponent } from '../../../shared/components/people/person-multi-select/person-multi-select.component';
import { FinPersonSelectComponent } from '../../../shared/components/people/person-select/fin-person-select.component';
import { FinPercentageInputComponent } from '../../../shared/components/percentage/fin-percentage-input.component';
import { TitleCategoryMultiSelectComponent } from '../../../shared/components/title-categories/title-category-multi-select/title-category-multi-select.component';
import { EditorType } from '../../../shared/enums/layouts/editor-type';
import { CreditChargeService } from '../../../shared/services/credit-charges/credit-charge.service';
import { CreditChargeInput } from '../../../shared/types/credit-charges/credit-charge-input';
import { CreditChargeOutput } from '../../../shared/types/credit-charges/credit-charge-output';
import { CreditChargePersonInput } from '../../../shared/types/credit-charges/credit-charge-person-input';
import { FormGroupFromType } from '../../../shared/types/form/form-group-from-type';
import { noDuplicatesValidator } from '../../../shared/validators/no-duplicates-validator';
import { sumRangeValidator } from '../../../shared/validators/sum-range-validator';

@Component({
  selector: 'fin-credit-charges-editor',
  imports: [
    EditorLayoutComponent,
    FinInputComponent,
    FinCreditCardSelectComponent,
    FinMoneyInputComponent,
    FinNumberInputComponent,
    FinDatetimeComponent,
    TitleCategoryMultiSelectComponent,
    PersonMultiSelectComponent,
    FinPersonSelectComponent,
    FinToggleSwitchComponent,
    FinPercentageInputComponent,
  ],
  templateUrl: './credit-charges-editor.component.html',
  styleUrl: './credit-charges-editor.component.scss',
  animations: [ifVerticalAnimation],
})
export class CreditChargesEditorComponent implements OnInit {
  public formGroup: FormGroupFromType<CreditChargeInput>;
  public readonly loading = signal(true);
  public readonly saving = signal(false);
  public readonly editorType = signal(EditorType.Create);
  public readonly entityEditingName = signal('');

  public readonly editorTypes = EditorType;

  public readonly isAdvancedPersonSplitEnabled = new FormControl(false, {
    nonNullable: true,
  });
  public readonly simplePersonFormControl = new FormControl<string[]>([], {
    nonNullable: true,
  });
  public readonly advancedPersonFormArray = new FormArray<
    FormGroupFromType<CreditChargePersonInput>
  >([], {
    validators: [
      sumRangeValidator('financialSplit', 0.01, 100, true, true),
      noDuplicatesValidator('personId', false, true),
    ],
  });

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(CreditChargeService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private entityEditingId: string;

  public async ngOnInit(): Promise<void> {
    const editingEntity = await this.setEditing();
    this.setFormGroup(editingEntity);
  }

  public get canSave(): boolean {
    return (
      (this.formGroup?.touched || this.advancedPersonFormArray?.touched) &&
      this.formGroup?.valid &&
      this.advancedPersonFormArray.valid &&
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

    const input = this.formGroup.getRawValue() as CreditChargeInput;

    input.creditChargePeople = this.advancedPersonFormArray.getRawValue();

    iif(
      () => this.editorType() === EditorType.Create,
      this.apiService.create(input),
      this.apiService.update(this.entityEditingId, input)
    )
      .pipe(
        first(),
        finalize(() => this.saving.set(false))
      )
      .subscribe((result) => {
        if (result[0]) this.close();
      });
  }

  private async setEditing(): Promise<CreditChargeOutput | null> {
    const id = this.activatedRoute.snapshot.paramMap.get('creditChargeId');
    if (!id) return null;

    const entity = await firstValueFrom(this.apiService.get(id));
    this.editorType.set(EditorType.Edit);
    this.entityEditingId = id;
    this.entityEditingName.set(entity.description);
    return entity;
  }

  private setFormGroup(entityEditing: CreditChargeOutput | null): void {
    this.formGroup = new FormGroupFromType<CreditChargeInput>({
      description: new FormControl(entityEditing?.description ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      creditCardId: new FormControl(entityEditing?.creditCardId ?? '', {
        validators: Validators.required,
        nonNullable: true,
      }),
      value: new FormControl(entityEditing?.value ?? 0, {
        validators: [Validators.required, Validators.min(0.01)],
        nonNullable: true,
      }),
      numberOfInstallments: new FormControl(
        entityEditing?.numberOfInstallments ?? 1,
        {
          validators: [Validators.required, Validators.min(1)],
          nonNullable: true,
        }
      ),
      date: new FormControl(entityEditing?.date ?? new Date(), {
        validators: [Validators.required],
        nonNullable: true,
      }),
      creditChargeCategoriesIds: new FormControl(
        entityEditing?.creditChargeCategoriesIds ?? [],
        {
          nonNullable: true,
        }
      ),
      creditChargePeople: new FormControl(
        entityEditing?.creditChargePeople ?? [],
        {
          nonNullable: true,
        }
      ),
    });
    this.identifyAndPopulatePersonFormControls(entityEditing);
    this.loading.set(false);
  }

  public identifyAndPopulatePersonFormControls(
    entityEditing: CreditChargeOutput | null
  ): void {
    const peopleCount = entityEditing?.creditChargePeople.length || 0;
    if (!!entityEditing && peopleCount > 0) {
      const splitSum = entityEditing.creditChargePeople.reduce(
        (sum, person) => sum + person.financialSplit,
        0
      );

      const idealSplit = Number((100 / peopleCount).toFixed(2));
      const totalSplit = idealSplit * peopleCount;
      const difference = Number((100 - totalSplit).toFixed(2));
      const fixedSplit = Number((idealSplit + difference).toFixed(2));

      const isAdvancedPersonSplitEnabled =
        entityEditing.creditChargePeople.some(
          (person) =>
            person.financialSplit !== idealSplit &&
            person.financialSplit !== fixedSplit
        ) || splitSum < 99.99; // to avoid floating point issues

      this.isAdvancedPersonSplitEnabled.setValue(isAdvancedPersonSplitEnabled);

      this.simplePersonFormControl.setValue(
        entityEditing.creditChargePeople.map((person) => person.personId)
      );
      this.advancedPersonFormArray.clear();

      for (const person of entityEditing.creditChargePeople) {
        this.addAdvancedPersonFormControl(
          person.personId,
          person.financialSplit
        );
      }
    }

    this.isAdvancedPersonSplitEnabled.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(200))
      .subscribe((isAdvanced) => {
        if (!isAdvanced) {
          this.normalizeSplitPercentages();
        }
        this.cdr.detectChanges();
      });

    this.simplePersonFormControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(200))
      .subscribe(() => this.syncPeopleFormControls());
  }

  private normalizeSplitPercentages() {
    const idealSplit = Number(
      (100 / this.simplePersonFormControl.value.length).toFixed(2)
    );
    for (const formGroup of this.advancedPersonFormArray.controls) {
      formGroup.controls.financialSplit.setValue(idealSplit, {
        emitEvent: false,
      });
    }

    const totalSplit = idealSplit * this.simplePersonFormControl.value.length;
    const difference = Number((100 - totalSplit).toFixed(2));
    if (difference !== 0 && this.advancedPersonFormArray.length > 0) {
      const firstPersonFormGroup = this.advancedPersonFormArray.at(0);
      const firstIdealSplit = Number(
        (
          firstPersonFormGroup.controls.financialSplit.value + difference
        ).toFixed(2)
      );
      firstPersonFormGroup.controls.financialSplit.setValue(firstIdealSplit, {
        emitEvent: false,
      });
    }

    this.advancedPersonFormArray.updateValueAndValidity();
  }

  private syncPeopleFormControls(): void {
    const personIds = this.simplePersonFormControl.value;

    for (const personId of personIds) {
      const exists = this.advancedPersonFormArray.controls.some(
        (fg) => fg.controls.personId.value === personId
      );
      if (!exists) {
        this.addAdvancedPersonFormControl(personId, 0, false);
      }
    }

    for (const idx in this.advancedPersonFormArray.controls) {
      const formGroup = this.advancedPersonFormArray.at(Number(idx));
      if (!personIds.includes(formGroup.controls.personId.value)) {
        this.advancedPersonFormArray.removeAt(Number(idx), {
          emitEvent: false,
        });
      }
    }

    if (!this.isAdvancedPersonSplitEnabled.value) {
      this.normalizeSplitPercentages();
    }

    this.advancedPersonFormArray.updateValueAndValidity();
    this.cdr.markForCheck();
  }

  private addAdvancedPersonFormControl(
    personId: string,
    financialSplit = 0,
    emitEvent = true
  ): void {
    const personFormGroup = new FormGroupFromType<CreditChargePersonInput>({
      personId: new FormControl(
        { value: personId, disabled: true },
        {
          validators: Validators.required,
          nonNullable: true,
        }
      ),
      financialSplit: new FormControl(financialSplit, {
        validators: [
          Validators.required,
          Validators.min(0.01),
          Validators.max(100),
        ],
        nonNullable: true,
      }),
    });
    personFormGroup.markAllAsDirty();
    personFormGroup.markAsTouched();
    personFormGroup.updateValueAndValidity();
    this.advancedPersonFormArray.push(personFormGroup, { emitEvent });
  }
}
