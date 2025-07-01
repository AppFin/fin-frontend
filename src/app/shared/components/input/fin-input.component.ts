import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  input,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { FinTextComponent } from '../text/fin-text.component';
import { FinTranslatePipe } from '../../../core/pipes/translate/fin-translate.pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { ThousandSeparator } from '../../../core/types/localizations/thousand-separator';
import { LocalizationService } from '../../../core/services/localization/localization.service';
import { DecimalMark } from '../../../core/types/localizations/decimal-mark';
import { InputIcon } from 'primeng/inputicon';
import {
  FinIconComponent,
  FinFontAwesomeType,
  FinIconType,
} from '../icon/fin-icon.component';
import { IconField } from 'primeng/iconfield';

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
  ],
  templateUrl: './fin-input.component.html',
  styleUrl: './fin-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinInputComponent implements OnInit {
  @Input() public formControl: FormControl<string | null>;

  public readonly label = input('');
  public readonly type = input('text');

  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');

  public readonly readonly = input(false);
  public readonly id = input(
    `fin-input-${Math.random().toString(36).substring(2, 9)}`
  );

  // mask options
  public readonly mask = input<string>();
  public readonly shownMaskExpression = input<string | null>(null);
  public readonly allowNegativeNumbers = input(false);
  public readonly validationMask = input(false);
  public readonly hiddenInput = input(false);
  public readonly leadZero = input(false);
  public readonly thousandSeparator = input<ThousandSeparator | null>(null);
  public readonly decimalMarker = input<DecimalMark | null>(null);
  public readonly inputTransformFn = input<((value: unknown) => string) | null>(
    null
  );
  public readonly outputTransformFn = input<
    ((value: string | number | null | undefined) => string) | null
  >(null);
  @ViewChild('input', { static: true }) inputRef!: ElementRef<HTMLInputElement>;
  public readonly hasError = signal(false);

  // icon prefix
  public readonly iconPrefix = input('');
  public readonly iconPrefixTooltip = input<string>('');
  public readonly iconPrefixColor = input<string|null>(null);
  public readonly iconPrefixFontAwesomeType = input<FinFontAwesomeType>('fas');
  public readonly iconPrefixType = input<FinIconType>('fontAwesome');
  public readonly iconPrefixImageFolder = input<string>('icons/');
  public readonly iconPrefixImageExtension = input<string>('.png');

  // icon suffix
  public readonly iconSuffix = input('');
  public readonly iconSuffixTooltip = input<string>('');
  public readonly iconSuffixColor = input<string|null>(null);
  public readonly iconSuffixFontAwesomeType = input<FinFontAwesomeType>('fas');
  public readonly iconSuffixType = input<FinIconType>('fontAwesome');
  public readonly iconSuffixImageFolder = input<string>('icons/');
  public readonly iconSuffixImageExtension = input<string>('.png');

  // templates prefix and suffix
  public readonly prefixTemplate = input<TemplateRef<any> | null>(null);
  public readonly suffixTemplate = input<TemplateRef<any> | null>(null);

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

  private _required = signal(false);
  public required = this._required.asReadonly();

  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.startRequiredSub();
  }

  public validStatesChange(): void {
    this.setRequired();
    this.setError();
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

  private setError(): void {
    const hasError =
      this.formControl.invalid &&
      (this.formControl.touched || this.formControl.dirty);
    this.hasError.set(hasError);

    let errorMessage = '';

    if (!!this.formControl.errors) {
      const errors = this.formControl.errors;
      if (errors['required']) errorMessage = 'fin-core.errors.required';
      if (errors['email']) errorMessage = 'fin-core.errors.email';
      if (errors['minlength'])
        errorMessage = `fin-core.errors.minLength|minLength:${errors['minLength'].requiredLength}`;
      if (errors['maxlength'])
        errorMessage = `fin-core.errors.maxLength|maxLength:${errors['maxLength'].requiredLength}`;
      if (errors['pattern']) errorMessage = 'fin-core.errors.pattern';
    }

    this.errorMessage.set(errorMessage);
  }
}
