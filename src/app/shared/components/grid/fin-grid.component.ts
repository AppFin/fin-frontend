import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FinGridOptions } from './models/fin-grid-options';
import { firstValueFrom } from 'rxjs';
import { FinGridColumnOption } from './models/fin-grid-column-option';
import { FinGridColumnRendererComponent } from './fin-grid-column-renderer/fin-grid-column-renderer.component';
import { TranslatePipe } from '@ngx-translate/core';
import { PagedFilteredAndSortedInput } from '../../models/paginations/paged-filtered-and-sorted-input';

@Component({
  selector: 'fin-grid',
  imports: [TableModule, FinGridColumnRendererComponent, TranslatePipe],
  templateUrl: './fin-grid.component.html',
  styleUrl: './fin-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinGridComponent<T> implements OnInit {
  public readonly options = input<FinGridOptions<T>>({} as FinGridOptions);

  public readonly loading = signal(true);
  public readonly columns = signal<FinGridColumnOption<T>[]>([]);
  public readonly itens = signal<T[]>([]);

  public async ngOnInit(): Promise<void> {
    await this.loadColumns();
    await this.loadItens();
    this.loading.set(false);
  }

  private async loadColumns(): Promise<void> {
    if (!this.options()?.getColumns) throw 'Invalid columns options';

    const columns = await firstValueFrom(this.options().getColumns());
    this.columns.set(columns);
  }

  private async loadItens(): Promise<void> {
    if (!this.options()?.getList) throw 'Invalid columns options';
    const pagedItens = await firstValueFrom(this.options().getList({} as PagedFilteredAndSortedInput));
    this.itens.set(pagedItens.items);
  }
}
