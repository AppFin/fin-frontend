export function isHtml(text: string): boolean {
  const htmlRegex = /<[^>]+>/;
  return htmlRegex.test(text);
}