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
import { SelectButtonModule } from 'primeng/selectbutton';
import { debounceTime, finalize, first, firstValueFrom, iif } from 'rxjs';
import { ifVerticalAnimation } from '../../../shared/animations/if-vertical.animation';
import { FinDatetimeComponent } from '../../../shared/components/generics/datetime/fin-date-time.component';
import { FinInputComponent } from '../../../shared/components/generics/input/fin-input.component';
import { EditorLayoutComponent } from '../../../shared/components/generics/page-layout/editor-layout/editor-layout.component';
import {
  FinSelectButtonComponent,
  FinSelectButtonOption,
} from '../../../shared/components/generics/select-button/fin-select-button.component';
import { FinToggleSwitchComponent } from '../../../shared/components/generics/toggle-switch/fin-toggle-switch.component';
import { FinMoneyInputComponent } from '../../../shared/components/money-input/fin-money-input.component';
import { PersonMultiSelectComponent } from '../../../shared/components/people/person-multi-select/person-multi-select.component';
import { FinPersonSelectComponent } from '../../../shared/components/people/person-select/fin-person-select.component';
import { FinPercentageInputComponent } from '../../../shared/components/percentage/fin-percentage-input.component';
import { TitleCategoryMultiSelectComponent } from '../../../shared/components/title-categories/title-category-multi-select/title-category-multi-select.component';
import { FinWalletSelectComponent } from '../../../shared/components/wallets/wallet-select/fin-wallet-select.component';
import { EditorType } from '../../../shared/enums/layouts/editor-type';
import { TitleType } from '../../../shared/enums/titles/title-type';
import { TitleService } from '../../../shared/services/titles/title.service';
import { FormGroupFromType } from '../../../shared/types/form/form-group-from-type';
import { TitleInput } from '../../../shared/types/titles/title-input';
import { TitleOutput } from '../../../shared/types/titles/title-output';
import { TitlePersonInput } from '../../../shared/types/titles/title-person-input';
import { noDuplicatesValidator } from '../../../shared/validators/no-duplicates-validator';
import { sumRangeValidator } from '../../../shared/validators/sum-range-validator';

@Component({
  selector: 'fin-titles-editor',
  imports: [
    EditorLayoutComponent,
    FinInputComponent,
    FinWalletSelectComponent,
    FinMoneyInputComponent,
    FinDatetimeComponent,
    SelectButtonModule,
    FinSelectButtonComponent,
    TitleCategoryMultiSelectComponent,
    PersonMultiSelectComponent,
    FinPersonSelectComponent,
    FinToggleSwitchComponent,
    FinPercentageInputComponent,
  ],
  templateUrl: './titles-editor.component.html',
  styleUrl: './titles-editor.component.scss',
  animations: [ifVerticalAnimation],
})
export class TitlesEditorComponent implements OnInit {
  public formGroup: FormGroupFromType<TitleInput>;
  public readonly loading = signal(true);
  public readonly saving = signal(false);
  public readonly editorType = signal(EditorType.Create);
  public readonly entityEditingName = signal('');

  public readonly editorTypes = EditorType;

  public readonly titleTypeOptions: FinSelectButtonOption<TitleType>[] = [
    { label: 'finCore.features.title.type.expense', value: TitleType.Expense },
    { label: 'finCore.features.title.type.income', value: TitleType.Income },
  ];

  public readonly isAdvancedPersonSplitEnabled = new FormControl(false, {
    nonNullable: true,
  });
  public readonly simplePersonFormControl = new FormControl<string[]>([], {
    nonNullable: true,
  });
  public readonly advancedPersonFormArray = new FormArray<
    FormGroupFromType<TitlePersonInput>
  >([], {
    validators: [
      sumRangeValidator('percentage', 0.01, 100, true, true),
      noDuplicatesValidator('personId', false, true),
    ],
  });

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(TitleService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private entityEditingId: string;

  public log(): void {
    console.log({
      formGroup: this.formGroup,
      advancedPersonFormArray: this.advancedPersonFormArray,
      simplePersonFormControl: this.simplePersonFormControl,
      isAdvancedPersonSplitEnabled: this.isAdvancedPersonSplitEnabled,
    });
    console.log({
      formGroupTouched: this.formGroup?.touched,
      advancedPersonFormArrayTouched: this.advancedPersonFormArray?.touched,
      formGroupValid: this.formGroup?.valid,
      advancedPersonFormArrayValid: this.advancedPersonFormArray?.valid,
      loading: !this.loading(),
      saving: !this.saving(),
    });
  }

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

    const input = this.formGroup.getRawValue() as TitleInput;

    input.titlePeople = this.advancedPersonFormArray.getRawValue();

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

  private async setEditing(): Promise<TitleOutput | null> {
    const id = this.activatedRoute.snapshot.paramMap.get('titleId');
    if (!id) return null;

    const entity = await firstValueFrom(this.apiService.get(id));
    this.editorType.set(EditorType.Edit);
    this.entityEditingId = id;
    this.entityEditingName.set(entity.description);
    return entity;
  }

  private setFormGroup(entityEditing: TitleOutput | null): void {
    this.formGroup = new FormGroupFromType<TitleInput>({
      description: new FormControl(entityEditing?.description ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      walletId: new FormControl(entityEditing?.walletId ?? '', {
        validators: Validators.required,
        nonNullable: true,
      }),
      value: new FormControl(entityEditing?.value ?? 0, {
        validators: [Validators.required, Validators.min(0.01)],
        nonNullable: true,
      }),
      type: new FormControl(entityEditing?.type ?? TitleType.Expense, {
        validators: Validators.required,
        nonNullable: true,
      }),
      date: new FormControl(entityEditing?.date ?? new Date(), {
        validators: [Validators.required],
        nonNullable: true,
      }),
      titleCategoriesIds: new FormControl(
        entityEditing?.titleCategoriesIds ?? [],
        {
          nonNullable: true,
        }
      ),
      titlePeople: new FormControl(entityEditing?.titlePeople ?? [], {
        nonNullable: true,
      }),
    });
    this.identifyAndPopulatePersonFormControls(entityEditing);
    this.loading.set(false);
  }

  public identifyAndPopulatePersonFormControls(
    entityEditing: TitleOutput | null
  ): void {
    const peopleCount = entityEditing?.titlePeople.length || 0;
    if (!!entityEditing && peopleCount > 0) {
      const percentageSum = entityEditing.titlePeople.reduce(
        (sum, person) => sum + person.percentage,
        0
      );

      const idealSplit = Number((100 / peopleCount).toFixed(2));
      const totalPercentage = idealSplit * peopleCount;
      const difference = Number((100 - totalPercentage).toFixed(2));
      const fixedSplit = Number((idealSplit + difference).toFixed(2));

      const isAdvancedPersonSplitEnabled =
        entityEditing.titlePeople.some(
          (person) =>
            person.percentage !== idealSplit && person.percentage !== fixedSplit
        ) || percentageSum < 99.99; // to avoid floating point issues

      this.isAdvancedPersonSplitEnabled.setValue(isAdvancedPersonSplitEnabled);

      this.simplePersonFormControl.setValue(
        entityEditing.titlePeople.map((person) => person.personId)
      );
      this.advancedPersonFormArray.clear();

      for (const person of entityEditing.titlePeople) {
        this.addAdvancedPersonFormControl(person.personId, person.percentage);
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
      formGroup.controls.percentage.setValue(idealSplit, { emitEvent: false });
    }

    const totalPercentage =
      idealSplit * this.simplePersonFormControl.value.length;
    const difference = Number((100 - totalPercentage).toFixed(2));
    if (difference !== 0 && this.advancedPersonFormArray.length > 0) {
      const firstPersonFormGroup = this.advancedPersonFormArray.at(0);
      const firstIdealSplit = Number(
        (firstPersonFormGroup.controls.percentage.value + difference).toFixed(2)
      );
      firstPersonFormGroup.controls.percentage.setValue(firstIdealSplit, {
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
    percentage = 0,
    emitEvent = true
  ): void {
    const personFormGroup = new FormGroupFromType<TitlePersonInput>({
      personId: new FormControl(
        { value: personId, disabled: true },
        {
          validators: Validators.required,
          nonNullable: true,
        }
      ),
      percentage: new FormControl(percentage, {
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
