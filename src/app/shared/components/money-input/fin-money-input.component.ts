import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Input,
  OnInit, signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FinInputComponent } from '../generics/input/fin-input.component';
import { LocalizationService } from '../../../core/services/localization/localization.service';

@Component({
  selector: 'fin-money-input',
  imports: [FinInputComponent],
  templateUrl: './fin-money-input.component.html',
  styleUrl: './fin-money-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinMoneyInputComponent implements OnInit {
  @Input() public formControl: FormControl<number | string | null>;

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

  public ngOnInit(): void {
    this.moneyPrefix.set(this.localizationService.getMoneySymbol());
    this.normalizeValue();
  }

  public outputTransformFn = (value: string | number | null | undefined): number | null => {
    if (value === null || value === undefined || value == '') {

      return null;
    }
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

  private normalizeValue(): void {
    const value = this.formControl.value;
    if (value === null || value === undefined) return;
    const valueStr = Number(value).toFixed(2);
    this.formControl.setValue(valueStr)
  }
}
