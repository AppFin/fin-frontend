export function getLang(): string {
  const browserLang = navigator.language || navigator.languages[0];
  return browserLang || 'pt-BR';
}