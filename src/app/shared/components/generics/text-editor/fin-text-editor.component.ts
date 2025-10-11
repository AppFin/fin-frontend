import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  forwardRef,
  inject,
  Input,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { FinTextComponent } from '../text/fin-text.component';
import { FinTranslatePipe } from '../../../../core/pipes/translate/fin-translate.pipe';
import { EditorModule } from 'primeng/editor';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
  selector: 'fin-text-editor',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FinTextComponent,
    FinTranslatePipe,
    EditorModule,
    FloatLabelModule,
    IftaLabelModule,
  ],
  templateUrl: './fin-text-editor.component.html',
  styleUrl: './fin-text-editor.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinTextEditorComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinTextEditorComponent implements OnInit, ControlValueAccessor {
  @Input({ required: true }) public formControl!: FormControl<string | null>;

  public readonly label = input('');
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly width = input('100%');
  public readonly readOnly = input(false);
  public readonly placeholder = input('');
  public readonly id = input(
    `fin-editor-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly editorStyle = input<{ [key: string]: string }>({});
  public readonly formats = input<string[] | undefined>(undefined);

  private readonly _hasError = signal(false);
  private _required = signal(false);
  private _disabled = signal(false);
  private readonly errorMessage = signal('');

  public readonly hasError = this._hasError.asReadonly();
  public required = this._required.asReadonly();
  public disabled = this._disabled.asReadonly();

  public readonly errorMessageEffective = computed(() => {
    return this.errorMessage() || this.customErrorText();
  });

  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.startValidationSubscription();
  }

  public validStatesChange(): void {
    this.setRequired();
    this.setError();
    this.setDisabled();
  }

  private startValidationSubscription(): void {
    this.validStatesChange();

    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(100))
      .subscribe(() => {
        this.validStatesChange();
      });

    this.formControl.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.setDisabled();
      });
  }

  private setRequired(): void {
    this._required.set(this.formControl.hasValidator(Validators.required));
  }

  private setDisabled(): void {
    this._disabled.set(this.formControl.disabled);
  }

  private setError(): void {
    const hasError =
      this.formControl.invalid &&
      (this.formControl.touched || this.formControl.dirty);
    this._hasError.set(hasError);

    let errorMessage = this.customErrorText() ?? '';

    if (this.formControl.errors) {
      const errors = this.formControl.errors;
      if (errors['required']) errorMessage = 'finCore.errors.required';

      if (errors['minlength'])
        errorMessage = `finCore.errors.minLength|minLength:${errors['minlength'].requiredLength}`;
      if (errors['maxlength'])
        errorMessage = `finCore.errors.maxLength|maxLength:${errors['maxlength'].requiredLength}`;
    }

    this.errorMessage.set(errorMessage);
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}