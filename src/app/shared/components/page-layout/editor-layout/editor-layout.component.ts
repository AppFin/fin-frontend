import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FinPageLayoutComponent } from '../fin-page-layout.component';
import { FinSaveButtonComponent } from '../../save-button/fin-save-button.component';
import { FinTextComponent } from '../../text/fin-text.component';

@Component({
  selector: 'fin-editor-layout',
  imports: [
    FinPageLayoutComponent,
    FinSaveButtonComponent,
    FinTextComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './editor-layout.component.html',
  styleUrl: './editor-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorLayoutComponent {
  public readonly title = input<string>('');
  public readonly formGroup = input<FormGroup>(new FormGroup({}));
  public readonly canSave = input(false);
  public readonly isSaving = input(false);
  public readonly onSave = output();
}
