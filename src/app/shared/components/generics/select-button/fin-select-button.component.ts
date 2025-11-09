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

import { SelectButtonModule } from 'primeng/selectbutton';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { FinTextComponent } from '../text/fin-text.component';
import { FinTranslatePipe } from '../../../../core/pipes/translate/fin-translate.pipe';
import { IftaLabel } from 'primeng/iftalabel';
import { FinTranslateService } from '../../../../core/services/translate/fin-translate.service';

export interface FinSelectButtonOption<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
}

@Component({
  selector: 'fin-select-button',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SelectButtonModule,
    FinTextComponent,
    FinTranslatePipe,
    IftaLabel
],
  templateUrl: './fin-select-button.component.html',
  styleUrl: './fin-select-button.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinSelectButtonComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinSelectButtonComponent<T = any> implements OnInit, ControlValueAccessor {
  @Input() public formControl!: FormControl<T | null>;

  public readonly label = input('');
  public readonly options = input.required<FinSelectButtonOption<T>[]>();
  public readonly optionLabel = input<string>('label');
  public readonly optionValue = input<string>('value');
  public readonly optionDisabled = input<string>('disabled');

  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');

  public readonly width = input('100%');
  public readonly multiple = input(false);
  public readonly readonly = input(false);

  public readonly id = input(
    `fin-select-button-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly effectiveOptions = computed(() => {
    return this.options().map(option => {
      return {
        ...option,
        label: this.translateService.translate(option.label)
      } as FinSelectButtonOption
    })
  });

  private readonly _hasError = signal(false);
  public readonly hasError = this._hasError.asReadonly();

  private _required = signal(false);
  public required = this._required.asReadonly();

  private _disabled = signal(false);
  public disabled = this._disabled.asReadonly();

  private readonly errorMessage = signal('');
  public readonly errorMessageEffective = computed(() => {
    return this.errorMessage() ?? this.customErrorText();
  });

  private readonly destroyRef = inject(DestroyRef);
  private readonly translateService = inject(FinTranslateService);

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
    }

    this.errorMessage.set(errorMessage);
  }

  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}
