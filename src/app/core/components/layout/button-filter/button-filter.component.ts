import {
  ChangeDetectionStrategy,
  Component,
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

@Component({
  selector: 'fin-button-filter',
  imports: [ReactiveFormsModule, FinIconComponent, FinTranslatePipe],
  templateUrl: './button-filter.component.html',
  styleUrl: './button-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFilterComponent implements OnInit {
  public readonly input = viewChild<ElementRef<HTMLInputElement>>('input');
  public readonly isExpanded = signal(false);
  public readonly formControl = new FormControl('');

  private readonly onDestoy = inject(DestroyRef);

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
        this.input()?.nativeElement?.focus();
      }, 100);
    } else {
      this.formControl.reset();
    }
  }

  public closeSearch(): void {
    this.isExpanded.set(false);
    this.formControl.reset();
  }

  public clearSearch(): void {
    this.formControl.reset();
    this.input()?.nativeElement?.focus();
  }

  public onInputBlur(): void {
    setTimeout(() => this.closeSearch(), 150);
  }

  public onSearch(): void {
    const value = this.formControl.value ?? '';
    if (value.trim()) {
      console.log('Searching for:', value);
    }
  }

  private startFilterSubs(): void {
    this.formControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.onDestoy)
      )
      .subscribe(() => this.onSearch());
  }
}
