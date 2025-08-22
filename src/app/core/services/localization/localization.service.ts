import { Injectable } from '@angular/core';
import { DecimalMark } from '../../types/localizations/decimal-mark';
import { ThousandSeparator } from '../../types/localizations/thousand-separator';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  public getLang(): string {
    const browserLang = navigator.language || navigator.languages[0];
    return browserLang || 'pt-BR';
  }

  public getDecimalMark(): DecimalMark {
    const lang = this.getLang();
    return lang === 'pt-BR' ? ',' : '.';
  }

  public getThousandSeparator(): ThousandSeparator {
    const lang = this.getLang();
    return lang === 'pt-BR' ? '.' : ',';
  }
}
