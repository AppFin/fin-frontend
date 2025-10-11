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
import { FloatLabelModule } from 'primeng/floatlabel';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { FinTextComponent } from '../text/fin-text.component';
import { FinTranslatePipe } from '../../../../core/pipes/translate/fin-translate.pipe';
import { IftaLabelModule } from 'primeng/iftalabel';
import { CalendarModule } from 'primeng/calendar';

type DateTimeValue = Date | string | null;

@Component({
  selector: 'fin-datetime',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    FinTextComponent,
    FinTranslatePipe,
    IftaLabelModule,
    CalendarModule,
  ],
  templateUrl: './fin-date-time.component.html',
  styleUrl: './fin-date-time.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinDatetimeComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FinDatetimeComponent implements OnInit, ControlValueAccessor {
  @Input({ required: true }) public formControl!: FormControl<DateTimeValue>;

  public readonly label = input('');
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly width = input('100%');
  public readonly readonly = input(false);
  public readonly id = input(
    `fin-datetime-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly showTime = input(true);
  public readonly hourFormat = input<'12' | '24'>('24');
  public readonly dateFormat = input('dd/mm/yy');
  public readonly placeholder = input<string>('');
  public readonly minDate = input<Date | null>(null);
  public readonly maxDate = input<Date | null>(null);

  private readonly _hasError = signal(false);
  private _required = signal(false);
  private _disabled = signal(false);
  private readonly errorMessage = signal('');

  public readonly hasError = this._hasError.asReadonly();
  public required = this._required.asReadonly();
  public disabled = this._disabled.asReadonly();

  public readonly errorMessageEffective = computed(() => {
    return this.errorMessage() ?? this.customErrorText();
  });

  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.startValidationSubscription();
  }

  public validStatesChange(): void {
    this.setRequired();
    this.setDisabled();
    this.setError();
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
      if (errors['minDate'] || errors['maxDate']) {
        errorMessage = 'finCore.errors.dateRange';
      }
    }

    this.errorMessage.set(errorMessage);
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}