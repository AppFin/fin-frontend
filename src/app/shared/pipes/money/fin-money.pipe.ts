import { CurrencyPipe } from '@angular/common';
import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from '../../../core/services/localization/localization.service';

@Pipe({
  name: 'finMoney',
  pure: true,
})
export class FinMoneyPipe implements PipeTransform {
  private locale = inject(LOCALE_ID);
  private localizationService = inject(LocalizationService);
  private currencyPipe = new CurrencyPipe(this.locale);

  /**
   * Transforms the value based on the configuration of the LocalizationService.
   *
   * @param value The number to be formatted.
   * @param formatType The type of formatting: 'number' (default) or 'currency'.
   * @param digitsInfo The decimal formatting string, e.g., '1.2-2' (optional).
   * @returns The formatted value as a string.
   */
  public transform(value: number | null | undefined): string | null {
    if (value === null || value === undefined) {
      return null;
    }
    const targetLocale = this.localizationService.getLang();

    const digitsInfo = '1.2-2';

    const currencySymbol = this.localizationService.getMoneySymbol();
    const currencyCode = this.localizationService.getMoneyCode();

    return this.currencyPipe.transform(
      value,
      currencyCode,
      currencySymbol,
      digitsInfo,
      targetLocale
    );
  }
}
