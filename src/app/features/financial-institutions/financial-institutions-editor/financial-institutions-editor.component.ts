import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FinInputComponent } from '../../../shared/components/input/fin-input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, first, firstValueFrom, map, Observable, of } from 'rxjs';
import { EditorLayoutComponent } from '../../../shared/components/page-layout/editor-layout/editor-layout.component';
import { FinToggleSwitchComponent } from '../../../shared/components/toggle-switch/fin-toggle-switch.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorType } from '../../../shared/enums/layouts/editor-type';
import { FinancialInstitutionService } from '../../../core/services/financial-institutions/financial-institution.service';
import {
  FinancialInstitutionInput,
  FinancialInstitutionOutput,
} from '../../../shared/models/financial-institutions/financial-institution.model';
import {
  BankCode,
  BANK_CODE_LABELS,
} from '../../../shared/enums/financial-institutions/bank-code.enum';
import {
  InstitutionType,
  INSTITUTION_TYPE_LABELS,
  INSTITUTION_TYPE_TO_NUMBER,
} from '../../../shared/enums/financial-institutions/institution-type.enum';
import { FinSelectComponent } from '../../../shared/components/select/fin-select.component';
import { FinSelectComponentOptions } from '../../../shared/components/select/fin-select-component-options';
import { FinSelectOption } from '../../../shared/components/select/fin-select-option';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { FinTranslatePipe } from '../../../core/pipes/translate/fin-translate.pipe';
import { 
  searchBankByName,
  BANK_METADATA 
} from '../../../shared/models/financial-institutions/bank-metadata';
import { 
  GLOBAL_INSTITUTIONS,
  getInstitutionsByType 
} from '../../../shared/models/financial-institutions/global-institutions';

type FinancialInstitutionInputForm = {
  name: FormControl<string>;
  code: FormControl<BankCode | null>;
  type: FormControl<InstitutionType | null>;
  icon: FormControl<string>;
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
  public readonly selectedBankCode = signal<BankCode | null>(null);

  public readonly editorTypes = EditorType;
  public readonly iconPreview = signal<string | null>(null);

  public readonly iconPreviewPath = computed(() => {
    return this.iconPreview();
  });

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(FinancialInstitutionService);
  private institutionEditingId: string;

  public readonly selectedType = signal<InstitutionType | null>(null);

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
          const iconValue = `${institution.icon}.png`;
          this.formGroup.controls.icon.setValue(iconValue, { emitEvent: false });
          this.iconPreview.set(`/icons/bank/${iconValue}`);
        }
      } else {
        this.iconPreview.set(null);
      }
    });
    
    this.formGroup.controls.name.valueChanges.subscribe((name) => {
      if (!name || name.length < 3) return;
      
      const term = name.toLowerCase().trim();
      const matches = BANK_METADATA.filter(bank => 
        bank.name.toLowerCase().startsWith(term) ||
        bank.aliases.some(alias => alias.startsWith(term))
      );
      
      if (matches.length === 1 && !this.formGroup.controls.code.value) {
        const bankMetadata = matches[0];
        this.formGroup.controls.code.setValue(bankMetadata.code, { emitEvent: true });
        this.formGroup.controls.type.setValue(bankMetadata.type);
        this.formGroup.controls.name.setValue(bankMetadata.name, { emitEvent: false });
        const iconValue = `${bankMetadata.icon}.png`;
        this.formGroup.controls.icon.setValue(iconValue, { emitEvent: false });
        this.iconPreview.set(`/icons/bank/${iconValue}`);
      }
    });
    
    this.formGroup.controls.icon.valueChanges.subscribe((iconValue) => {
      if (iconValue) {
        const iconName = iconValue.endsWith('.png') ? iconValue : `${iconValue}.png`;
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
    
    // Remover .png do icon para salvar só o nome base
    let iconValue = formValue.icon || '';
    if (iconValue.endsWith('.png')) {
      iconValue = iconValue.replace('.png', '');
    }
    
    const input: FinancialInstitutionInput = {
      name: formValue.name,
      code: formValue.code!,
      type: formValue.type ? INSTITUTION_TYPE_TO_NUMBER[formValue.type] : 7,
      icon: iconValue || undefined,
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

  private getBankCodeOptions(): Observable<
    PagedOutput<FinSelectOption<BankCode>>
  > {
    const options = BANK_METADATA.map((bank) => ({
      value: bank.code,
      label: `${bank.code} - ${bank.name}`,
    }));

    return of({
      totalCount: options.length,
      items: options,
    } as PagedOutput<FinSelectOption<BankCode>>);
  }

  private getInstitutionTypeOptions(): Observable<
    PagedOutput<FinSelectOption<InstitutionType>>
  > {
    const options = Object.entries(INSTITUTION_TYPE_LABELS).map(
      ([type, label]) => ({
        value: type as InstitutionType,
        label: label,
      })
    );

    return of({
      totalCount: options.length,
      items: options,
    } as PagedOutput<FinSelectOption<InstitutionType>>);
  }

  private setFormGroup(
    institutionEditing: FinancialInstitutionOutput | null
  ): void {
    // Se está editando e não tem icon, buscar pelo código
    let iconValue = institutionEditing?.icon ?? '';
    if (!iconValue && institutionEditing?.code) {
      const institution = GLOBAL_INSTITUTIONS.find(inst => inst.code === institutionEditing.code);
      iconValue = institution ? `${institution.icon}.png` : '';
    }
    
    this.formGroup = new FormGroup<FinancialInstitutionInputForm>({
      name: new FormControl(institutionEditing?.name ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(200)],
      }),
      code: new FormControl<BankCode | null>(institutionEditing?.code ?? null, {
        validators: [Validators.required],
      }),
      type: new FormControl<InstitutionType | null>(institutionEditing?.type ?? null, {
        validators: [Validators.required],
      }),
      icon: new FormControl(iconValue, {
        nonNullable: true,
        validators: [Validators.maxLength(50)],
      }),
      active: new FormControl(institutionEditing?.active ?? true, {
        nonNullable: true,
      }),
    });
    
    // Definir preview inicial se tem icon
    if (iconValue) {
      const iconName = iconValue.endsWith('.png') ? iconValue : `${iconValue}.png`;
      this.iconPreview.set(`/icons/bank/${iconName}`);
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
