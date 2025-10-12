import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject, tap } from 'rxjs';
import { CardBrandApiService } from '../../../core/services/card-brand/card-brand-api.service';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { CardBrandOutput } from '../../../core/types/card-brands/card-brand-output';
import { FinPageLayoutComponent } from '../../../shared/components/page-layout/fin-page-layout.component';
import { FinGridComponent } from '../../../shared/components/grid/fin-grid.component';
import { FinButtonComponent } from '../../../shared/components/button/fin-button.component';
import { FinGridOptions } from '../../../shared/components/grid/models/fin-grid-options';
import { IFinGridColumnOption } from '../../../shared/components/grid/models/columns/i-fin-grid-column-option';
import { FinGridSimpleColumnOption } from '../../../shared/components/grid/models/columns/fin-grid-simple-column-option';
import { FinGridIconColumnOption, FinIconOptions } from '../../../shared/components/grid/models/columns/fin-grid-icon-column-option';

@Component({
  selector: 'fin-card-brand-list',
  standalone: true,
  imports: [FinPageLayoutComponent, FinGridComponent, FinButtonComponent],
  templateUrl: './card-brand-list.component.html',
  styleUrl: './card-brand-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBrandListComponent implements OnInit {
  public readonly gridOptions = signal<FinGridOptions>(new FinGridOptions());
  public readonly loading = signal(true);

  private readonly apiService = inject(CardBrandApiService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly reloadItens = new Subject<void>();

  public ngOnInit(): void {
    this.setOptions();
  }

  public createCardBrand(): void {
    this.router.navigate(['./new'], { relativeTo: this.activatedRoute });
  }

  private setOptions() {
    const gridOptions = new FinGridOptions({
      id: 'CARD_BRAND_LIST',
      getColumns: () => of(this.getColumns()),
      getList: (input) => this.getCardBrands(input),
      reloadItens: this.reloadItens,
      onDelete: this.delete.bind(this),
      onEdit: this.edit.bind(this),
    });

    this.gridOptions.set(gridOptions);
    this.loading.set(false);
  }

  private getColumns(): IFinGridColumnOption<CardBrandOutput>[] {
    return [
      new FinGridIconColumnOption<CardBrandOutput>({
        getValue: (item) =>
          new FinIconOptions({
            type: 'image',
            imageFolder: 'icons/flags/',
            icon: item.icon,
            tooltip: item.name,
          }),
        header: 'finCore.features.cardBrand.icon',
        width: '50px',
      }),
      new FinGridSimpleColumnOption<CardBrandOutput>({
        getValue: (item) => item.name,
        header: 'finCore.features.cardBrand.name',
      }),
    ];
  }

  private edit(item: CardBrandOutput): Observable<void> {
    this.router.navigate([`./${item.id}`], { relativeTo: this.activatedRoute });
    return of();
  }

  private delete(item: CardBrandOutput): Observable<void> {
    return this.apiService
      .delete(item.id)
      .pipe(tap(() => this.reloadItens.next()));
  }

  private getCardBrands(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<CardBrandOutput>> {
    return this.apiService.getList(input);
  }
}
