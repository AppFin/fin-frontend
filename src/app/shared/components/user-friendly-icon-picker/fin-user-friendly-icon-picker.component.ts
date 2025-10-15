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
  selector: 'fin-user-friendly-icon-picker',
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
  templateUrl: './fin-user-friendly-icon-picker.component.html',
  styleUrl: './fin-user-friendly-icon-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinUserFriendlyIconPickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FinUserFriendlyIconPickerComponent
  implements OnInit, ControlValueAccessor
{
  @Input() public formControl: FormControl<string | null>;

  public readonly label = input('');
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly width = input('100%');
  public readonly readonly = input(false);
  public readonly id = input(
    `fin-user-friendly-icon-picker-${Math.random().toString(36).substring(2, 9)}`
  );

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  public readonly predefinedIcons = [
    'wallet',
    'sack-dollar',
    'money-bill-transfer',
    'receipt',
    'landmark',
    'piggy-bank',
    'house',
    'car',
    'cart-shopping',
    'utensils',
    'kit-medical',
    'gamepad',
    'graduation-cap',
    'plane',
    'dollar-sign',
    'euro-sign'
  ];

  public readonly customIconInput = signal<string>('');
  public readonly fontAwesomeUrl = 'https://fontawesome.com/search?o=r&m=free';

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
    this.customIconInput.set(this.formControl.value || 'circle');
  }

  public get selectedIcon(): string {
    return this.formControl.value || 'circle';
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
          this.customIconInput.set(value);
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

  public selectIcon(icon: string): void {
    if (!this.disabled() && !this.readonly()) {
      this.formControl.setValue(icon);
      this.formControl.markAsTouched();
      this.customIconInput.set(icon);
      this.menuTrigger.closeMenu();
    }
  }

  public onCustomIconChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const icon = input.value;
    this.customIconInput.set(icon);
    this.formControl.setValue(icon);
    this.formControl.markAsTouched();
  }

  public openMenu(): void {
    if (!this.disabled() && !this.readonly()) {
      this.menuTrigger.openMenu();
    }
  }

  public isIconSelected(icon: string): boolean {
    return this.selectedIcon.toLowerCase() === icon.toLowerCase();
  }

  public openFontAwesome(): void {
    window.open(this.fontAwesomeUrl, '_blank');
  }

  writeValue(obj: any): void {
    if (obj) {
      this.customIconInput.set(obj);
    }
  }

  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}