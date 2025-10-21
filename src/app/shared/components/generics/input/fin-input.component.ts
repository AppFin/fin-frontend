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
  TemplateRef,
  ViewChild,
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
import { FloatLabelModule } from 'primeng/floatlabel';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { FinTextComponent } from '../text/fin-text.component';
import { FinTranslatePipe } from '../../../../core/pipes/translate/fin-translate.pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { ThousandSeparator } from '../../../../core/types/localizations/thousand-separator';
import { LocalizationService } from '../../../../core/services/localization/localization.service';
import { DecimalMark } from '../../../../core/types/localizations/decimal-mark';
import { InputIcon } from 'primeng/inputicon';
import {
  FinFontAwesomeType,
  FinIconComponent,
  FinIconType,
} from '../icon/fin-icon.component';
import { IconField } from 'primeng/iconfield';
import { IftaLabel } from 'primeng/iftalabel';
import { FinSeverity } from '../../../../core/types/themes/fin-severity';

@Component({
  selector: 'fin-input',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    FinTextComponent,
    FinTranslatePipe,
    NgxMaskDirective,
    InputIcon,
    FinIconComponent,
    IconField,
    IftaLabel,
  ],
  templateUrl: './fin-input.component.html',
  styleUrl: './fin-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinInputComponent implements OnInit, ControlValueAccessor {
  @Input() public formControl: FormControl<string | number | null>;

  public readonly label = input('');
  public readonly placeholder = input<string>('');
  public readonly type = input('text');

  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');

  public readonly width = input('100%');

  public readonly readonly = input(false);
  public readonly id = input(
    `fin-input-${Math.random().toString(36).substring(2, 9)}`
  );

  // mask options
  public readonly mask = input<string>();
  public readonly prefix = input<string>('');
  public readonly shownMaskExpression = input<string | null>(null);
  public readonly allowNegativeNumbers = input(false);
  public readonly validationMask = input(false);
  public readonly hiddenInput = input(false);
  public readonly leadZero = input(false);
  public readonly dropSpecialCharacters = input(false);
  public readonly thousandSeparator = input<ThousandSeparator | null>(null);
  public readonly decimalMarker = input<DecimalMark | null>(null);
  public readonly inputTransformFn = input<((value: unknown) => string) | null>(
    null
  );
  public readonly outputTransformFn = input<
    ((value: string | number | null | undefined) => string | number) | null
  >(null);

  // icon prefix
  public readonly iconPrefix = input('');
  public readonly iconPrefixTooltip = input<string>('');
  public readonly iconPrefixColor = input<string | undefined>(undefined);
  public readonly iconPrefixFontAwesomeType =
    input<FinFontAwesomeType>('fa-solid');
  public readonly iconPrefixType = input<FinIconType>('fontAwesome');
  public readonly iconPrefixImageFolder = input<string>('icons/');
  public readonly iconPrefixImageExtension = input<string>('.png');
  public readonly iconPrefixSeverity = input<FinSeverity | null>(null);

  // icon suffix
  public readonly iconSuffix = input('');
  public readonly iconSuffixTooltip = input<string>('');
  public readonly iconSuffixColor = input<string | undefined>(undefined);
  public readonly iconSuffixFontAwesomeType =
    input<FinFontAwesomeType>('fa-solid');
  public readonly iconSuffixType = input<FinIconType>('fontAwesome');
  public readonly iconSuffixImageFolder = input<string>('icons/');
  public readonly iconSuffixImageExtension = input<string>('.png');
  public readonly iconSuffixSeverity = input<FinSeverity | null>(null);

  // templates prefix and suffix
  public readonly prefixTemplate = input<TemplateRef<any> | null>(null);
  public readonly suffixTemplate = input<TemplateRef<any> | null>(null);

  @ViewChild('input', { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  private readonly _hasError = signal(false);
  public readonly hasError = this._hasError.asReadonly();

  private _required = signal(false);
  public required = this._required.asReadonly();

  private _disabled = signal(false);
  public disabled = this._disabled.asReadonly();

  private readonly localizationService = inject(LocalizationService);
  public readonly validThousandSeparator = computed(
    () =>
      this.thousandSeparator() ??
      this.localizationService.getThousandSeparator()
  );
  public readonly validDecimalMarker = computed(
    () => this.decimalMarker() ?? this.localizationService.getDecimalMark()
  );
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
      if (errors['email']) errorMessage = 'finCore.errors.email';
      if (errors['minlength'])
        errorMessage = `finCore.errors.minLength|minLength:${errors['minlength'].requiredLength}`;
      if (errors['maxlength'])
        errorMessage = `finCore.errors.maxLength|maxLength:${errors['maxlength'].requiredLength}`;
      if (errors['pattern']) errorMessage = 'finCore.errors.pattern';
      if (errors['nameAlreadyInUse']) errorMessage = `finCore.errors.nameAlreadyInUse|nameAlreadyInUse:${errors['nameAlreadyInUse'].value}`;
    }

    this.errorMessage.set(errorMessage);
  }

  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}
