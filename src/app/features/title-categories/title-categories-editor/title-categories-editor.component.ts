import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, } from '@angular/core';
import { EditorLayoutComponent } from '../../../shared/components/page-layout/editor-layout/editor-layout.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditorType } from '../../../shared/enums/layouts/editor-type';
import { TitleCategoryType } from '../../../shared/enums/title-categories/title-category-type';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleCategoryApiService } from '../../../shared/services/title-categories/title-category-api.service';
import { firstValueFrom, map } from 'rxjs';
import { TitleCategoryInput } from '../../../shared/types/title-categories/title-category-input';
import { FinInputComponent } from '../../../shared/components/input/fin-input.component';
import { FinColorPickerComponent } from '../../../shared/components/color-picker/fin-color-picker.component';
import {
  TitleCategoryTypeSelectorComponent
} from '../components/title-category-type-selector/title-category-type-selector.component';
import { TitleCategoryOutput } from '../../../shared/types/title-categories/title-category-output';
import { EditorSaveOptions } from '../../../shared/enums/layouts/editor-save-options';

type TitleCategoryInputForm = {
  name: FormControl<string>;
  color: FormControl<string>;
  icon: FormControl<string>;
  type: FormControl<TitleCategoryType>;
};

@Component({
  selector: 'fin-title-categories-editor',
  imports: [
    EditorLayoutComponent,
    FinInputComponent,
    FinColorPickerComponent,
    TitleCategoryTypeSelectorComponent,
  ],
  templateUrl: './title-categories-editor.component.html',
  styleUrl: './title-categories-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCategoriesEditorComponent implements OnInit {
  public formGroup: FormGroup<TitleCategoryInputForm>;
  public readonly loading = signal(true);
  public readonly saving = signal(false);
  public readonly editorType = signal<EditorType>(EditorType.Create);
  public readonly titleCategoryEditingName = signal('');

  public readonly editorTypes = EditorType;

  public readonly saveOptions = computed(() => {
    const isCreating = this.editorType() === EditorType.Create;
    
    return new EditorSaveOptions<TitleCategoryInput>({
      onSave: (input) => {
        return isCreating
          ? this.apiService.create(input).pipe(map(() => {}))
          : this.apiService.update(this.titleCategoryEditingId, input);
      },
      successMessage: isCreating
        ? 'finCore.features.titleCategory.messages.created'
        : 'finCore.features.titleCategory.messages.updated',
    });
  });

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(TitleCategoryApiService);
  private titleCategoryEditingId: string;

  public async ngOnInit(): Promise<void> {
    const titleCategoryEditing = await this.setEditingTitleCategory();
    this.setFormGroup(titleCategoryEditing);
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

  private async setEditingTitleCategory(): Promise < TitleCategoryOutput | null > {
  const id = this.activatedRoute.snapshot.paramMap.get('titleCategoryId');
  if(!id) return null;

  const titleCategory = await firstValueFrom(this.apiService.get(id));
  this.editorType.set(EditorType.Edit);
  this.titleCategoryEditingId = id;
  this.titleCategoryEditingName.set(titleCategory.name);
  return titleCategory;
}

  private setFormGroup(titleCategoryEditing: TitleCategoryOutput | null): void {
  this.formGroup = new FormGroup<TitleCategoryInputForm>({
    name: new FormControl(titleCategoryEditing?.name ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    color: new FormControl(titleCategoryEditing?.color ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(20)],
    }),
    icon: new FormControl(titleCategoryEditing?.icon ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(20)],
    }),
    type: new FormControl(
      titleCategoryEditing?.type ?? TitleCategoryType.Both,
      {
        nonNullable: true,
        validators: Validators.required,
      }
    ),
  });
  this.loading.set(false);
}
}
