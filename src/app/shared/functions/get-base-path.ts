export default function getBasePath(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return url.split('/').slice(0, 3).join('/');
  }
}
