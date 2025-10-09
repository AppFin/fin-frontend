import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FinPageLayoutComponent } from '../fin-page-layout.component';
import { FinSaveButtonComponent } from '../../save-button/fin-save-button.component';
import { FinTextComponent } from '../../text/fin-text.component';
import { FinButtonComponent } from '../../button/fin-button.component';
import { EditorSaveOptions } from '../../../enums/layouts/editor-save-options';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { NotifyService } from '../../../../core/services/notifications/notify.service';
import { NotificationSeverity } from '../../../../core/enums/notifications/notification-severity';

@Component({
  selector: 'fin-editor-layout',
  imports: [
    FinPageLayoutComponent,
    FinSaveButtonComponent,
    FinTextComponent,
    ReactiveFormsModule,
    FinButtonComponent,
  ],
  templateUrl: './editor-layout.component.html',
  styleUrl: './editor-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorLayoutComponent<TInput> {
  public readonly title = input<string>('');
  public readonly formGroup = input<FormGroup>(new FormGroup({}));
  public readonly canSave = input(false);
  public readonly isSaving = input(false);
  public readonly loading = input(false);
  
  public readonly saveOptions = input<EditorSaveOptions<TInput>>();
  public readonly afterSave = output();

  public readonly onSave = output();
  public readonly onCancel = output();
  

  private notifyService = inject(NotifyService);
  public readonly saving = signal(false);
  
  public handleSave(): void {
    const options = this.saveOptions();
    if (!options?.onSave || !this.canSave()) return;
    
    this.saving.set(true);
    const formValue = this.formGroup().getRawValue() as TInput;
    
    options.onSave(formValue)
      .pipe(
        tap(() => {
          if (options.successMessage) {
            this.notifyService.notifySnack(options.successMessage, NotificationSeverity.Success);
          }
          this.afterSave.emit();
        }),
        catchError((error) => {
          const errorMessage = options.errorMessage || error?.error?.message || 'finCore.errors.genericError';
          this.notifyService.notifySnack(errorMessage, NotificationSeverity.Error);
          return throwError(() => error);
        }),
        finalize(() => this.saving.set(false))
      )
      .subscribe();
  }
}
