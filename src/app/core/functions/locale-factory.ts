import { getLang } from './get-lang';

export function localeIdFactory(): string {
  const lang = getLang();

  let localeId = 'en-US';
  if (lang.includes('pt')) {
    localeId = 'pt-BR';
  } else if (lang.includes('es')) {
    localeId = 'es';
  }
  return localeId;
}