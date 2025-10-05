import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, } from '@angular/core';
import { FinButtonComponent } from '../../../shared/components/button/fin-button.component';
import { FinGridComponent } from '../../../shared/components/grid/fin-grid.component';
import { FinPageLayoutComponent } from '../../../shared/components/page-layout/fin-page-layout.component';
import { FinGridOptions } from '../../../shared/components/grid/models/fin-grid-options';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Observable, of, Subject, tap } from 'rxjs';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { TitleCategoryOutput } from '../../../shared/types/title-categories/title-category-output';
import { TitleCategoryApiService } from '../../../shared/services/title-categories/title-category-api.service';
import { TitleCategoryGetListInput } from '../../../shared/types/title-categories/title-category-get-list-input';
import { IFinGridActionOption } from '../../../shared/components/grid/models/i-fin-grid-action-option';
import {
  FinGridIconColumnOption,
  FinIconOptions,
} from '../../../shared/components/grid/models/columns/fin-grid-icon-column-option';
import { IFinGridColumnOption } from '../../../shared/components/grid/models/columns/i-fin-grid-column-option';
import {
  FinGridSimpleColumnOption
} from '../../../shared/components/grid/models/columns/fin-grid-simple-column-option';
import { TitleCategoryType } from '../../../shared/enums/title-categories/title-category-type';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  TitleCategoryTypeSelectorComponent
} from '../components/title-category-type-selector/title-category-type-selector.component';
import {
  TitleCategoryInactivatedFilterSelectorComponent
} from '../components/title-category-inactivated-filter-selector/title-category-inactivated-filter-selector.component';

type TitleCategoriesListFilterForm = {
  type: FormControl<TitleCategoryType | null>;
  inactivated: FormControl<boolean | null>;
};

@Component({
  selector: 'fin-title-categories-list',
  imports: [
    FinButtonComponent,
    FinGridComponent,
    FinPageLayoutComponent,
    TitleCategoryTypeSelectorComponent,
    TitleCategoryInactivatedFilterSelectorComponent,
  ],
  templateUrl: './title-categories-list.component.html',
  styleUrl: './title-categories-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCategoriesListComponent implements OnInit {
  public readonly gridOptions = signal<FinGridOptions<TitleCategoryOutput>>(
    new FinGridOptions()
  );
  public readonly loading = signal(true);

  public filterForm: FormGroup<TitleCategoriesListFilterForm>;

  private readonly apiService = inject(TitleCategoryApiService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  private readonly reloadItens = new Subject<void>();

  public ngOnInit(): void {
    this.setForm();
    this.setOptions();
  }

  public createTitleCategory(): void {
    this.router.navigate(['./new'], { relativeTo: this.activatedRoute });
  }

  private setOptions() {
    const gridOptions = new FinGridOptions({
      id: 'TITLE_CATEGORIES_LIST',
      getColumns: () => of(this.getColumns()),
      getRightActions: () => of(this.getActions()),
      reloadItens: this.reloadItens,
      getList: (input) => this.getTitleCategories(input),
      onEdit: this.edit.bind(this),
      rowStyle: (item) => {
        return item.inactivated
          ? { backgroundColor: 'var(--color-error-50)' }
          : null;
      },
      deleteOptions: {
        onDelete: this.delete.bind(this),
        confirmDeleteMessage: 'finCore.features.titleCategory.deleteMessage',
      },
    });

    this.gridOptions.set(gridOptions);
    this.loading.set(false);
  }

  public getActions(): IFinGridActionOption<TitleCategoryOutput>[] {
    return [
      {
        icon: (i) =>
          new FinIconOptions({
            icon: i.inactivated ? 'toggle-off' : 'toggle-on',
            tooltip: `finCore.features.titleCategory.${i.inactivated ? 'active' : 'inactive'}`,
          }),
        onClick: (item) => this.toggleInactivated(item),
      },
    ];
  }

  private edit(item: TitleCategoryOutput): Observable<void> {
    this.router.navigate([`./${item.id}`], { relativeTo: this.activatedRoute });
    return of();
  }

  private delete(item: TitleCategoryOutput): Observable<void> {
    return this.apiService.delete(item.id);
  }

  private toggleInactivated(item: TitleCategoryOutput): Observable<void> {
    return this.apiService
      .toggleInactivated(item.id)
      .pipe(tap(() => this.reloadItens.next()));
  }

  private getTitleCategories(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<TitleCategoryOutput>> {
    return this.apiService.getList({
      ...input,
      ...this.filterForm.value,
    } as TitleCategoryGetListInput);
  }

  private getColumns(): IFinGridColumnOption<TitleCategoryOutput>[] {
    return [
      new FinGridIconColumnOption<TitleCategoryOutput>({
        header: 'finCore.features.titleCategory.icon',
        width: '5%',
        getValue: (item) =>
          new FinIconOptions({
            icon: item.icon,
            color: item.color,
          }),
      }),
      new FinGridSimpleColumnOption<TitleCategoryOutput>({
        getValue: (item) => item.name,
        header: 'finCore.features.titleCategory.name',
      }),
      new FinGridSimpleColumnOption<TitleCategoryOutput>({
        getValue: (item) =>
          `finCore.features.titleCategory.type.${TitleCategoryType[item.type].toLowerCase()}`,
        header: 'finCore.features.titleCategory.type.title',
        width: '10%',
      }),
    ];
  }

  private setForm(): void {
    this.filterForm = new FormGroup<TitleCategoriesListFilterForm>({
      inactivated: new FormControl(),
      type: new FormControl(),
    });

    this.filterForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(300))
      .subscribe(() => this.reloadItens.next());
  }
}
