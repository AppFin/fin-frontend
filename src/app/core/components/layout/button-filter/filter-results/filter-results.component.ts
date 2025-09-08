import {
  ChangeDetectionStrategy,
  Component, HostListener, inject,
  input,
  output, signal,
} from '@angular/core';
import { FinIconComponent } from '../../../../../shared/components/icon/fin-icon.component';
import { FinTextComponent } from '../../../../../shared/components/text/fin-text.component';
import { MenuOutput } from '../../../../types/layouts/menu-output';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'fin-filter-results',
  imports: [FinIconComponent, FinTextComponent, RouterLink, MatProgressSpinnerModule],
  templateUrl: './filter-results.component.html',
  styleUrl: './filter-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterResultsComponent {
  public readonly totalResult = input(0);
  public readonly loading = input(false);
  public readonly menus = input<MenuOutput[]>([]);
  public readonly pageSize = input(5);

  public readonly loadMoreItens = output<number>();

  public readonly selectedIndex = signal(-1);

  private readonly router = inject(Router);

  @HostListener('keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    console.log(event.key);
    const menuItems = this.menus();
    const hasLoadMore = menuItems.length < this.totalResult() && !this.loading();
    const totalItems = menuItems.length + (hasLoadMore ? 1 : 0);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex.update(current =>
          current < totalItems - 1 ? current + 1 : current
        );
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex.update(current =>
          current > 0 ? current - 1 : current
        );
        break;

      case 'Enter':
        event.preventDefault();
        this.handleEnter();
        break;

      case 'Escape':
        event.preventDefault();
        this.selectedIndex.set(-1);
        break;
    }
  }

  public loadMore(): void {
    this.loadMoreItens.emit(this.pageSize() + this.menus().length);
  }

  public onMouseEnter(index: number): void {
    this.selectedIndex.set(index);
  }

  public onLoadMoreMouseEnter(): void {
    this.selectedIndex.set(this.menus().length);
  }

  private handleEnter(): void {
    const currentIndex = this.selectedIndex();
    const menuItems = this.menus();

    if (currentIndex === -1) return;

    if (currentIndex < menuItems.length) {
      const selectedItem = menuItems[currentIndex];
      this.router.navigate([selectedItem.frontRoute]);
    }

    else if (currentIndex === menuItems.length) {
      this.loadMore();
    }
  }

}
