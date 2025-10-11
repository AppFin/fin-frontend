import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  signal,
  Type,
  untracked,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { FinGridSimpleColumnOption } from '../models/columns/fin-grid-simple-column-option';
import { FinTextComponent } from '../../text/fin-text.component';
import { IFinGridColumnOption } from '../models/columns/i-fin-grid-column-option';
import { FinGridDateTimeColumnOption } from '../models/columns/fin-grid-date-time-column-option';
import { DatePipe } from '@angular/common';
import { IFinGridCustomColumn } from '../interface/i-fin-grid-custom-column';
import { FinGridIconColumnOption } from '../models/columns/fin-grid-icon-column-option';
import { FinGridMoneyColumnOption } from '../models/columns/fin-grid-money-column-option';

@Component({
  selector: 'fin-grid-column-renderer',
  imports: [FinTextComponent],
  providers: [DatePipe],
  templateUrl: './fin-grid-column-renderer.component.html',
  styleUrl: './fin-grid-column-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinGridColumnRendererComponent<T> implements OnDestroy {
  public readonly item = input<T>();
  public readonly columnOption = input<IFinGridColumnOption<T>>();

  public dynamicContainer = viewChild('dynamicContainer', {
    read: ViewContainerRef,
  });

  private componentRef = signal<ComponentRef<IFinGridCustomColumn<T>> | null>(
    null
  );

  private readonly datePipe = inject(DatePipe);

  public readonly value = computed(() =>
    this.getValue(this.item(), this.columnOption())
  );
  public readonly customComponent = computed(() =>
    this.getCustomComponent(this.columnOption())
  );

  private customComponenteEffect = effect(() => {
    this.customComponent();
    this.dynamicContainer();
    this.dynamicContainer();
    this.columnOption();
    this.renderComponent();
  });

  public ngOnDestroy(): void {
    this.componentRef()?.destroy();
  }

  private getValue(item?: T, columnOption?: IFinGridColumnOption<T>): string {
    if (columnOption instanceof FinGridSimpleColumnOption) {
      if (!columnOption?.getValue) throw new Error('Invalid column option');
      if (!item) throw new Error('Invalid item');
      let value = columnOption.getValue(item);
      return value?.toString() ?? '';
    }
    if (columnOption instanceof FinGridDateTimeColumnOption) {
      if (!columnOption?.getDateValue) throw new Error('Invalid column option');
      if (!item) throw new Error('Invalid item');
      return columnOption.getDateValue(item, this.datePipe);
    }
    return '';
  }

  private getCustomComponent(
    columnOption?: IFinGridColumnOption<T>
  ): Type<IFinGridCustomColumn<T>> | null {
    if (columnOption instanceof FinGridSimpleColumnOption) {
      return columnOption?.customColumn ? columnOption?.customColumn() : null;
    }
    if (columnOption instanceof FinGridIconColumnOption) {
      return columnOption?.customColumn;
    }
    if (columnOption instanceof FinGridMoneyColumnOption) {
      return columnOption?.customColumn;
    }
    return null;
  }

  private renderComponent(): void {
    const item = this.item();
    const componente = this.customComponent();

    if (!componente || !this.dynamicContainer() || !item) return;

    this.dynamicContainer()?.clear();
    const ref = this.dynamicContainer()?.createComponent(componente);
    if (!ref) return;

    untracked(() => {
      this.componentRef.set(ref);

      const options = this.columnOption();
      if (!this.componentRef()?.instance?.setItem || !options) return;
      this.componentRef()?.instance?.setItem(item, options);
    });
  }
}
