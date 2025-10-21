import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  input,
  Input,
  OnInit, signal,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FinInputComponent } from '../generics/input/fin-input.component';
import { LocalizationService } from '../../../core/services/localization/localization.service';
import { debounceTime, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fin-money-input',
  imports: [FinInputComponent],
  templateUrl: './fin-money-input.component.html',
  styleUrl: './fin-money-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinMoneyInputComponent),
      multi: true,
    },
  ]
})
export class FinMoneyInputComponent implements OnInit, ControlValueAccessor {
  public readonly internalControl = new FormControl<string | null>(null);

  public readonly label = input('');

  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');

  public readonly width = input('100%');

  public readonly allowNegativeNumbers = input(true);

  public readonly readonly = input(false);
  public readonly id = input(
    `fin-money-input-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly moneyPrefix = signal('');

  private readonly localizationService = inject(LocalizationService);
  private readonly destroRef = inject(DestroyRef);

  public onTouched: () => void = () => { };
  private onChange: (value: any) => void = () => { };

  public ngOnInit(): void {
    this.moneyPrefix.set(this.localizationService.getMoneySymbol());
    this.startSyncingForms();
  }

  public outputTransformFn = (value: string | number | null | undefined): number => {
    if (!value) return 0;
    const strValue = value.toString();
    const isNegative = strValue.trim().startsWith('-');

    let cleaned = strValue
      .replaceAll(this.localizationService.getThousandSeparator(), '')
      .replaceAll(this.localizationService.getDecimalMark(), '.')
      .replace(/[^\d.]/g, '');

    if (isNegative) {
      cleaned = '-' + cleaned;
    }
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  public writeValue(value: any): void {
    if (value === null || value === undefined) this.syncValueOnInternal(null);
    const numberValue = Number(value);
    if (isNaN((numberValue))) throw (`Value ${value} is not a valid number.`)
    this.syncValueOnInternal(numberValue);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) this.internalControl.disable();
    else this.internalControl.enable();
  }

  public startSyncingForms(): void {
    this.internalControl.valueChanges.pipe(
      debounceTime(300),
      takeUntilDestroyed(this.destroRef)
    ).subscribe(v => {
      this.syncValueOnExternal(v);
    });

    this.internalControl.statusChanges.pipe(
      debounceTime(300),
      takeUntilDestroyed(this.destroRef)
    ).subscribe(() => {
      console.log('ouch  asrasd', this.internalControl.touched)
      if (this.internalControl.touched) {
        this.onTouched();
      }
    });
  }

  private syncValueOnInternal(value: number | null): void {
    this.internalControl.setValue(value?.toFixed(2) ?? null, { emitEvent: false });
  }

  private syncValueOnExternal(value: number | string | null) {
    if (value === null || value === undefined) this.onChange(null);
    else {
      value = value?.toString();
      const isNegative = value.trim().startsWith('-');

      value = value
        .replaceAll(this.localizationService.getThousandSeparator(), '')
        .replaceAll(this.localizationService.getDecimalMark(), '.')
        .replace(/[^\d.]/g, '');

      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts.slice(0, -1).join('') + '.' + parts[parts.length - 1];
      }

      if (isNegative) value = '-' + value

      const valueNumber = Number(value);

      if (isNaN(valueNumber)) throw (`Values invalid (${value})`);
      this.onChange(valueNumber);
    }
  }
}
