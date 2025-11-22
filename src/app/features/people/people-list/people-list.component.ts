import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Observable, of, Subject, tap } from 'rxjs';
import { FinButtonComponent } from '../../../shared/components/generics/button/fin-button.component';
import { FinGridComponent } from '../../../shared/components/generics/grid/fin-grid.component';
import { FinGridSimpleColumnOption } from '../../../shared/components/generics/grid/models/columns/fin-grid-simple-column-option';
import { IFinGridColumnOption } from '../../../shared/components/generics/grid/models/columns/i-fin-grid-column-option';
import { FinGridOptions } from '../../../shared/components/generics/grid/models/fin-grid-options';
import { FinPageLayoutComponent } from '../../../shared/components/generics/page-layout/fin-page-layout.component';
import { FinInactivatedFilterSelectComponent } from '../../../shared/components/inactivated-filter-select/fin-inactivated-filter-select.component';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { ObservableValidated } from '../../../shared/rxjs-operators/handle-fin-back-http-error';
import { PeopleService } from '../../../shared/services/people/person.service';
import { PersonGetListInput } from '../../../shared/types/people/person-get-list-input';
import { PersonOutput } from '../../../shared/types/people/person-output';

type PeopleListFilterForm = {
  inactivated: FormControl<boolean | null>;
};

@Component({
  selector: 'fin-people-list',
  imports: [
    FinButtonComponent,
    FinGridComponent,
    FinInactivatedFilterSelectComponent,
    FinPageLayoutComponent,
  ],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleListComponent implements OnInit {
  public readonly gridOptions = signal<FinGridOptions<PersonOutput>>(
    new FinGridOptions()
  );
  public readonly loading = signal(true);

  public filterForm: FormGroup<PeopleListFilterForm>;

  private readonly apiService = inject(PeopleService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  private readonly reloadItens = new Subject<void>();

  public ngOnInit(): void {
    this.setForm();
    this.setOptions();
  }

  public createPerson(): void {
    this.router.navigate(['./new'], { relativeTo: this.activatedRoute });
  }

  private setOptions() {
    const gridOptions = new FinGridOptions({
      id: 'PEOPLE_LIST',
      getColumns: () => of(this.getColumns()),
      reloadItens: this.reloadItens,
      getList: (input) => this.getPeople(input),
      onEdit: this.edit.bind(this),
      rowStyle: (item) => {
        return item.inactivated
          ? { backgroundColor: 'var(--color-error-50)' }
          : null;
      },
      onToggleInactive: this.toggleInactivated.bind(this),
      getInactive: (i) => {
        return i.inactivated;
      },
      deleteOptions: {
        onDelete: this.delete.bind(this),
      },
    });

    this.gridOptions.set(gridOptions);
    this.loading.set(false);
  }

  private getColumns(): IFinGridColumnOption<PersonOutput>[] {
    return [
      new FinGridSimpleColumnOption<PersonOutput>({
        getValue: (item) => item.name,
        header: 'finCore.features.person.name',
      }),
    ];
  }

  private edit(item: PersonOutput): Observable<void> {
    this.router.navigate([`./${item.id}`], { relativeTo: this.activatedRoute });
    return of();
  }

  private delete(item: PersonOutput): ObservableValidated<void> {
    return this.apiService.delete(item.id);
  }

  private toggleInactivated(item: PersonOutput): Observable<void> {
    return this.apiService
      .toggleInactivated(item.id)
      .pipe(tap(() => this.reloadItens.next()));
  }

  private getPeople(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<PersonOutput>> {
    return this.apiService.getList({
      ...input,
      ...this.filterForm.value,
    } as PersonGetListInput);
  }

  private setForm(): void {
    this.filterForm = new FormGroup<PeopleListFilterForm>({
      inactivated: new FormControl(),
    });

    this.filterForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(300))
      .subscribe(() => this.reloadItens.next());
  }
}
