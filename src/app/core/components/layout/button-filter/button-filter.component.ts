import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FinIconComponent } from '../../../../shared/components/icon/fin-icon.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FinTranslatePipe } from '../../../pipes/translate/fin-translate.pipe';
import { CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';
import { FilterResultsComponent } from './filter-results/filter-results.component';
import { MenuService } from '../../../services/layout/menu.service';
import { MenuOutput } from '../../../types/layouts/menu-output';

@Component({
  selector: 'fin-button-filter',
  imports: [
    ReactiveFormsModule,
    FinIconComponent,
    FinTranslatePipe,
    OverlayModule,
    FilterResultsComponent,
  ],
  templateUrl: './button-filter.component.html',
  styleUrl: './button-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFilterComponent implements OnInit {
  public readonly input = viewChild<ElementRef<HTMLInputElement>>('input');
  public readonly overlay = viewChild<CdkConnectedOverlay>(CdkConnectedOverlay);
  public readonly searchWrapper = viewChild<ElementRef<HTMLDivElement>>('searchWrapper');

  public readonly isExpanded = signal(false);
  public readonly loading = signal(false);
  public readonly formControl = new FormControl('');

  public readonly totalResults = signal(0);
  public readonly filteredResults = signal<MenuOutput[]>([]);

  public readonly PAGE_SIZE = 5;

  private readonly onDestroy = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly menuService = inject(MenuService);

  private closeTimeout: any;
  private currentAbortController: AbortController | null = null;
  private currentSearchTerm = '';

  public ngOnInit(): void {
    this.startFilterSubs();
  }

  @HostListener('window:keydown', ['$event'])
  public onCtrlSlash(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      event.stopPropagation();
      this.toggleSearch();
    }
  }

  public toggleSearch(): void {
    this.isExpanded.set(!this.isExpanded());

    if (this.isExpanded()) {
      setTimeout(() => {
        const inputEl = this.input()?.nativeElement;
        const wrapperEl = this.searchWrapper()?.nativeElement;

        if (inputEl && wrapperEl) {
          inputEl.focus();

          const updateOverlay = () => {
            this.overlay()?.overlayRef?.updatePosition();
            this.cdr.detectChanges();
          };

          wrapperEl.addEventListener('transitionend', updateOverlay, { once: true });
          setTimeout(updateOverlay, 300); // Fallback
        }
      }, 100);
    } else {
      this.cancelCurrentRequest();
      this.formControl.reset();
      this.clearResults();
    }
  }
  public closeSearch(): void {
    this.cancelCurrentRequest();
    this.isExpanded.set(false);
    this.formControl.reset();
    this.clearResults();
  }

  public clearSearch(): void {
    this.cancelCurrentRequest();
    this.formControl.reset();
    this.clearResults();
    this.input()?.nativeElement?.focus();
  }

  public onInputBlur(): void {
    this.closeTimeout = setTimeout(() => this.closeSearch(), 1000);
  }

  public onOverlayMouseDown(event: Event): void {
    event.preventDefault();

    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  public async onSearch(skipCount = 0): Promise<void> {
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

            this.filteredResults.update((current) => [...current, ...result.items]);
          }
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error('Erro na busca:', error);
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

  public async loadMoreResults(skipCount: number): Promise<void> {

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
        console.error('Erro ao carregar mais resultados:', error);
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
        takeUntilDestroyed(this.onDestroy)
      )
      .subscribe(() => this.onSearch(0));
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
    this.currentSearchTerm = '';
  }
}