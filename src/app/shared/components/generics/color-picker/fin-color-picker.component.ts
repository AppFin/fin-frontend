import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  Input,
  input,
  OnInit,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { FinTextComponent } from '../text/fin-text.component';
import { FinTranslatePipe } from '../../../../core/pipes/translate/fin-translate.pipe';
import { IftaLabel } from 'primeng/iftalabel';

@Component({
  selector: 'fin-color-picker',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FinTextComponent,
    FinTranslatePipe,
    IftaLabel,
  ],
  templateUrl: './fin-color-picker.component.html',
  styleUrl: './fin-color-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinColorPickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FinColorPickerComponent implements OnInit, ControlValueAccessor {
  @Input() public formControl: FormControl<string | null>;

  public readonly label = input('');
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly width = input('284px');
  public readonly readonly = input(false);
  public readonly id = input(
    `fin-color-picker-${Math.random().toString(36).substring(2, 9)}`
  );

  @ViewChild('input', { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  private readonly _hasError = signal(false);
  public readonly hasError = this._hasError.asReadonly();

  private _required = signal(false);
  public readonly required = this._required.asReadonly();

  private _disabled = signal(false);
  public readonly disabled = this._disabled.asReadonly();

  private readonly errorMessage = signal('');
  public readonly errorMessageEffective = computed(() => {
    return this.errorMessage() ?? this.customErrorText();
  });

  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.startRequiredSub();
  }

  public validStatesChange(): void {
    this.setRequired();
    this.setError();
    this.setDisabled();
  }

  private startRequiredSub(): void {
    this.validStatesChange();
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(100))
      .subscribe(() => {
        this.validStatesChange();
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

    if (!!this.formControl.errors) {
      const errors = this.formControl.errors;
      if (errors['required']) errorMessage = 'finCore.errors.required';
      if (errors['pattern']) errorMessage = 'finCore.errors.pattern';
    }

    this.errorMessage.set(errorMessage);
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}