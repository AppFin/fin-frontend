import { Component, inject, OnInit, signal } from '@angular/core';
import { FinInputComponent } from '../../../shared/components/input/fin-input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, first, firstValueFrom, map, Observable, of } from 'rxjs';
import { FinSelectComponent } from '../../../shared/components/select/fin-select.component';
import { FinToggleSwitchComponent } from '../../../shared/components/toggle-switch/fin-toggle-switch.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorType } from '../../../shared/enums/layouts/editor-type';
import { FinancialInstitutionApiService } from '../../../shared/services/financial-institutions/financial-institution-api.service';
import { FinancialInstitutionInput } from '../../../shared/models/financial-institutions/financial-institution-input';
import { FinancialInstitutionOutput } from '../../../shared/models/financial-institutions/financial-institution-output';
import { FinancialInstitutionType } from '../../../shared/enums/financial-institutions/financial-institution-type';
import { FinSelectComponentOptions } from '../../../shared/components/select/fin-select-component-options';
import { FinSelectOption } from '../../../shared/components/select/fin-select-option';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { EditorLayoutComponent } from '../../../shared/components/page-layout/editor-layout/editor-layout.component';
import { FinColorPickerComponent } from '../../../shared/components/color-picker/fin-color-picker.component';

type FinancialInstitutionInputForm = {
  name: FormControl<string>;
  code: FormControl<string | null>;
  type: FormControl<FinancialInstitutionType | null>;
  icon: FormControl<string>;
  color: FormControl<string>;
  active: FormControl<boolean>;
};

@Component({
  selector: 'fin-financial-institutions-editor',
  imports: [
    FinInputComponent,
    FinSelectComponent,
    FinToggleSwitchComponent,
    FinColorPickerComponent,
    EditorLayoutComponent,
  ],
  templateUrl: './financial-institutions-editor.component.html',
  styleUrl: './financial-institutions-editor.component.scss',
})
export class FinancialInstitutionsEditorComponent implements OnInit {
  public formGroup: FormGroup<FinancialInstitutionInputForm>;
  public readonly loading = signal(true);
  public readonly saving = signal(false);
  public readonly editorType = signal<EditorType>(EditorType.Create);

  public readonly editorTypes = EditorType;

  public readonly typeSelectOptions = new FinSelectComponentOptions({
    getOptions: this.getInstitutionTypeOptions.bind(this),
  });

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(FinancialInstitutionApiService);
  private institutionEditingId: string;

  public async ngOnInit(): Promise<void> {
    const institutionEditing = await this.setEditingInstitution();
    this.setFormGroup(institutionEditing);
  }

  public get canSave(): boolean {
    return (
      this.formGroup?.valid &&
      this.formGroup?.touched &&
      !this.loading() &&
      !this.saving()
    );
  }

  public save(): void {
    if (!this.canSave) return;
    this.saving.set(true);

    const formValue = this.formGroup.getRawValue();
    if (formValue.type === null) {
      this.saving.set(false);
      return;
    }
    const input: FinancialInstitutionInput = {
      name: formValue.name,
      code: formValue.code,
      type: formValue.type,
      icon: formValue.icon,
      color: formValue.color,
      inactive: !formValue.active,
    };
    const request =
      this.editorType() === EditorType.Create
        ? this.apiService.create(input).pipe(map(() => {}))
        : this.apiService.update(this.institutionEditingId, input);

    request
      .pipe(
        first(),
        finalize(() => this.saving.set(false))
      )
      .subscribe(() => this.close());
  }

  public close(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  private getInstitutionTypeOptions(): Observable<
    PagedOutput<FinSelectOption<FinancialInstitutionType>>
  > {
    return of({
      totalCount: 3,
      items: [
        {
          value: FinancialInstitutionType.Bank,
          label: 'Banco Tradicional',
        },
        {
          value: FinancialInstitutionType.DigitalBank,
          label: 'Banco Digital',
        },
        {
          value: FinancialInstitutionType.FoodCard,
          label: 'Cartão Alimentação',
        },
      ],
    } as PagedOutput<FinSelectOption<FinancialInstitutionType>>);
  }

  private setFormGroup(
    institutionEditing: FinancialInstitutionOutput | null
  ): void {
    const activeValue = institutionEditing ? !institutionEditing.inactive : true;
    
    console.log('🔍 FORM INIT DEBUG:', {
      institution: institutionEditing?.name,
      inactive: institutionEditing?.inactive,
      activeValue,
    });

    this.formGroup = new FormGroup<FinancialInstitutionInputForm>({
      name: new FormControl(institutionEditing?.name ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(200)],
      }),
      code: new FormControl<string | null>(institutionEditing?.code ?? null, {
        validators: [Validators.maxLength(20)],
      }),
      type: new FormControl<FinancialInstitutionType | null>(
        institutionEditing?.type ?? null,
        {
          validators: [Validators.required],
        }
      ),
      icon: new FormControl(institutionEditing?.icon ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      color: new FormControl(institutionEditing?.color ?? '#000000', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      active: new FormControl(activeValue, {
        nonNullable: true,
      }),
    });
    this.loading.set(false);
  }

  private async setEditingInstitution(): Promise<FinancialInstitutionOutput | null> {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return null;

    const institution = await firstValueFrom(this.apiService.get(id));
    this.editorType.set(EditorType.Edit);
    this.institutionEditingId = id;
    return institution;
  }
}
