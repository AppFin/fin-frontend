import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FinInputComponent } from '../../../shared/components/input/fin-input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, first, firstValueFrom, map, Observable, of } from 'rxjs';
import { EditorLayoutComponent } from '../../../shared/components/page-layout/editor-layout/editor-layout.component';
import { FinToggleSwitchComponent } from '../../../shared/components/toggle-switch/fin-toggle-switch.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorType } from '../../../shared/enums/layouts/editor-type';
import { FinancialInstitutionService } from '../../../core/services/financial-institutions/financial-institution.service';
import { FinancialInstitutionInput,FinancialInstitutionOutput,} from '../../../shared/models/financial-institutions/financial-institution-output';
import { BankCode} from '../../../shared/enums/financial-institutions/bank-code.enum';
import { FinancialInstitutionType, INSTITUTION_TYPE_LABELS} from '../../../shared/enums/financial-institutions/financial-institution-type';
import { FinSelectComponent } from '../../../shared/components/select/fin-select.component';
import { FinSelectComponentOptions } from '../../../shared/components/select/fin-select-component-options';
import { FinSelectOption } from '../../../shared/components/select/fin-select-option';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { FinTranslatePipe } from '../../../core/pipes/translate/fin-translate.pipe';
import { findUniqueBank } from '../../../shared/models/financial-institutions/bank-autocomplete';
import { GLOBAL_INSTITUTIONS, getInstitutionsByType } from '../../../shared/models/financial-institutions/global-institutions';

type FinancialInstitutionInputForm = {
  name: FormControl<string>;
  code: FormControl<BankCode | null>;
  type: FormControl<FinancialInstitutionType | null>;
  icon: FormControl<string>;
  color: FormControl<string>;
  active: FormControl<boolean>;
};

@Component({
  selector: 'fin-financial-institutions-editor',
  imports: [
    FinInputComponent,
    EditorLayoutComponent,
    FinToggleSwitchComponent,
    FinSelectComponent,
    FinTranslatePipe,
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
  public readonly selectedType = signal<FinancialInstitutionType | null>(null);
  public readonly selectedBankCode = signal<BankCode | null>(null);
  public readonly iconPreview = signal<string | null>(null);
  public readonly colorPreview = signal<string | null>(null);

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(FinancialInstitutionService);
  private institutionEditingId: string;

  public readonly bankCodeOptions = computed(() => {
    const type = this.selectedType();
    
    const institutions = type 
      ? getInstitutionsByType(type) 
      : GLOBAL_INSTITUTIONS;

    return new FinSelectComponentOptions({
      getOptions: (input: PagedFilteredAndSortedInput) => {
        let filteredInstitutions = institutions;
        
        if (input.filter?.filter && input.filter.filter.trim()) {
          const searchTerm = input.filter.filter.toLowerCase();
          filteredInstitutions = institutions.filter(inst => 
            inst.name.toLowerCase().includes(searchTerm) ||
            inst.code.toLowerCase().includes(searchTerm) ||
            inst.country.toLowerCase().includes(searchTerm)
          );
        }
        
        const options = filteredInstitutions.map((inst) => ({
          value: inst.code,
          label: `${inst.code} - ${inst.name} (${inst.country})`,
        }));

        return of({
          totalCount: options.length,
          items: options,
        } as PagedOutput<FinSelectOption<BankCode>>);
      },
    });
  });

  public get institutionTypeOptions(): FinSelectComponentOptions {
    return new FinSelectComponentOptions({
      getOptions: () => this.getInstitutionTypeOptions(),
    });
  }

  public async ngOnInit(): Promise<void> {
    const institutionEditing = await this.setEditingInstitution();
    this.setFormGroup(institutionEditing);
    
    this.formGroup.controls.type.valueChanges.subscribe((type) => {
      this.selectedType.set(type);
      
      if (type) {
        const currentCode = this.formGroup.controls.code.value;
        if (currentCode) {
          const currentInst = GLOBAL_INSTITUTIONS.find(i => i.code === currentCode);
          if (currentInst && currentInst.type !== type) {
            this.formGroup.controls.code.setValue(null);
          }
        }
      }
    });
    
    this.formGroup.controls.code.valueChanges.subscribe((code) => {
      this.selectedBankCode.set(code);
      
      if (code) {
        const institution = GLOBAL_INSTITUTIONS.find(inst => inst.code === code);
        if (institution) {
          this.updateIconAndColorPreview(institution);
        }
      } else {
        this.iconPreview.set(null);
        this.colorPreview.set(null);
      }
    });
    
    this.formGroup.controls.name.valueChanges.subscribe((name) => {
      if (!name || name.length < 3 || this.formGroup.controls.code.value) return;
    
      const uniqueMatch = findUniqueBank(name);
      
      if (uniqueMatch) {
        this.formGroup.controls.code.setValue(uniqueMatch.code, { emitEvent: true });
        this.formGroup.controls.type.setValue(uniqueMatch.type);
        this.formGroup.controls.name.setValue(uniqueMatch.name, { emitEvent: false });
      }
    });
    
    this.formGroup.controls.icon.valueChanges.subscribe((iconValue) => {
      if (iconValue) {
        const iconName = this.normalizeIconName(iconValue);
        this.iconPreview.set(`/icons/bank/${iconName}`);
      } else {
        this.iconPreview.set(null);
      }
    });
    
    if (institutionEditing?.code) {
      this.selectedBankCode.set(institutionEditing.code);
    }
    
    if (institutionEditing?.type) {
      this.selectedType.set(institutionEditing.type);
    }
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
    
    const input: FinancialInstitutionInput = {
      name: formValue.name,
      code: formValue.code!,
      type: formValue.type || FinancialInstitutionType.Other,
      icon: this.removeIconExtension(formValue.icon),
      color: formValue.color,
      active: formValue.active,
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
      .subscribe(() => this.fechar());
  }

  public fechar(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  private normalizeIconName(icon: string): string {
    return icon.endsWith('.png') ? icon : `${icon}.png`;
  }

  private removeIconExtension(icon: string): string {
    return icon.endsWith('.png') ? icon.replace('.png', '') : icon;
  }

  private updateIconAndColorPreview(institution: typeof GLOBAL_INSTITUTIONS[0]): void {
    const iconWithExtension = this.normalizeIconName(institution.icon);
    this.formGroup.controls.icon.setValue(iconWithExtension, { emitEvent: false });
    this.formGroup.controls.color.setValue(institution.color, { emitEvent: false });
    this.iconPreview.set(`/icons/bank/${iconWithExtension}`);
    this.colorPreview.set(institution.color);
  }

  private getInstitutionTypeOptions(): Observable<
    PagedOutput<FinSelectOption<FinancialInstitutionType>>
  > {
    const options = Object.entries(INSTITUTION_TYPE_LABELS).map(
      ([type, label]) => ({
        value: Number(type) as FinancialInstitutionType,
        label: label,
      })
    );

    return of({
      totalCount: options.length,
      items: options,
    } as PagedOutput<FinSelectOption<FinancialInstitutionType>>);
  }

  private setFormGroup(
    institutionEditing: FinancialInstitutionOutput | null
  ): void {
    let iconValue = institutionEditing?.icon ?? '';
    let colorValue = institutionEditing?.color ?? '';
    
    if (!iconValue && institutionEditing?.code) {
      const institution = GLOBAL_INSTITUTIONS.find(inst => inst.code === institutionEditing.code);
      if (institution) {
        iconValue = `${institution.icon}.png`;
        colorValue = institution.color;
      }
    }
    
    this.formGroup = new FormGroup<FinancialInstitutionInputForm>({
      name: new FormControl(institutionEditing?.name ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(200)],
      }),
      code: new FormControl<BankCode | null>(institutionEditing?.code ?? null, {
        validators: [Validators.required],
      }),
      type: new FormControl<FinancialInstitutionType | null>(institutionEditing?.type ?? null, {
        validators: [Validators.required],
      }),
      icon: new FormControl(iconValue, {
        nonNullable: true,
        validators: [Validators.maxLength(50)],
      }),
      color: new FormControl(colorValue, {
        nonNullable: true,
        validators: [Validators.maxLength(20)],
      }),
      active: new FormControl(institutionEditing?.active ?? true, {
        nonNullable: true,
      }),
    });
    
    if (iconValue) {
      this.iconPreview.set(`/icons/bank/${this.normalizeIconName(iconValue)}`);
    }
    
    if (colorValue) {
      this.colorPreview.set(colorValue);
    }
    
    this.loading.set(false);
  }

  private async setEditingInstitution(): Promise<FinancialInstitutionOutput | null> {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return null;

    const institution = await firstValueFrom(this.apiService.getById(id));
    this.editorType.set(EditorType.Edit);
    this.institutionEditingId = id;
    return institution;
  }
}
