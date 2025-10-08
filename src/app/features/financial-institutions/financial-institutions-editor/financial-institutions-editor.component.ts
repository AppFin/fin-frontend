import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first, firstValueFrom, map, Observable, of } from 'rxjs';
import { NotifyService } from '../../../core/services/notifications/notify.service';
import { NotificationSeverity } from '../../../core/enums/notifications/notification-severity';
import { FinColorPickerComponent } from '../../../shared/components/color-picker/fin-color-picker.component';
import { FinInputComponent } from '../../../shared/components/input/fin-input.component';
import { EditorLayoutComponent } from '../../../shared/components/page-layout/editor-layout/editor-layout.component';
import { FinSelectComponentOptions } from '../../../shared/components/select/fin-select-component-options';
import { FinSelectOption } from '../../../shared/components/select/fin-select-option';
import { FinSelectComponent } from '../../../shared/components/select/fin-select.component';
import { FinancialInstitutionType } from '../../../shared/enums/financial-institutions/financial-institution-type';
import { EditorType } from '../../../shared/enums/layouts/editor-type';
import { FinancialInstitutionOutput } from '../../../shared/models/financial-institutions/financial-institution-output';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { FinancialInstitutionApiService } from '../../../shared/services/financial-institutions/financial-institution-api.service';

type FinancialInstitutionInputForm = {
  name: FormControl<string>;
  code: FormControl<string | null>;
  type: FormControl<FinancialInstitutionType>;
  icon: FormControl<string>;
  color: FormControl<string>;
};

@Component({
  selector: 'fin-financial-institutions-editor',
  imports: [
    FinInputComponent,
    FinSelectComponent,
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
  private notifyService = inject(NotifyService);
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
    
    const isCreating = this.editorType() === EditorType.Create;
    const request = isCreating
      ? this.apiService.create(formValue).pipe(map(() => {}))
      : this.apiService.update(this.institutionEditingId, formValue);

    request
      .pipe(
        first(),
        finalize(() => this.saving.set(false))
      )
      .subscribe({
        next: () => {
          const message = isCreating
            ? 'finCore.features.financialInstitutions.createdSuccess'
            : 'finCore.features.financialInstitutions.updatedSuccess';
          this.notifyService.notifySnack(message, NotificationSeverity.Success);
          this.close();
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'finCore.errors.genericError';
          this.notifyService.notifySnack(errorMessage, NotificationSeverity.Error);
        }
      });
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
    this.formGroup = new FormGroup<FinancialInstitutionInputForm>({
      name: new FormControl(institutionEditing?.name ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(200)],
      }),
      code: new FormControl<string | null>(institutionEditing?.code ?? null, {
        validators: [Validators.maxLength(20)],
        nonNullable: true,
      }),
      type: new FormControl<FinancialInstitutionType>(
        institutionEditing?.type ?? FinancialInstitutionType.Bank,
        {
          validators: [Validators.required],
          nonNullable: true,
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
