import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalizationService } from '../../../core/services/localization/localization.service';
import { FinInputComponent } from '../generics/input/fin-input.component';

@Component({
  selector: 'fin-percentage-input',
  imports: [FinInputComponent],
  templateUrl: './fin-percentage-input.component.html',
  styleUrl: './fin-percentage-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinPercentageInputComponent implements OnInit {
  @Input() public formControl: FormControl<number | string | null>;

  public readonly label = input('');

  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');

  public readonly width = input('100%');

  public readonly allowNegativeNumbers = input(true);

  public readonly readonly = input(false);
  public readonly id = input(
    `fin-percentage-input-${Math.random().toString(36).substring(2, 9)}`
  );

  private readonly localizationService = inject(LocalizationService);

  public ngOnInit(): void {
    this.normalizeValue();
  }

  public outputTransformFn = (
    value: string | number | null | undefined
  ): number | null => {
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
    this.formControl.setValue(valueStr);
  }
}
