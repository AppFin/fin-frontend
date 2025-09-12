import { Component } from '@angular/core';
import { FinInputComponent } from '../../../shared/components/input/fin-input.component';
import { FormControl } from '@angular/forms';
import { MenuPosition } from '../../../core/enums/layouts/menu-position';
import { FinSelectComponentOptions } from '../../../shared/components/select/fin-select-component-options';
import { FinSelectOption } from '../../../shared/components/select/fin-select-option';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { Observable, of } from 'rxjs';
import { FinSelectComponent } from '../../../shared/components/select/fin-select.component';
import { FinColorPickerComponent } from '../../../shared/components/color-picker/fin-color-picker.component';
import { EditorLayoutComponent } from '../../../shared/components/page-layout/editor-layout/editor-layout.component';

@Component({
  selector: 'fin-menus-editor',
  imports: [
    FinInputComponent,
    FinSelectComponent,
    FinColorPickerComponent,
    EditorLayoutComponent,
  ],
  templateUrl: './menus-editor.component.html',
  styleUrl: './menus-editor.component.scss',
})
export class MenusEditorComponent {
  public readonly selectOptions = new FinSelectComponentOptions({
    getOptions: this.getMenuPositionOptions.bind(this),
  });

  mockFOrm = new FormControl();
  mockFOrm2 = new FormControl();

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
}
