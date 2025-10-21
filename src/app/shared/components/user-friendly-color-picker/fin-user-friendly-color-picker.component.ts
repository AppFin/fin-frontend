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
import { IftaLabel } from 'primeng/iftalabel';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { FinTextComponent } from '../generics/text/fin-text.component';
import { FinTranslatePipe } from '../../../core/pipes/translate/fin-translate.pipe';
import { FinIconComponent } from '../generics/icon/fin-icon.component';

@Component({
  selector: 'fin-user-friendly-color-picker',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FinTextComponent,
    FinTranslatePipe,
    IftaLabel,
    FinIconComponent,
    MatMenuModule,
  ],
  templateUrl: './fin-user-friendly-color-picker.component.html',
  styleUrl: './fin-user-friendly-color-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinUserFriendlyColorPickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FinUserFriendlyColorPickerComponent
  implements OnInit, ControlValueAccessor {
  @Input() public formControl: FormControl<string | null>;

  public readonly label = input('');
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly width = input('100%');
  public readonly readonly = input(false);
  public readonly id = input(
    `fin-user-friendly-color-picker-${Math.random().toString(36).substring(2, 9)}`
  );

  @ViewChild('colorInput') colorInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  public readonly predefinedColors = [
    '#2c3e50',
    '#34495e',
    '#7f8c8d',
    '#95a5a6',

    '#3498db',
    '#2980b9',
    '#1abc9c',
    '#16a085',

    '#27ae60',
    '#229954',
    '#52c41a',

    '#f39c12',
    '#e67e22',
    '#d35400',
    '#d30058',

    '#9b59b6',
  ];

  public readonly customColorInput = signal<string>('');

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
    if (!this.formControl.value) this.formControl.setValue('#000000')
    this.customColorInput.set(this.formControl.value || '');
  }

  public get selectedColor(): string {
    return this.formControl.value || '';
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
      .subscribe((value) => {
        this.validStatesChange();
        if (value) {
          this.customColorInput.set(value);
        }
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

  public selectColor(color: string): void {
    if (!this.disabled() && !this.readonly()) {
      this.formControl.setValue(color);
      this.formControl.markAsTouched();
      this.customColorInput.set(color);
      this.menuTrigger.closeMenu();
    }
  }

  public onCustomColorChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const color = input.value;
    this.customColorInput.set(color);
    this.formControl.setValue(color);
    this.formControl.markAsTouched();
  }

  public openMenu(): void {
    if (!this.disabled() && !this.readonly()) {
      this.menuTrigger.openMenu();
    }
  }

  public isColorSelected(color: string): boolean {
    return this.selectedColor.toLowerCase() === color.toLowerCase();
  }

  writeValue(obj: any): void {
    if (obj) {
      this.customColorInput.set(obj);
    }
  }

  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}
