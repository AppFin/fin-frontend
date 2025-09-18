export function isHtml(text: string): boolean {
  const htmlRegex = /<\/?[a-z][^<>]*>/i;
  return!htmlRegex.test(text);
}