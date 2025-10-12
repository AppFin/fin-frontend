import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first, firstValueFrom, map } from 'rxjs';
import { CardBrandApiService } from '../../../core/services/card-brand/card-brand-api.service';
import { EditorType } from '../../../shared/enums/layouts/editor-type';
import { CardBrandOutput } from '../../../core/types/card-brands/card-brand-output';
import { CardBrandInput } from '../../../core/types/card-brands/card-brand-input';
import { EditorLayoutComponent } from '../../../shared/components/page-layout/editor-layout/editor-layout.component';
import { FinInputComponent } from '../../../shared/components/input/fin-input.component';
import { FinColorPickerComponent } from '../../../shared/components/color-picker/fin-color-picker.component';

type CardBrandInputForm = {
  name: FormControl<string>;
  icon: FormControl<string>;
  color: FormControl<string>;
};

@Component({
  selector: 'fin-card-brand-editor',
  standalone: true,
  imports: [
    EditorLayoutComponent,
    FinInputComponent,
    FinColorPickerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './card-brand-editor.component.html',
})
export class CardBrandEditorComponent implements OnInit {
  public formGroup: FormGroup<CardBrandInputForm>;
  public readonly loading = signal(true);
  public readonly saving = signal(false);
  public readonly editorType = signal<EditorType>(EditorType.Create);
  public readonly editorTypes = EditorType;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly apiService = inject(CardBrandApiService);
  private cardBrandEditingId: string;

  public async ngOnInit(): Promise<void> {
    const cardBrandEditing = await this.setEditingCardBrand();
    this.setFormGroup(cardBrandEditing);
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

    const input = this.formGroup.getRawValue() as CardBrandInput;

    const request =
      this.editorType() === EditorType.Create
        ? this.apiService.create(input).pipe(map(() => {}))
        : this.apiService.update(this.cardBrandEditingId, input);

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

  private setFormGroup(cardBrandEditing: CardBrandOutput | null): void {
    this.formGroup = new FormGroup<CardBrandInputForm>({
      name: new FormControl(cardBrandEditing?.name ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      icon: new FormControl(cardBrandEditing?.icon ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      color: new FormControl(cardBrandEditing?.color ?? '#fdc570', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(20)],
      }),
    });
    this.loading.set(false);
  }

  private async setEditingCardBrand(): Promise<CardBrandOutput | null> {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return null;

    const cardBrand = await firstValueFrom(this.apiService.get(id));
    this.editorType.set(EditorType.Edit);
    this.cardBrandEditingId = id;
    return cardBrand;
  }
}
