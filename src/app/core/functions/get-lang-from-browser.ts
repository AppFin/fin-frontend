export function getLangFromBrowser(): string {
  return navigator.language || navigator.languages[0] || 'pt-BR';
}
