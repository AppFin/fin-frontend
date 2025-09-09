import {
  ChangeDetectionStrategy,
  Component, HostListener, inject,
  input,
  output, signal, ElementRef, AfterViewInit,
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
  host: {
    tabindex: '0',
    role: 'listbox',
  },
})
export class FilterResultsComponent implements AfterViewInit {
  public readonly totalResult = input(0);
  public readonly loading = input(false);
  public readonly menus = input<MenuOutput[]>([]);
  public readonly pageSize = input(5);

  public readonly loadMoreItens = output<number>();

  public readonly selectedIndex = signal(-1);

  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef);

  public ngAfterViewInit(): void {
    // Focus the component when it's rendered
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 0);
  }

  public focusComponent(): void {
    this.elementRef.nativeElement.focus();
  }

  // Listen globally so arrow/enter keys work while the user is typing in the input.
  // This component only exists while the overlay is open, so it's safe.
  @HostListener('document:keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    const key = event.key;

    // Only handle navigation keys
    if (key !== 'ArrowDown' && key !== 'ArrowUp' && key !== 'Enter' && key !== 'Escape') {
      return;
    }

    // Check if the component is visible and has focus
    const isVisible = this.elementRef.nativeElement.offsetParent !== null;
    if (!isVisible) {
      return;
    }

    const menuItems = this.menus();
    const hasLoadMore = menuItems.length < this.totalResult() && !this.loading();
    const totalItems = menuItems.length + (hasLoadMore ? 1 : 0);

    // Prevent default behavior and stop propagation
    event.preventDefault();
    event.stopPropagation();

    switch (key) {
      case 'ArrowDown':
        this.selectedIndex.update(current =>
          current < totalItems - 1 ? current + 1 : current
        );
        break;

      case 'ArrowUp':
        this.selectedIndex.update(current =>
          current > 0 ? current - 1 : current
        );
        break;

      case 'Enter':
        this.handleEnter();
        break;

      case 'Escape':
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

  public resetSelection(): void {
    this.selectedIndex.set(-1);
  }

  public shouldInterceptEnter(): boolean {
    const menuItems = this.menus();
    const currentIndex = this.selectedIndex();
    return menuItems.length > 0 && currentIndex >= 0;
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
