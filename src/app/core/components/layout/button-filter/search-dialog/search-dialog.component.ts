import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    inject,
    signal,
    viewChild,
    DestroyRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FinIconComponent } from '../../../../../shared/components/icon/fin-icon.component';
import { FinTextComponent } from '../../../../../shared/components/text/fin-text.component';
import { FinTranslatePipe } from '../../../../pipes/translate/fin-translate.pipe';
import { Router } from '@angular/router';
import { MenuOutput } from '../../../../types/layouts/menu-output';
import { MenuService } from '../../../../services/layout/menu.service';
import { FinButtonComponent } from '../../../../../shared/components/button/fin-button.component';

@Component({
  selector: 'fin-search-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FinIconComponent,
    FinTextComponent,
    FinTranslatePipe,
    FinButtonComponent,
  ],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchDialogComponent implements AfterViewInit {
  public readonly input =
    viewChild<ElementRef<HTMLInputElement>>('searchInput');

  public readonly loading = signal(false);
  public readonly formControl = new FormControl('');
  public readonly totalResults = signal(0);
  public readonly filteredResults = signal<MenuOutput[]>([]);
  public readonly selectedIndex = signal(-1);

  public readonly PAGE_SIZE = 10;

  private readonly dialogRef = inject(MatDialogRef<SearchDialogComponent>);
  private readonly menuService = inject(MenuService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private currentAbortController: AbortController | null = null;
  private currentSearchTerm = '';

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.input()?.nativeElement?.focus();
    }, 100);

    setTimeout(() => {
      this.startFilterSubs();
    }, 200);
  }

  public closeDialog(): void {
    this.cancelCurrentRequest();
    this.dialogRef.close();
  }

  public clearSearch(): void {
    this.cancelCurrentRequest();
    this.formControl.reset();
    this.clearResults();
    this.input()?.nativeElement?.focus();
  }

  public onMouseEnter(index: number): void {
    this.selectedIndex.set(index);
  }

  public onLoadMoreMouseEnter(): void {
    this.selectedIndex.set(this.filteredResults().length);
  }

  public loadMore(): void {
    const skipCount = this.PAGE_SIZE + this.filteredResults().length;
    this.loadMoreResults(skipCount);
  }

  public shouldInterceptEnter(): boolean {
    const menuItems = this.filteredResults();
    const currentIndex = this.selectedIndex();
    return menuItems.length > 0 && currentIndex >= 0;
  }

  public onInputEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const shouldIntercept = this.shouldInterceptEnter();

    if (shouldIntercept) {
      keyboardEvent.preventDefault();
      this.handleEnter();
      return;
    }

    this.onSearch(0);
  }

  public onItemClick(item: MenuOutput): void {
    this.router.navigate([item.frontRoute]);
    this.closeDialog();
  }

  private async onSearch(skipCount = 0): Promise<void> {
    const value = this.formControl.value ?? '';

    if (skipCount === 0) {
      this.cancelCurrentRequest();
      this.clearResults();
      this.currentSearchTerm = value;
    }

    if (value.trim()) {
      this.currentAbortController = new AbortController();
      const signal = this.currentAbortController.signal;

      this.loading.set(true);

      try {
        const result = await this.menuService.filterMenus(
          value,
          skipCount,
          this.PAGE_SIZE
        );

        if (!signal.aborted) {
          this.totalResults.set(result.totalCount);

          if (skipCount === 0) {
            this.filteredResults.set(result.items);
          } else {
            this.filteredResults.update((current) => [
              ...current,
              ...result.items,
            ]);
          }
        }
      } catch (error) {
        if (!signal.aborted) {
          this.clearResults();
        }
      } finally {
        if (!signal.aborted) {
          this.loading.set(false);
          this.currentAbortController = null;
        }
      }
    } else {
      this.clearResults();
    }
  }

  private async loadMoreResults(skipCount: number): Promise<void> {
    const value = this.currentSearchTerm || this.formControl.value || '';

    if (value.trim() && !this.loading()) {
      this.loading.set(true);

      try {
        const result = await this.menuService.filterMenus(
          value,
          skipCount,
          this.PAGE_SIZE
        );

        this.filteredResults.update((current) => [...current, ...result.items]);
        this.totalResults.set(result.totalCount);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading.set(false);
      }
    }
  }

  private startFilterSubs(): void {
    this.formControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.onSearch(0);
      });
  }

  private cancelCurrentRequest(): void {
    if (this.currentAbortController) {
      this.currentAbortController.abort();
      this.currentAbortController = null;
    }
    this.loading.set(false);
  }

  private clearResults(): void {
    this.totalResults.set(0);
    this.filteredResults.set([]);
    this.selectedIndex.set(-1);
    this.currentSearchTerm = '';
  }

  private handleEnter(): void {
    const currentIndex = this.selectedIndex();
    const menuItems = this.filteredResults();

    if (currentIndex === -1) return;

    if (currentIndex < menuItems.length) {
      const selectedItem = menuItems[currentIndex];
      this.router.navigate([selectedItem.frontRoute]);
      this.closeDialog();
    } else if (currentIndex === menuItems.length) {
      this.loadMore();
    }
  }
}
