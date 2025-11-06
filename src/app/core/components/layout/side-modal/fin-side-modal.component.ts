import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { LayoutService } from '../../../services/layout/layout.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgTemplateOutlet } from '@angular/common';
import { debounceTime } from 'rxjs';

export type SideModalConfig = {
  width?: string
}

@Component({
  selector: 'fin-side-modal',
  imports: [MatSidenavModule, NgTemplateOutlet],
  templateUrl: './fin-side-modal.component.html',
  styleUrl: './fin-side-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FinSideModalComponent implements OnInit {
  public readonly isOpened = signal(false);
  public readonly config = signal<SideModalConfig | undefined>(undefined);
  public readonly input = signal<any | undefined>(undefined);
  public readonly template = signal<TemplateRef<any> | undefined>(undefined);

  private readonly layoutService = inject(LayoutService);
  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.startOpenedSideModalSub();
  }

  public get width(): string {
    return this.layoutService.isMobile ? '100%' : (this.config()?.width ?? '30%');
  }

  public close(result: any = null): void {
    this.layoutService.closeSideModal(result);
  }

  public closeOnBackClick(): void {
    if (!this.isOpened()) return;
    this.close(null);
  }

  private startOpenedSideModalSub(): void {
    this.layoutService.sideModalOpened
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(200)
      )
      .subscribe(options => {
        this.config.set(options.config);
        this.isOpened.set(options.opened);
        this.template.set(options.template);
        this.input.set(options.input);
      });
  }
}
