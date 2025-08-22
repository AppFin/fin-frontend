import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { FinGridOptions } from './models/fin-grid-options';
import { firstValueFrom } from 'rxjs';
import { FinGridColumnRendererComponent } from './fin-grid-column-renderer/fin-grid-column-renderer.component';
import { TranslatePipe } from '@ngx-translate/core';
import { PagedFilteredAndSortedInput } from '../../models/paginations/paged-filtered-and-sorted-input';
import { IFinGridColumnOption } from './models/columns/i-fin-grid-column-option';
import { IFinGridActionOption } from './models/i-fin-grid-action-option';
import { FinGridActionsRendererComponent } from './fin-grid-actions-renderer/fin-grid-actions-renderer.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fin-grid',
  imports: [
    TableModule,
    FinGridColumnRendererComponent,
    TranslatePipe,
    FinGridActionsRendererComponent,
    FinGridActionsRendererComponent,
  ],
  templateUrl: './fin-grid.component.html',
  styleUrl: './fin-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FinGridComponent<T> implements OnInit {
  public readonly options = input<FinGridOptions<T>>({} as FinGridOptions);

  public readonly loading = signal(true);
  public readonly loadingColumns = signal(true);

  public readonly columns = signal<IFinGridColumnOption<T>[]>([]);
  public readonly actions = signal<IFinGridActionOption<T>[]>([]);
  public readonly itens = signal<T[]>([]);
  public readonly totalItens = signal(0);

  public readonly actionsColumnsWidth = computed(() => this.calcularteActionsColumnsWidth(this.actions()));

  public maxResultCountOptions = [15, 30, 50];
  public maxResultCount = this.maxResultCountOptions[0];

  private readonly destroyRef = inject(DestroyRef);

  public async ngOnInit(): Promise<void> {
    await this.loadColumns();
    await this.loadActions();
    this.loadingColumns.set(false)
    this.startSubs();
  }

  public async gridLoadItens($event: TableLazyLoadEvent): Promise<void> {
    this.maxResultCount = $event.rows ?? this.maxResultCountOptions[0];
    await this.loadItens($event.first);
  }

  private async loadColumns(): Promise<void> {
    if (!this.options()?.getColumns) throw 'Invalid columns options';

    const columns = await firstValueFrom(this.options().getColumns());
    this.columns.set(columns);
  }

  private async loadActions(): Promise<void> {
    if (!this.options()?.getActions) return;

    const actions = await firstValueFrom(this.options().getActions());
    this.actions.set(actions);
  }

  private async loadItens(skipCount = 0): Promise<void> {
    if (!this.options()?.getList) throw 'Invalid columns options';
    this.loading.set(true);
    const pagedItens = await firstValueFrom(
      this.options().getList({ skipCount, maxResultCount: this.maxResultCount } as PagedFilteredAndSortedInput)
    );
    this.itens.set(pagedItens.items);
    this.totalItens.set(pagedItens.totalCount);
    this.loading.set(false);
  }

  private calcularteActionsColumnsWidth(actions: IFinGridActionOption<T>[]): string {
    const p = actions.length * 40 + ((actions.length - 1) * 2);
    return `${p}px`
  }

  private startSubs(): void {
    this.options().reloadColumns
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      ?.subscribe(async () => {
        this.loadingColumns.set(true);
        await this.loadColumns();
        await this.loadActions();
        this.loadingColumns.set(false);
        await this.loadItens();
      });

    this.options().reloadActions
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      ?.subscribe(async () => {
        this.loadingColumns.set(true)
        await this.loadActions();
        this.loadingColumns.set(false)
      });

    this.options().reloadItens
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      ?.subscribe(async () => {
        await this.loadItens();
      });
  }
}
