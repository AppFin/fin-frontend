import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localePt from '@angular/common/locales/pt';
import { Injectable } from '@angular/core';
import {
  DATE_TIME_DEFAULT,
  DATE_TIME_DEFAULT_US,
} from '../../../shared/constants/date-time-formats';
import { SupportedLocalizations } from '../../constants/localizations/supported-localizations';
import { getLangFromBrowser } from '../../functions/get-lang-from-browser';
import { DecimalMark } from '../../types/localizations/decimal-mark';
import { ThousandSeparator } from '../../types/localizations/thousand-separator';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private userLang: string | null = null;

  public getLang(): string {
    if (
      !!this.userLang &&
      SupportedLocalizations.allSupportedLocalizations.includes(this.userLang)
    ) {
      return this.userLang;
    }

    const browserLang = getLangFromBrowser();
    if (browserLang.includes('en')) return SupportedLocalizations.enUS;
    if (browserLang.includes('es')) return SupportedLocalizations.esES;
    return SupportedLocalizations.ptBR;
  }

  public getTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  public getDecimalMark(): DecimalMark {
    const lang = this.getLang();
    return lang === SupportedLocalizations.ptBR ? ',' : '.';
  }

  public getThousandSeparator(): ThousandSeparator {
    const lang = this.getLang();
    return lang === SupportedLocalizations.ptBR ? '.' : ',';
  }

  public getMoneySymbol(): string {
    const lang = this.getLang();

    let symbol = '$';
    switch (lang) {
      case SupportedLocalizations.ptBR:
        symbol = 'R$';
        break;
    }

    return symbol;
  }

  public getMoneyCode(): string {
    const lang = this.getLang();
    return lang === SupportedLocalizations.ptBR ? 'BRL' : 'USD';
  }

  public getDefaultDatetimeFormat(): string {
    const lang = this.getLang();
    return lang == 'en-US' ? DATE_TIME_DEFAULT_US : DATE_TIME_DEFAULT;
  }

  public registerLocalization(): void {
    const lang = this.getLang();
    if (lang.includes('pt')) {
      registerLocaleData(localePt, SupportedLocalizations.ptBR);
    } else if (lang.includes('es')) {
      registerLocaleData(localeEs, SupportedLocalizations.esES);
    }
  }

  public setUserLang(userLang: string): void {
    this.userLang = userLang;
  }
}
