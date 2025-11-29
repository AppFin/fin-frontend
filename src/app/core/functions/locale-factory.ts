import { SupportedLocalizations } from '../constants/localizations/supported-localizations';
import { getLangFromBrowser } from './get-lang-from-browser';

export function localeIdFactory(): string {
  const lang = getLangFromBrowser();

  let localeId = SupportedLocalizations.ptBR;
  if (lang.includes('en')) {
    localeId = SupportedLocalizations.enUS;
  } else if (lang.includes('es')) {
    localeId = SupportedLocalizations.esES;
  }
  return localeId;
}
