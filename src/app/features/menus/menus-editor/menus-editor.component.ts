import { Component, inject, OnInit, signal } from '@angular/core';
import { FinInputComponent } from '../../../shared/components/input/fin-input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuPosition } from '../../../core/enums/layouts/menu-position';
import { FinSelectComponentOptions } from '../../../shared/components/select/fin-select-component-options';
import { FinSelectOption } from '../../../shared/components/select/fin-select-option';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { finalize, first, firstValueFrom, map, Observable, of } from 'rxjs';
import { FinSelectComponent } from '../../../shared/components/select/fin-select.component';
import { FinColorPickerComponent } from '../../../shared/components/color-picker/fin-color-picker.component';
import { EditorLayoutComponent } from '../../../shared/components/page-layout/editor-layout/editor-layout.component';
import { FinToggleSwitchComponent } from '../../../shared/components/toggle-switch/fin-toggle-switch.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorType } from '../../../shared/enums/layouts/editor-type';
import { MenuOutput } from '../../../core/types/layouts/menu-output';
import { MenuApiService } from '../../../core/services/layout/menu-api.service';
import { MenuInput } from '../../../core/types/layouts/menu-input';

type MenuInputForm = {
  frontRoute: FormControl<string>;
  name: FormControl<string>;
  icon: FormControl<string>;
  color: FormControl<string>;
  keyWords: FormControl<string>;
  onlyForAdmin: FormControl<boolean>;
  position: FormControl<MenuPosition | null>;
};

@Component({
  selector: 'fin-menus-editor',
  imports: [
    FinInputComponent,
    FinSelectComponent,
    FinColorPickerComponent,
    EditorLayoutComponent,
    FinToggleSwitchComponent,
  ],
  templateUrl: './menus-editor.component.html',
  styleUrl: './menus-editor.component.scss',
})
export class MenusEditorComponent implements OnInit {
  public formGroup: FormGroup<MenuInputForm>;
  public readonly loading = signal(true);
  public readonly saving = signal(false);
  public readonly editorType = signal<EditorType>(EditorType.Create);

  public readonly editorTypes = EditorType;

  public readonly selectOptions = new FinSelectComponentOptions({
    getOptions: this.getMenuPositionOptions.bind(this),
  });

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(MenuApiService);
  private menuEditingId: string;

  public async ngOnInit(): Promise<void> {
    const menuEditing = await this.setEditingMenu();
    this.setFormGroup(menuEditing);
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

    const input = this.formGroup.getRawValue() as MenuInput;

    const request =
      this.editorType() === EditorType.Create
        ? this.apiService.create(input).pipe(map(() => {}))
        : this.apiService.update(this.menuEditingId, input);

    request
      .pipe(
        first(),
        finalize(() => this.saving.set(false))
      )
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      });
  }

  private getMenuPositionOptions(): Observable<
    PagedOutput<FinSelectOption<MenuPosition>>
  > {
    return of({
      totalCount: 2,
      items: [
        {
          value: MenuPosition.LeftTop,
          label: 'finCore.features.menus.leftTop',
        },
        { value: MenuPosition.Hide, label: 'finCore.features.menus.hide' },
      ],
    } as PagedOutput<FinSelectOption<MenuPosition>>);
  }

  private setFormGroup(menuEditing: MenuOutput | null): void {
    this.formGroup = new FormGroup<MenuInputForm>({
      color: new FormControl(menuEditing?.color ?? '#fdc570', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      icon: new FormControl(menuEditing?.icon ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      frontRoute: new FormControl(menuEditing?.frontRoute ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      name: new FormControl(menuEditing?.name ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      position: new FormControl(menuEditing?.position ?? null, {
        validators: Validators.required,
      }),
      keyWords: new FormControl(menuEditing?.keyWords ?? '', {
        nonNullable: true,
        validators: [Validators.maxLength(100)],
      }),
      onlyForAdmin: new FormControl(menuEditing?.onlyForAdmin ?? false, {
        nonNullable: true,
      }),
    });
    this.loading.set(false);
  }

  private async setEditingMenu(): Promise<MenuOutput | null> {
    const id = this.activatedRoute.snapshot.paramMap.get('menuId');
    if (!id) return null;

    const menu = await firstValueFrom(this.apiService.get(id));
    this.editorType.set(EditorType.Edit);
    this.menuEditingId = id;
    return menu;
  }
}
