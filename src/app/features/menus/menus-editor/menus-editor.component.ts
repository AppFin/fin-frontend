import { Component, OnInit, signal } from '@angular/core';
import { FinInputComponent } from '../../../shared/components/input/fin-input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuPosition } from '../../../core/enums/layouts/menu-position';
import { FinSelectComponentOptions } from '../../../shared/components/select/fin-select-component-options';
import { FinSelectOption } from '../../../shared/components/select/fin-select-option';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { Observable, of } from 'rxjs';
import { FinSelectComponent } from '../../../shared/components/select/fin-select.component';
import { FinColorPickerComponent } from '../../../shared/components/color-picker/fin-color-picker.component';
import { EditorLayoutComponent } from '../../../shared/components/page-layout/editor-layout/editor-layout.component';
import { FinToggleSwitchComponent } from '../../../shared/components/toggle-switch/fin-toggle-switch.component';

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

  public readonly selectOptions = new FinSelectComponentOptions({
    getOptions: this.getMenuPositionOptions.bind(this),
  });

  public ngOnInit(): void {
    this.setFormGroup();
  }

  public get canSave(): boolean {
    return (
      this.formGroup.valid &&
      this.formGroup.touched &&
      !this.loading() &&
      !this.saving()
    );
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

  private setFormGroup(): void {
    this.formGroup = new FormGroup<MenuInputForm>({
      color: new FormControl('#fdc570', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      icon: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      frontRoute: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      position: new FormControl(null, {
        validators: Validators.required,
      }),
      keyWords: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      onlyForAdmin: new FormControl(false, {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
    this.loading.set(false);
  }
}
