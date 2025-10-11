import { Injectable } from '@angular/core';
import { DecimalMark } from '../../types/localizations/decimal-mark';
import { ThousandSeparator } from '../../types/localizations/thousand-separator';
import {
  DATE_TIME_DEFAULT,
  DATE_TIME_DEFAULT_US,
} from '../../../shared/constants/date-time-formats';
import { getLang } from '../../functions/get-lang';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localeEs from '@angular/common/locales/es';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  public getLang(): string {
    return getLang();
  }

  public getDecimalMark(): DecimalMark {
    const lang = this.getLang();
    return lang === 'pt-BR' ? ',' : '.';
  }

  public getThousandSeparator(): ThousandSeparator {
    const lang = this.getLang();
    return lang === 'pt-BR' ? '.' : ',';
  }

  public getMoneySymbol(): string {
    const lang = this.getLang();
    return lang === 'pt-BR' ? 'R$' : '$';
  }

  public getMoneyCode(): string {
    const lang = this.getLang();
    return lang === 'pt-BR' ? 'BRL' : 'USD';
  }

  public getDefaultDatetimeFormat(): string {
    const lang = this.getLang();
    return lang == 'en-US' ? DATE_TIME_DEFAULT_US : DATE_TIME_DEFAULT;
  }

  public registerLocalization(): void {
    const lang = this.getLang();
    if (lang.includes('pt')) {
      registerLocaleData(localePt, 'pt-BR');
    } else if (lang.includes('es')) {
      registerLocaleData(localeEs, 'es');
    }
  }
}
