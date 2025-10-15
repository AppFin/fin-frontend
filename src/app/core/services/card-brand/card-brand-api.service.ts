import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ensureTrailingSlash } from '../../functions/ensure-trailing-slash';
import { toHttpParams } from '../../functions/to-http-params';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { CardBrandOutput } from '../../types/card-brands/card-brand-output';
import { CardBrandInput } from '../../types/card-brands/card-brand-input';
import { CachedEntityService } from '../../../shared/services/abstractions/cached-entities/cached-entity.service';

@Injectable({
  providedIn: 'root',
})
export class CardBrandApiService extends CachedEntityService<CardBrandOutput> {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${ensureTrailingSlash(environment.apiUrl)}card-brand`;

  public get(id: string): Observable<CardBrandOutput> {
    return this.http.get<CardBrandOutput>(`${this.apiUrl}/${id}`);
  }

  public getList = (
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<CardBrandOutput>> => {
    const params = toHttpParams(input);
    return this.http.get<PagedOutput<CardBrandOutput>>(this.apiUrl, { params });
  };

  public create(input: CardBrandInput): Observable<CardBrandOutput> {
    return this.http
      .post<CardBrandOutput>(this.apiUrl, input)
      .pipe(tap((cardBrand) => this.updateOrCreateOnCache(cardBrand)));
  }

  public update(id: string, input: CardBrandInput): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, input).pipe(
      tap(async () => {
        const brand = await firstValueFrom(this.get(id));
        this.updateOrCreateOnCache(brand);
      })
    );
  }

  public delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.delete(id)));
  }

  protected override applyStructuralFilter(
    entity: CardBrandOutput,
    filter: PagedFilteredAndSortedInput
  ): boolean {
    return true;
  }
}
