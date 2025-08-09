export class PagedOutput<T = any> {
  public items: T[] = [];
  public totalCount: number = 0;
}