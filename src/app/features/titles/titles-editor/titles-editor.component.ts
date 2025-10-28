import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectButtonModule } from "primeng/selectbutton";
import { finalize, first, firstValueFrom, iif } from 'rxjs';
import { FinTranslateService } from '../../../core/services/translate/fin-translate.service';
import { FinDatetimeComponent } from "../../../shared/components/generics/datetime/fin-date-time.component";
import { FinInputComponent } from "../../../shared/components/generics/input/fin-input.component";
import { EditorLayoutComponent } from "../../../shared/components/generics/page-layout/editor-layout/editor-layout.component";
import { FinSelectButtonComponent, FinSelectButtonOption } from "../../../shared/components/generics/select-button/fin-select-button.component";
import { FinMoneyInputComponent } from "../../../shared/components/money-input/fin-money-input.component";
import { FinWalletSelectComponent } from "../../../shared/components/wallets/wallet-select/fin-wallet-select.component";
import { EditorType } from '../../../shared/enums/layouts/editor-type';
import { TitleType } from '../../../shared/enums/titles/title-type';
import { TitleService } from '../../../shared/services/titles/title.service';
import { FormGroupFromType } from '../../../shared/types/form/form-group-from-type';
import { TitleInput } from '../../../shared/types/titles/title-input';
import { TitleOutput } from '../../../shared/types/titles/title-output';

@Component({
  selector: 'fin-titles-editor',
  imports: [EditorLayoutComponent, FinInputComponent, FinWalletSelectComponent, FinMoneyInputComponent, FinDatetimeComponent, SelectButtonModule, FinSelectButtonComponent],
  templateUrl: './titles-editor.component.html',
  styleUrl: './titles-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitlesEditorComponent implements OnInit {
  public formGroup: FormGroupFromType<TitleInput>;
  public readonly loading = signal(true);
  public readonly saving = signal(false);
  public readonly editorType = signal(EditorType.Create);
  public readonly entityEditingName = signal('');

  public readonly editorTypes = EditorType;

  private translateService = inject(FinTranslateService);
  public readonly titleTypeOptions: FinSelectButtonOption<TitleType>[] = [
    // { label: 'finCore.features.title.type.expense', value: TitleType.Expense },
    // { label: 'finCore.features.title.type.income', value: TitleType.Income },

    { label: 'expense', value: TitleType.Expense },
    { label: 'income', value: TitleType.Income },
  ];

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(TitleService);
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

    const input = this.formGroup.getRawValue() as TitleInput;

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
        validators: [
          Validators.required,
          Validators.maxLength(100),
        ],
      }),
      walletId: new FormControl(
        entityEditing?.walletId ?? '',
        {
          validators: Validators.required,
          nonNullable: true
        }
      ),
      value: new FormControl(
        entityEditing?.value ?? 0,
        {
          validators: Validators.required,
          nonNullable: true
        }
      ),
      type: new FormControl(
        entityEditing?.type ?? TitleType.Expense,
        {
          validators: Validators.required,
          nonNullable: true
        }
      ),
      date: new FormControl(entityEditing?.date ?? new Date(), {
        validators: [Validators.required],
        nonNullable: true,
      }),
      titleCategoriesIds: new FormControl(entityEditing?.titleCategoriesIds ?? [], {
        nonNullable: true,
      })
    });
    this.loading.set(false);
  }
}
